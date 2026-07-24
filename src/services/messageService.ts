import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';

export interface InboxMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const submitContactMessage = async (data: Omit<InboxMessage, 'id' | 'createdAt' | 'isRead'>): Promise<boolean> => {
  try {
    const messagesRef = collection(db, 'inbox');
    await addDoc(messagesRef, {
      ...data,
      createdAt: new Date().toISOString(),
      isRead: false
    });
    return true;
  } catch (error) {
    console.error("Error submitting message:", error);
    return false;
  }
};

export const getInboxMessages = async (): Promise<InboxMessage[]> => {
  try {
    const messagesRef = collection(db, 'inbox');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InboxMessage[];
  } catch (error) {
    console.error("Error fetching inbox messages:", error);
    return [];
  }
};

export const markMessageAsRead = async (messageId: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'inbox', messageId);
    await updateDoc(docRef, { isRead: true });
    return true;
  } catch (error) {
    console.error("Error marking message as read:", error);
    return false;
  }
};
