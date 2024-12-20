import ContactUs from "../ContactUs";
import Navbar from "../Navbar";
import { useReactMediaRecorder } from "react-media-recorder";
import Lottie from "lottie-react";
import record from "../../assets/lotties/record.json";
import { useState } from "react";
import send from "../../assets/Images/arrow.png";

export default function VoiceChat() {
  const [enteredMessage, setEnteredMessage] = useState("");

  const {
    status, // Current recording status
    startRecording, // Function to start recording
    stopRecording, // Function to stop recording
    mediaBlobUrl, // URL for the recorded audio
  } = useReactMediaRecorder({ audio: true }); // Enable audio recording

  // Function to send the audio file to the backend
  const sendAudioToBackend = async () => {
    if (!mediaBlobUrl) {
      console.error("No audio file to send");
      return;
    }

    try {
      // Fetch the blob from the mediaBlobUrl
      const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());

      // Convert the audio blob to PCM WAV format with 16000 Hz sample rate
      const pcmWavBlob = await convertToPcmWav(audioBlob);

      const formData = new FormData();
      formData.append("audio", pcmWavBlob, "recording.wav"); // Specify a name for the file

      console.log("FormData:", formData.get("audio"));

      const response = await fetch("https://192.168.1.100:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Audio uploaded successfully:", result);
      } else {
        console.error("Failed to upload audio:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  // Function to convert audio blob to PCM WAV with 16000 Hz sample rate
  const convertToPcmWav = async (audioBlob: Blob): Promise<Blob> => {
    const targetSampleRate = 16000; // Target sample rate (16 kHz)

    const audioContext = new AudioContext({
      sampleRate: targetSampleRate, // Set the target sample rate
    });

    // Decode the audio blob into an AudioBuffer
    const arrayBuffer = await audioBlob.arrayBuffer();
    let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Resample the audio buffer if the original sample rate is different from the target
    if (audioBuffer.sampleRate !== targetSampleRate) {
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        targetSampleRate
      );

      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;

      // Connect to the offline context's destination
      source.connect(offlineContext.destination);
      source.start(0);

      // Render the resampled audio
      const resampledBuffer = await offlineContext.startRendering();
      audioBuffer = resampledBuffer; // Use the resampled audio buffer
    }

    // PCM WAV Encoding
    const numOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM format
    const bitsPerSample = 16; // Bits per sample
    const blockAlign = (numOfChannels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const wavHeaderSize = 44;

    // Calculate buffer size
    const dataSize = audioBuffer.length * blockAlign;
    const buffer = new ArrayBuffer(wavHeaderSize + dataSize);
    const view = new DataView(buffer);

    // Write WAV header
    writeString(view, 0, "RIFF"); // Chunk ID
    view.setUint32(4, wavHeaderSize + dataSize - 8, true); // Chunk Size
    writeString(view, 8, "WAVE"); // Format
    writeString(view, 12, "fmt "); // Subchunk1 ID
    view.setUint32(16, 16, true); // Subchunk1 Size (PCM)
    view.setUint16(20, format, true); // Audio Format (PCM)
    view.setUint16(22, numOfChannels, true); // Num Channels
    view.setUint32(24, sampleRate, true); // Sample Rate
    view.setUint32(28, byteRate, true); // Byte Rate
    view.setUint16(32, blockAlign, true); // Block Align
    view.setUint16(34, bitsPerSample, true); // Bits per Sample
    writeString(view, 36, "data"); // Subchunk2 ID
    view.setUint32(40, dataSize, true); // Subchunk2 Size

    // Write PCM data
    const channelData = [];
    for (let channel = 0; channel < numOfChannels; channel++) {
      channelData.push(audioBuffer.getChannelData(channel));
    }

    let offset = wavHeaderSize;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = channelData[channel][i];
        const intSample = Math.max(-1, Math.min(1, sample)) * 32767; // Clamp between -32768 and 32767
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    // Return PCM WAV blob
    return new Blob([buffer], { type: "audio/wav" });
  };

  // Utility function to write strings into DataView
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <div className="bg-[#F9FAFF] py-[160px]">
        <div
          className="text-center mb-[50px] font-KalamehBold text-5xl text-[#0a1127]"
          dir="rtl"
        >
          هوشا اینجاست...
        </div>

        <div className="relative text-center">
          <div className=" absolute">
            <button className="" onClick={sendAudioToBackend}>
              <img src={send} alt="send" className="w-8 h-8 pt-1" />
            </button>
            <button className="" onClick={sendAudioToBackend}>
              <img src={send} alt="send" className="w-8 h-8 pt-1" />
            </button>
          </div>
          <input
            type="text"
            dir="rtl"
            className="w-[40%] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="چطور میتونم کمکت کنم؟"
            value={enteredMessage}
            onChange={sendAudioToBackend}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                sendAudioToBackend();
              }
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          {status === "recording" && (
            <div>
              <Lottie
                animationData={record}
                loop={true}
                autoplay={true}
                className="hidden lg:block" // Hide on mobile, show on large screens
                // style={{
                //   position: "absolute",
                //   top: "10%",
                //   left: "15%",
                //   width: "12vw",
                //   maxWidth: "180px",
                //   height: "auto",
                // }}
              />
            </div>
          )}
          {/* Display the current recording status */}

          <div className="w-[40%] text-center mx-auto py-5">
            {/* <div>
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className="text-right p-2 bg-blue-200">
                    {msg.message} <br />
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  </div>
                  <div className="text-justify p-2 bg-yellow-200">
                    {msg.response}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          <div className="flex gap-2">
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
            <div className="">
              <h3>Recorded Audio:</h3>
              <audio src={mediaBlobUrl} controls /> {/* Audio playback */}
            </div>
          )}
          <button
            onClick={sendAudioToBackend}
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
