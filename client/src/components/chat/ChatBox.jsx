import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

import chatService from "../../services/chat.service";
import Message from "./Message";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

const SUGGESTIONS = [
  "Summarize my uploaded documents",
  "What are the key topics covered?",
  "Find information about company policies",
  "Explain the main concepts in my PDFs",
];

const ChatBox = ({ onRegisterNewChat }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setQuestion("");
    toast.success("New chat started");
  }, []);

  useEffect(() => {
    onRegisterNewChat?.(handleNewChat);
  }, [onRegisterNewChat, handleNewChat]);

  const sendMessage = async (text, replaceLast = false) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };

    if (replaceLast) {
      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].role === "assistant") {
          updated.pop();
        }
        return updated;
      });
    } else {
      setMessages((prev) => [...prev, userMessage]);
    }

    try {
      setLoading(true);

      const response = await chatService.askQuestion(text);

      const aiMessage = {
        role: "assistant",
        text: response.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Unable to get response."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (text) => {
    sendMessage(text);
    setQuestion("");
  };

  const handleRegenerate = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      sendMessage(lastUserMsg.text, true);
    }
  };

  const handleSuggestion = (suggestion) => {
    handleSend(suggestion);
  };

  const lastMessageIsAssistant =
    messages.length > 0 && messages[messages.length - 1].role === "assistant";

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-5"
            >
              <Sparkles size={40} className="text-primary" />
            </motion.div>

            <h2 className="text-center text-2xl font-bold text-dark sm:text-3xl">
              How can I help you today?
            </h2>
            <p className="mt-2 max-w-md text-center text-sm text-slate-500 sm:text-base">
              Ask questions about your uploaded documents and get AI-powered answers instantly.
            </p>

            <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestion(suggestion)}
                  className="rounded-2xl border border-border bg-white p-4 text-left text-sm text-slate-600 shadow-soft transition hover:border-primary/30 hover:text-dark"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}

            {loading && <TypingIndicator />}

            {lastMessageIsAssistant && !loading && (
              <div className="flex justify-start pl-11">
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-white hover:text-dark"
                >
                  <RefreshCw size={14} />
                  Regenerate response
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput
        value={question}
        onChange={setQuestion}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
};

export default ChatBox;
