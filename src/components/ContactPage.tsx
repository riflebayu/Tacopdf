// @ts-nocheck
"use client";
import React, { useState } from 'react';
import { ArrowLeft, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mvzerrew', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-16">
      <button 
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> {t('contact.back') || 'Back to Home'}
      </button>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">
          {t('contact.title') || 'Contact Support'}
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {t('contact.subtitle') || 'Punya pertanyaan, kendala teknis, masukan, atau tawaran kerja sama? Jangan ragu untuk menghubungi kami. Kami selalu berusaha memberikan pengalaman pengelolaan PDF terbaik untuk Anda.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Left Column: Contact Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm space-y-8">
            <h3 className="font-bold text-lg text-on-surface border-b border-outline-variant pb-4">
              {t('contact.direct') || 'Direct Contact'}
            </h3>
            
            <div className="flex items-start gap-4 text-on-surface-variant">
              <div className="p-3 bg-primary-container/20 rounded-xl text-primary shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{t('contact.email') || 'Email'}</h4>
                <a href="mailto:mbayuedi@gmail.com" className="text-sm hover:text-primary transition-colors">mbayuedi@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4 text-on-surface-variant">
              <div className="p-3 bg-primary-container/20 rounded-xl text-primary shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{t('contact.time') || 'Waktu Respons'}</h4>
                <p className="text-sm leading-relaxed">{t('contact.time_desc') || 'Kami berusaha membalas pesan Anda dalam waktu 1x24 jam pada hari kerja (Senin - Jumat).'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-on-surface-variant">
              <div className="p-3 bg-primary-container/20 rounded-xl text-primary shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{t('contact.location') || 'Lokasi'}</h4>
                <p className="text-sm">{t('contact.location_desc') || 'Indonesia, Melayani Dunia.'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant">
              <h4 className="font-bold text-sm text-on-surface mb-3">{t('contact.follow') || 'Ikuti Kami'}</h4>
              <div className="flex items-center gap-3">
                <a href="https://web.facebook.com/baylightyear04/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/bay.lightyear/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-pink-600/10 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mbayuedi@gmail.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-3">
          <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-bold text-xl text-on-surface mb-6">
              {t('contact.send_msg') || 'Kirim Pesan'}
            </h3>

            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-on-surface mb-2">{t('contact.success') || 'Pesan Terkirim!'}</h4>
                  <p className="text-sm text-on-surface-variant">{t('contact.success_desc') || 'Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda ke email yang Anda berikan.'}</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 bg-surface border border-outline-variant rounded-lg font-bold text-sm text-on-surface hover:bg-surface-variant transition-colors"
                >
                  {t('contact.send_another') || 'Kirim Pesan Lain'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 text-red-500">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{t('contact.error') || 'Gagal mengirim pesan. Silakan coba lagi nanti atau hubungi kami langsung melalui email.'}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-on-surface">{t('contact.name') || 'Nama Lengkap'} <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder={t('contact.name_ph') || "Masukkan nama Anda"}
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-on-surface">{t('contact.email') || 'Alamat Email'} <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder={t('contact.email_ph') || "email@anda.com"}
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-on-surface">{t('contact.subject') || 'Subjek Pesan'} <span className="text-red-500">*</span></label>
                  <select 
                    id="subject" 
                    name="subject" 
                    required
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all"
                  >
                    <option value="" disabled selected>{t('contact.subject_ph') || 'Pilih subjek...'}</option>
                    <option value="Bantuan Teknis">{t('contact.sub_1') || 'Bantuan Teknis & Error'}</option>
                    <option value="Pertanyaan Umum">{t('contact.sub_2') || 'Pertanyaan Umum'}</option>
                    <option value="Kerja Sama">{t('contact.sub_3') || 'Kerja Sama Bisnis'}</option>
                    <option value="Lainnya">{t('contact.sub_4') || 'Lainnya'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-on-surface">{t('contact.message') || 'Isi Pesan'} <span className="text-red-500">*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={5}
                    placeholder={t('contact.message_ph') || "Tuliskan pertanyaan atau pesan Anda secara detail..."}
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y transition-all"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary font-bold py-3.5 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={18} /> {t('contact.send_msg') || 'Kirim Pesan'}
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-green-500" />
                    {t('contact.secure') || 'Data Anda aman. Kami tidak akan mengirimkan spam.'}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16 bg-surface-container-low border border-outline-variant rounded-2xl p-6 md:p-8">
        <h3 className="font-bold text-xl text-on-surface mb-6 text-center">
          {t('contact.faq') || 'Pertanyaan yang Sering Diajukan (FAQ)'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-surface border border-outline-variant/50 p-5 rounded-xl shadow-sm">
            <h4 className="font-bold text-sm text-on-surface mb-2">{t('contact.faq1_q') || 'Apakah file PDF saya disimpan oleh Tacopdf?'}</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {t('contact.faq1_a') || 'Tidak. Semua pemrosesan (seperti memisahkan, menggabungkan, memberi watermark) dilakukan secara lokal di dalam browser Anda. File Anda tidak pernah diunggah ke server kami, menjamin privasi 100%.'}
            </p>
          </div>
          <div className="bg-surface border border-outline-variant/50 p-5 rounded-xl shadow-sm">
            <h4 className="font-bold text-sm text-on-surface mb-2">{t('contact.faq2_q') || 'Apakah alat di Tacopdf benar-benar gratis?'}</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {t('contact.faq2_a') || 'Ya, seluruh alat PDF yang kami sediakan gratis untuk digunakan. Kami menggunakan iklan non-intrusif (seperti Google AdSense) untuk mendukung biaya operasional website ini.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
