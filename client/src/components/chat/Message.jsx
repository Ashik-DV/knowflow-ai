import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { Bot, Check, Copy, User } from "lucide-react";
import { cn } from "../../utils/cn";

const Message = ({ message, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("group flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
          <Bot size={16} className="text-white" />
        </div>
      )}

      <div
        className={cn(
          "relative max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] sm:px-5 sm:py-4",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/90 text-white shadow-glow"
            : "border border-border bg-white text-dark shadow-soft"
        )}
      >
        {isUser ? (
          <div className="flex items-start gap-2">
            <p className="whitespace-pre-wrap break-words text-sm leading-7 sm:text-base">
              {message.text}
            </p>
            <User size={16} className="mt-1 shrink-0 opacity-70" />
          </div>
        ) : (
          <div className="markdown-content text-sm leading-7 sm:text-base">
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  if (!inline && match) {
                    return (
                      <div className="my-3 overflow-hidden rounded-xl">
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: "12px",
                            fontSize: "0.85rem",
                          }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-primary"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>
                ),
                h1: ({ children }) => (
                  <h1 className="mb-2 text-lg font-bold">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-2 text-base font-bold">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 text-sm font-semibold">{children}</h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-3 border-l-4 border-primary/30 pl-4 italic text-slate-600">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}

        {!isUser && (
          <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-dark group-hover:opacity-100"
          >
            {copied ? (
              <>
                <Check size={14} className="text-success" />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200">
          <User size={16} className="text-slate-600" />
        </div>
      )}
    </motion.div>
  );
};

export default Message;
