import React, { useState, useEffect } from 'react';
import { DollarSign, Quote } from 'lucide-react';

const MOTIVATIONS = [
  { content: 'Peluang tidak muncul begitu saja, Anda yang menciptakannya.', author: 'Chris Grosser' },
  { content: 'Jangan menunggu. Waktu tidak akan pernah "tepat".', author: 'Napoleon Hill' },
  { content: 'Keberhasilan adalah kemampuan untuk berpindah dari satu kegagalan ke kegagalan lain tanpa kehilangan antusiasme.', author: 'Winston Churchill' },
  { content: 'Cara untuk memulai adalah berhenti berbicara dan mulai melakukan.', author: 'Walt Disney' },
  { content: 'Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang Anda lakukan.', author: 'Steve Jobs' },
  { content: 'Bekerja keras dalam keheningan, biarkan kesuksesan menjadi kebisingan Anda.', author: 'Frank Ocean' }
];

export function WorkspaceManager() {
  const [usdToIdr, setUsdToIdr] = useState<number | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Fetch Currency (using free fallback API)
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => setUsdToIdr(data.rates.IDR))
      .catch(console.error);

    // Rotate Motivation every 10 seconds
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % MOTIVATIONS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const quote = MOTIVATIONS[quoteIndex];

  return (
    <div className="space-y-6">
      {/* Top Ticker */}
      <div className="bg-surface-container border border-outline-variant rounded-xl p-3 flex items-center justify-center gap-4 overflow-hidden shadow-sm">
        <DollarSign className="text-secondary shrink-0" size={18} />
        <p className="text-sm font-bold text-on-surface whitespace-nowrap animate-pulse">
          LIVE KURS: 1 USD = <span className="text-secondary">{usdToIdr ? `Rp ${usdToIdr.toLocaleString('id-ID')}` : 'Memuat...'}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quote */}
        <div className="md:col-span-2 bg-surface-container border border-outline-variant rounded-2xl p-8 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px]">
          <Quote className="absolute top-8 left-8 text-primary/10" size={80} />
          <h3 className="text-xl font-bold text-on-surface mb-6 relative z-10 uppercase tracking-widest text-primary">Motivasi Harian</h3>
          
          <div key={quoteIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 max-w-3xl">
            <p className="text-2xl md:text-3xl text-on-surface font-semibold mb-6 leading-relaxed">"{quote.content}"</p>
            <p className="text-lg font-bold text-primary-container-highest">- {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
