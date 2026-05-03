import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function AIWidget({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am MedAI, your intelligent health assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToAI = async (userMessage) => {
    try {
      const response = await fetch("https://harshg789.app.n8n.cloud/webhook/d6404487-3e08-4921-b58e-aa4cac78df21/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage", 
          sessionId: user.uid, // Memory ke liye same ID rakhna zaroori hai
          chatInput: userMessage   // User ka type kiya hua sawal
        }),
      });
      const data = await response.json();
      console.log("AI Doctor's Reply:", data.output); 
      return data.output; 
    } catch (error) {
      console.error("Error connecting to MedAI:", error);
      return "Sorry, server se connection toot gaya. Thodi der baad try karein.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    const reply = await sendMessageToAI(userMessage);
    setMessages(prev => [...prev, { text: reply, isBot: true }]);
    setIsLoading(false);
  };

  return (
    <div className="ai-widget">
      {isOpen ? (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <span>Ask MedAI</span>
            </div>
            <button 
              style={{ padding: '4px', background: 'transparent', border: 'none', color: 'white' }} 
              onClick={() => setIsOpen(false)}
              className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.isBot ? 'chat-bot' : 'chat-user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble chat-bot">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chat-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your health question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <div className="ai-toggle" onClick={() => setIsOpen(true)}>
          <MessageSquare size={28} />
        </div>
      )}
    </div>
  );
}
