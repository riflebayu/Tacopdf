// @ts-nocheck
"use client";
import React, { useEffect, useState } from 'react';
import { Settings, Save, Layout, Search, Megaphone, Wrench } from 'lucide-react';
import { GlobalSettings, getGlobalSettings, saveGlobalSettings } from '../services/settingsService';
import { TOOLS } from '../data/tools';

export function SettingsManager() {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getGlobalSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    const success = await saveGlobalSettings(settings);
    setIsSaving(false);
    if (success) alert('Pengaturan berhasil disimpan!');
    else alert('Gagal menyimpan pengaturan.');
  };

  if (!settings) {
    return (
      <div className="p-8 flex justify-center text-primary">
        <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
          <Settings className="text-primary" /> Pengaturan Bisnis & Website
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
          Simpan Semua
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ads Manager */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Layout size={20} className="text-secondary" /> Manajemen Iklan (AdSense)
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.ads.enabled}
                onChange={(e) => setSettings({ ...settings, ads: { ...settings.ads, enabled: e.target.checked } })}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <span className="text-on-surface font-medium">Aktifkan Iklan di Website</span>
            </label>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">AdSense Publisher ID</label>
              <input 
                type="text" 
                value={settings.ads.publisherId}
                onChange={(e) => setSettings({ ...settings, ads: { ...settings.ads, publisherId: e.target.value } })}
                placeholder="Misal: ca-pub-1234567890"
                className="w-full bg-background border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Global Banner */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Megaphone size={20} className="text-tertiary" /> Banner Pengumuman
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.banner.enabled}
                onChange={(e) => setSettings({ ...settings, banner: { ...settings.banner, enabled: e.target.checked } })}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <span className="text-on-surface font-medium">Tampilkan Banner di Pucuk Website</span>
            </label>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Teks Pengumuman</label>
              <input 
                type="text" 
                value={settings.banner.text}
                onChange={(e) => setSettings({ ...settings, banner: { ...settings.banner, text: e.target.value } })}
                placeholder="Misal: Diskon 50% hari ini!"
                className="w-full bg-background border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* SEO Manager */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm md:col-span-2">
          <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Search size={20} className="text-primary" /> Pengaturan SEO (Pencarian Google)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Judul Website (Title)</label>
              <input 
                type="text" 
                value={settings.seo.title}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                className="w-full bg-background border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Deskripsi Singkat (Meta Description)</label>
              <input 
                type="text" 
                value={settings.seo.description}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                className="w-full bg-background border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
        {/* Tool Toggles */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm md:col-span-2">
          <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Wrench size={20} className="text-secondary" /> Kendali Alat PDF
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TOOLS.map((tool) => {
              const toolSetting = settings.tools[tool.id] || { enabled: true, badge: '' };
              return (
                <div key={tool.id} className="bg-background border border-outline-variant p-4 rounded-xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-on-surface">{tool.name}</span>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={toolSetting.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          tools: {
                            ...settings.tools,
                            [tool.id]: { ...toolSetting, enabled: e.target.checked }
                          }
                        })}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                    </label>
                  </div>
                  <div>
                    <input 
                      type="text"
                      placeholder="Label (Misal: NEW, HOT)"
                      value={toolSetting.badge}
                      onChange={(e) => setSettings({
                        ...settings,
                        tools: {
                          ...settings.tools,
                          [tool.id]: { ...toolSetting, badge: e.target.value }
                        }
                      })}
                      className="w-full bg-surface-container border border-outline-variant rounded-lg p-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
