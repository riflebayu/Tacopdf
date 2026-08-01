// @ts-nocheck
"use client";
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export interface GlobalSettings {
  ads: {
    enabled: boolean;
    publisherId: string;
  };
  banner: {
    enabled: boolean;
    text: string;
    color: string;
  };
  seo: {
    title: string;
    description: string;
  };
  tools: Record<string, { enabled: boolean; badge: string }>;
}

const DEFAULT_SETTINGS: GlobalSettings = {
  ads: { enabled: false, publisherId: '' },
  banner: { enabled: false, text: 'Welcome to TacoPDF!', color: 'bg-primary' },
  seo: { title: 'TacoPDF - Free Local PDF Tools', description: 'Process PDF files securely in your browser' },
  tools: {} // Keys are tool IDs, e.g. { 'merge-pdf': { enabled: true, badge: 'HOT' } }
};

export const getGlobalSettings = async (): Promise<GlobalSettings> => {
  try {
    const docRef = doc(db, 'settings', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...DEFAULT_SETTINGS, ...docSnap.data() } as GlobalSettings;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const saveGlobalSettings = async (settings: GlobalSettings): Promise<boolean> => {
  try {
    const docRef = doc(db, 'settings', 'global');
    await setDoc(docRef, settings, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving settings:", error);
    return false;
  }
};

export const subscribeToSettings = (callback: (settings: GlobalSettings) => void) => {
  const docRef = doc(db, 'settings', 'global');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ ...DEFAULT_SETTINGS, ...docSnap.data() } as GlobalSettings);
    } else {
      callback(DEFAULT_SETTINGS);
    }
  }, (error) => {
    console.error("Error in settings subscription:", error);
  });
};
