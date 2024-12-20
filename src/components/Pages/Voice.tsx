import ContactUs from "../ContactUs";
import Navbar from "../Navbar";
import { useReactMediaRecorder } from "react-media-recorder";
import Lottie from "lottie-react";
import record from "../../assets/lotties/record.json";
import { useEffect, useRef, useState } from "react";
import send from "../../assets/Images/arrow.png";

export default function VoiceChat() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://192.168.1.100:3000/ws");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection established!");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log("Received message:", data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const [enteredMessage, setEnteredMessage] = useState("");

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  // Function to send audio file over WebSocket
  const sendAudioOverWebSocket = async () => {
    if (!mediaBlobUrl || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("No audio file or WebSocket connection is not open");
      return;
    }

    try {
      const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
      const pcmWavBlob = await convertToPcmWav(audioBlob);
      const base64String = await blobToBase64(pcmWavBlob);

      // Send the Base64 encoded audio string over WebSocket
      wsRef.current.send(JSON.stringify({ type: "voice", content: base64String }));

      console.log("Audio sent over WebSocket!");
    } catch (error) {
      console.error("Error sending audio over WebSocket:", error);
    }
  };

  const convertToPcmWav = async (audioBlob: Blob): Promise<Blob> => {
    const targetSampleRate = 16000;
    const audioContext = new AudioContext({ sampleRate: targetSampleRate });
    const arrayBuffer = await audioBlob.arrayBuffer();
    let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    if (audioBuffer.sampleRate !== targetSampleRate) {
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        targetSampleRate
      );
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start(0);

      const resampledBuffer = await offlineContext.startRendering();
      audioBuffer = resampledBuffer;
    }

    const numOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1;
    const bitsPerSample = 16;
    const blockAlign = (numOfChannels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const wavHeaderSize = 44;
    const dataSize = audioBuffer.length * blockAlign;
    const buffer = new ArrayBuffer(wavHeaderSize + dataSize);
    const view = new DataView(buffer);

    writeString(view, 0, "RIFF");
    view.setUint32(4, wavHeaderSize + dataSize - 8, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, "data");
    view.setUint32(40, dataSize, true);

    const channelData = [];
    for (let channel = 0; channel < numOfChannels; channel++) {
      channelData.push(audioBuffer.getChannelData(channel));
    }

    let offset = wavHeaderSize;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = channelData[channel][i];
        const intSample = Math.max(-1, Math.min(1, sample)) * 32767;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    return new Blob([buffer], { type: "audio/wav" });
  };

  // Utility function to convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString().split(",")[1]); // Exclude the `data:` prefix
      } else {
        reject(new Error("Failed to convert Blob to Base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <div className="bg-[#F9FAFF] py-[240px]">
        <div
          className="text-center mb-[50px] font-KalamehBold text-5xl text-[#0a1127]"
          dir="rtl"
        >
          هوشا اینجاست...
        </div>

        <div className="relative text-center">
          <button className="absolute" onClick={sendAudioOverWebSocket}>
            <img src={send} alt="send" className="w-8 h-8 pt-1" />
          </button>
          <input
            type="text"
            dir="rtl"
            className="w-[40%] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="چطور میتونم کمکت کنم؟"
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          {status === "recording" && (
            <Lottie
              animationData={record}
              loop={true}
              autoplay={true}
              className="hidden lg:block"
            />
          )}
          <div className="flex gap-2 mt-5">
            <button
              onClick={startRecording}
              disabled={status === "recording"}
              className="bg-green-600 p-3 rounded-md text-xl text-white font-bold"
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              disabled={status !== "recording"}
              className="bg-red-600 p-3 rounded-md text-xl text-white font-bold"
            >
              Stop Recording
            </button>
          </div>
          {mediaBlobUrl && (
            <div>
              <h3>Recorded Audio:</h3>
              <audio src={mediaBlobUrl} controls />
            </div>
          )}
          <button
            onClick={sendAudioOverWebSocket}
            className="bg-blue-400 rounded-lg p-3 mt-3"
          >
            ارسال ویس
          </button>
        </div>
      </div>
      <ContactUs></ContactUs>
    </div>
  );
}

