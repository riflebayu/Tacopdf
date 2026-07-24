import { db } from '../firebase';
import { doc, getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';

// Call this when the app loads to track a visit and country
export const trackPageView = async () => {
  try {
    // Basic session storage check so we don't count reloads as new unique visits
    if (sessionStorage.getItem('tacopdf_visited')) return;
    sessionStorage.setItem('tacopdf_visited', 'true');

    // Fetch country
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const country = data.country_name || 'Unknown';

    // Update daily total visits
    const today = new Date().toISOString().split('T')[0];
    const statsRef = doc(db, 'analytics', 'daily_stats');
    
    // Check if doc exists, if not create it
    const statsSnap = await getDoc(statsRef);
    if (!statsSnap.exists()) {
      await setDoc(statsRef, {
        total_visits: 1,
        countries: { [country]: 1 }
      });
    } else {
      const currentCountries = statsSnap.data().countries || {};
      const countryCount = currentCountries[country] || 0;
      
      await updateDoc(statsRef, {
        total_visits: increment(1),
        [`countries.${country}`]: countryCount + 1
      });
    }
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

// Call this when a user clicks 'Process' on a tool
export const trackToolUsage = async (toolId: string) => {
  try {
    const statsRef = doc(db, 'analytics', 'tool_stats');
    const statsSnap = await getDoc(statsRef);
    
    if (!statsSnap.exists()) {
      await setDoc(statsRef, {
        [toolId]: 1
      });
    } else {
      await updateDoc(statsRef, {
        [toolId]: increment(1)
      });
    }
  } catch (error) {
    console.error("Failed to track tool usage:", error);
  }
};
