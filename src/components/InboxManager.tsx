// @ts-nocheck
"use client";
import React, { useEffect, useState } from 'react';
import { Mail, CheckCircle2, Clock } from 'lucide-react';
import { getInboxMessages, markMessageAsRead, InboxMessage } from '../services/messageService';

export function InboxManager() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const data = await getInboxMessages();
    setMessages(data);
    setLoading(false);
  };

  const handleMarkAsRead = async (id: string | undefined) => {
    if (!id) return;
    await markMessageAsRead(id);
    fetchMessages();
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center gap-3 text-primary justify-center">
        <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Memuat Kotak Masuk...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
          <Mail className="text-primary" /> Kotak Masuk Pesan
        </h2>
        <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
          {messages.filter(m => !m.isRead).length} Pesan Baru
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant bg-surface rounded-xl border border-outline-variant border-dashed">
          Tidak ada pesan masuk.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-5 rounded-xl border transition-all ${!msg.isRead ? 'bg-primary/5 border-primary/30 shadow-md' : 'bg-surface border-outline-variant shadow-sm'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-on-surface flex items-center gap-2">
                    {msg.name} <span className="text-xs font-normal text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{msg.email}</span>
                  </h4>
                  <p className="text-sm font-medium text-on-surface-variant mt-1">Subjek: {msg.subject}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <Clock size={12} /> {new Date(msg.createdAt).toLocaleString('id-ID')}
                  </span>
                  {!msg.isRead ? (
                    <button 
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 size={14} /> Tandai Dibaca
                    </button>
                  ) : (
                    <span className="text-xs text-secondary flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={14} /> Telah Dibaca
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-background/50 p-4 rounded-lg text-sm text-on-surface leading-relaxed whitespace-pre-wrap border border-outline-variant/30">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
