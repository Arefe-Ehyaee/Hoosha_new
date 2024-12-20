import ContactUs from "../ContactUs";
import Navbar from "../Navbar";
import send from "../../assets/Images/arrow.png";
import { useEffect, useState } from "react";

export default function ChatText() {
  const [enteredMessage, setEnteredMessage] = useState("");
  const [messages, setMessages] = useState<{ id: number; message: string; response: string; timestamp: string }[]>([]);

    // Fetch messages from the database
    // useEffect(() => {
    //   fetch("/api/get-messages")
    //     .then((response) => response.json())
    //     .then((data) => setMessages(data))
    //     .catch((err) => console.error("Failed to load messages:", err));
    // }, []);
    
  function handleSendMessage(event: React.ChangeEvent<HTMLInputElement>): void {
    setEnteredMessage(event.target.value);
  }


  async function handleSubmit() {
    if (enteredMessage.trim() !== "") {
      const message = enteredMessage;
  
      try {
        // Send the message to the correct backend (running on port 32336)
        const response = await fetch("https://192.168.1.100:443/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_message: message, user: "علیرضا" }),
        });
  
        if (response.ok) {
          const responseData: { response: string } = await response.json();
          // If the response is successful, update the messages state
          setMessages((prevMessages) => [
            ...prevMessages,
            // { id: Date.now(), message: message, timestamp: new Date().toISOString() },
            { id: Date.now() , message: message, response:responseData.response, timestamp: new Date().toISOString() },
          ]);
          setEnteredMessage("");  // Clear the input field
        } else {
          const data = await response.json();
          console.error("Error:", data.error || "Failed to send message");
        }
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  }
  


  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <div className="bg-[#F9FAFF] py-[160px]">
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
              if (event.key == "Enter") {
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
                <div className="text-justify p-2 bg-yellow-200">{msg.response}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactUs></ContactUs>
    </div>
  );
}
