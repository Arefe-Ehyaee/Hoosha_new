import ContactUs from "../ContactUs";
import Navbar from "../Navbar";
import send from "../../assets/Images/arrow.png";
import { useEffect, useState, useRef } from "react";

export default function ChatText() {
  const [enteredMessage, setEnteredMessage] = useState("");
  const [messages, setMessages] = useState<{ id: number; message: string; response: string; timestamp: string }[]>([]);
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
    
      if (data) {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 && msg.response === "" // Update the last message's response
              ? { ...msg, response: data }
              : msg
          )
        );
      }
    };
    

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      // Clean up WebSocket connection on component unmount
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  function handleSendMessage(event: React.ChangeEvent<HTMLInputElement>): void {
    setEnteredMessage(event.target.value);
  }

  function handleSubmit() {
    if (enteredMessage.trim() !== "" && wsRef.current?.readyState === WebSocket.OPEN) {
      const message = enteredMessage;
      const msg = { type: "text", content: message };

      // Send message via WebSocket
      wsRef.current.send(JSON.stringify(msg));

      // Update UI with the sent message
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message: message, response: "", timestamp: new Date().toISOString() },
      ]);
      setEnteredMessage(""); // Clear the input field
    } else if (wsRef.current?.readyState !== WebSocket.OPEN) {
      alert("WebSocket connection is not open.");
    }
  }

  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <div className="bg-[#F9FAFF] py-[240px]">
        <div className="text-center mb-[50px] font-KalamehBold text-5xl text-[#0a1127]" dir="rtl">
          هوشا اینجاست...
        </div>
        <div className="relative text-center">
          <button className="absolute" onClick={handleSubmit}>
            <img src={send} alt="send" className="w-8 h-8 pt-1" />
          </button>
          <input
            type="text"
            dir="rtl"
            className="w-[40%] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="چطور میتونم کمکت کنم؟"
            value={enteredMessage}
            onChange={handleSendMessage}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
        <div className="w-[40%] text-center mx-auto py-5">
          <div>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className="text-right p-2 bg-blue-200">
                  {msg.message} <br />
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
                </div>
                {msg.response && <div className="text-justify p-2 bg-yellow-200">{msg.response}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactUs></ContactUs>
    </div>
  );
}
