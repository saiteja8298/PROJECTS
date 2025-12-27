import React, { useState } from "react";
import axios from "axios";
import tours from "../assets/data/tours";
import guideData from "../assets/data/guideData";
import "../styles/glitch.css"; // Import your glitch styles

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        message: input,
        tours,
        guideData,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something glitched out..." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-card">
        <div className="text-center mb-4">
          <h2 className="glitch text-2xl font-bold mb-1">Travel Guard⚡</h2>
          <p className="text-sm text-purple-400">Your trip assistant</p>
        </div>

        <div className="chatbox">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg max-w-[85%] ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-purple-300"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Ask Our Ai"
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage} className="send-button">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
