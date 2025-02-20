import { useState, useEffect, memo, useRef, useCallback } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { heros } from "../../mocks/ai";
import { useParams } from "react-router-dom";
import CountUp from "react-countup";
import "./chat.css";

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [responseTime, setResponseTime] = useState({ before: 10, after: 10 });
  const [accuracy, setAccuracy] = useState({ before: 90, after: 90 });
  const [systemUpTime, setSystemUpTime] = useState({ before: 95, after: 95 });

  const { ai_id } = useParams();
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const { data } = await axios.post(API_URL, {
        contents: [{ parts: [{ text: input }] }],
      });

      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "Cevap alınamadı.";
      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("API Hatası:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "API Hatası: " + error.message },
      ]);
    }
  }, [input, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime((prev) => ({ ...prev, before: prev.after }));
      setAccuracy((prev) => ({ ...prev, before: prev.after }));
      setSystemUpTime((prev) => ({ ...prev, before: prev.after }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime((prev) => ({
        ...prev,
        after: Math.floor(Math.random() * 21) + 10,
      }));
      setAccuracy((prev) => ({
        ...prev,
        after: Math.floor(Math.random() * 11) + 90,
      }));
      setSystemUpTime((prev) => ({
        ...prev,
        after: Math.floor(Math.random() * 11) + 90,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w100 df gap-20 chat-container">
      <div className="df fdc gap-20 ai-info">
        <figure className="w100 df aic jcc frame">
          <img src={heros[ai_id]?.img} alt="" />
          <span className="corner-right-bottom"></span>
          <span className="corner-left-bottom"></span>
        </figure>
        <p>
          <span>Name:</span> {heros[ai_id]?.name}
        </p>
        <p>
          <span>Description:</span>
          <br />
          {heros[ai_id]?.description}
        </p>
        <p>
          <span>Model Version:</span> 2.5.0
        </p>
        <p>
          <span>Response Time:</span>{" "}
          <CountUp
            start={responseTime.before}
            end={responseTime.after}
            duration={6}
            suffix=" ms (avg)"
          />
        </p>
        <p>
          <span>Accuracy:</span>{" "}
          <CountUp
            start={accuracy.before}
            end={accuracy.after}
            duration={6}
            suffix=" %"
          />
        </p>
        <p>
          <span>System Uptime:</span>{" "}
          <CountUp
            start={systemUpTime.before}
            end={systemUpTime.after}
            duration={6}
            suffix=" %"
          />
        </p>
      </div>
      <div className="frame gradient-bg chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.role === "user" ? "You:" : "AI:"}</strong>{" "}
              <TypeAnimation
                sequence={[msg.content, 9999999, ""]}
                speed={50}
                cursor={false}
                omitDeletionAnimation={false}
                style={{
                  fontSize: "1em",
                  display: "block",
                  whiteSpace: "pre-wrap",
                }}
              />
            </p>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <label className="send-message w100 df aic gap-5">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="TYPE YOUR MESSAGE..."
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-lg"
            onClick={sendMessage}
          >
            SEND
          </button>
        </label>
        <span className="corner-right-bottom"></span>
        <span className="corner-left-bottom"></span>
      </div>
    </div>
  );
};

export default memo(GeminiChat);
