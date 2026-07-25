import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function SiskaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Halo Mas! Aku Siska, Asisten AI TacoPDF. Aku jago banget soal SEO, AdSense, dan *marketing* PDF! Ada yang bisa Siska bantu hari ini buat ngalahin kompetitor kita? 😉'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/siska', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Waduh Mas, maaf banget sistem Siska lagi gangguan nih. Boleh coba sebentar lagi ya! 🙏' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles size={24} className="animate-pulse" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-4rem)] bg-surface border border-outline-variant rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-container p-4 flex items-center justify-between shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center shadow-inner overflow-hidden border-2 border-surface">
              <img src="/siska-avatar.png" alt="Siska" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-on-primary text-sm flex items-center gap-1">
                Dek Siska <Sparkles size={12} className="text-yellow-300" />
              </h3>
              <p className="text-[10px] text-on-primary/80 font-medium">SEO & AdSense Expert</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-on-primary/80 hover:text-on-primary hover:bg-on-primary/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-variant">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-on-primary rounded-tr-sm shadow-md' 
                  : 'bg-surface border border-outline-variant text-on-surface rounded-tl-sm shadow-md'
              }`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-surface-variant/50 prose-pre:text-on-surface">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-surface border border-outline-variant rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center h-[44px]">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-surface border-t border-outline-variant flex gap-2 items-end z-10">
          <div className="flex-1 bg-surface-variant/30 border border-outline-variant/50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tanya Siska soal ide artikel..."
              className="w-full bg-transparent text-sm text-on-surface focus:outline-none resize-none max-h-32 min-h-[40px] py-2 custom-scrollbar"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-primary text-on-primary rounded-xl hover:bg-primary/90 disabled:bg-surface-variant disabled:text-on-surface-variant transition-colors shrink-0 shadow-md h-[44px] flex items-center justify-center mb-0.5"
          >
            <Send size={18} className={input.trim() && !isLoading ? 'translate-x-0.5 -translate-y-0.5 transition-transform' : ''} />
          </button>
        </form>
      </div>
    </>
  );
}
