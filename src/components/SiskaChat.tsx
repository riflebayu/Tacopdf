import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

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
  const isDragging = useRef(false);

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
    <motion.div 
      drag 
      dragMomentum={false}
      onDragStart={() => isDragging.current = true}
      onDragEnd={() => setTimeout(() => isDragging.current = false, 150)}
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end justify-end"
      style={{ touchAction: 'none' }}
    >
      {/* Chat Window */}
      <div 
        className={`w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-4rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right mb-4 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}
      >
        {/* Header - Drag Handle */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between shadow-md relative z-10 cursor-move">
          <div className="flex items-center gap-3 pointer-events-none">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border-2 border-white">
              <img src="/siska-avatar.png" alt="Siska" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1">
                Dek Siska <Sparkles size={12} className="text-yellow-300" />
              </h3>
              <p className="text-[10px] text-blue-100 font-medium">SEO & AdSense Expert</p>
            </div>
          </div>
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages - Not draggable */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 cursor-auto"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-900 rounded-tl-sm shadow-md'
              }`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100 prose-pre:text-gray-900">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center h-[44px]">
                <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Not draggable */}
        <form 
          onSubmit={handleSend} 
          className="p-3 bg-white border-t border-gray-200 flex gap-2 items-end z-10 cursor-auto"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all flex items-center">
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
              className="w-full bg-transparent text-sm text-gray-900 focus:outline-none resize-none max-h-32 min-h-[40px] py-2 custom-scrollbar"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition-colors shrink-0 shadow-md h-[44px] flex items-center justify-center mb-0.5 cursor-pointer"
          >
            <Send size={18} className={input.trim() && !isLoading ? 'translate-x-0.5 -translate-y-0.5 transition-transform' : ''} />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={(e) => {
          if (isDragging.current) {
            e.preventDefault();
            return;
          }
          setIsOpen(true);
        }}
        className={`p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-move ${isOpen ? 'scale-0 opacity-0 hidden' : 'scale-100 opacity-100'}`}
      >
        <Sparkles size={24} className="animate-pulse pointer-events-none" />
      </button>
    </motion.div>
  );
}
