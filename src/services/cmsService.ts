import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));

export const getPageContent = async (pageId: string): Promise<string> => {
  try {
    const docRef = doc(db, 'cms', pageId);
    const docSnap = await Promise.race([
      getDoc(docRef),
      timeout(3000)
    ]) as any;
    
    if (docSnap && docSnap.exists && docSnap.exists()) {
      return docSnap.data().content || '';
    }
  } catch (error) {
    console.warn(`Firebase fetch failed for ${pageId}, falling back to localStorage.`);
  }
  return localStorage.getItem(`tacopdf_cms_${pageId}`) || '';
};

export const savePageContent = async (pageId: string, content: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'cms', pageId);
    await setDoc(docRef, {
      content: content,
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem(`tacopdf_cms_${pageId}`, content); // Sync to local as well
    return true;
  } catch (error) {
    console.warn(`Firebase save failed for ${pageId}, saving to localStorage instead.`);
    localStorage.setItem(`tacopdf_cms_${pageId}`, content);
    return true; // Return true because it saved locally
  }
};
