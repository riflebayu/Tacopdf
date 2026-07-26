import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';

interface InteractiveNatureProps {
  timeOverride: 'auto' | 'day' | 'night';
}

export const InteractiveNature = React.memo(function InteractiveNature({ timeOverride }: InteractiveNatureProps) {
  const [isNight, setIsNight] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  // Determine Day/Night Mode
  useEffect(() => {
    if (timeOverride === 'day') {
      setIsNight(false);
    } else if (timeOverride === 'night') {
      setIsNight(true);
    } else {
      const hour = new Date().getHours();
      setIsNight(hour >= 18 || hour < 6);
    }
  }, [timeOverride]);

  // Handle Audio
  useEffect(() => {
    // Note: Due to strict CORS and hotlinking blocks, finding reliable direct MP3 URLs is difficult.
    // We will use a reliable sample for night, and leave day quiet to avoid 404 errors.
    const nightAudio = 'https://freewavesamples.com/files/Alesis-Sanctuary-QCard-Crickets.wav';
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (!isNight) return; // Only play crickets at night

    const audio = new Audio(nightAudio);
    audio.loop = true;
    audio.volume = 0.2; // Very quiet background noise
    audioRef.current = audio;

    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setAudioStarted(true)).catch(e => {
          console.warn("Autoplay prevented by browser. Waiting for user interaction.");
        });
      }
    };

    // Try playing immediately (might fail if no interaction yet)
    playAudio();

    // Attach interaction listener to play if it failed
    const handleInteraction = () => {
      if (!audioStarted) {
        playAudio();
      }
    };

    window.addEventListener('click', handleInteraction);
    
    return () => {
      audio.pause();
      window.removeEventListener('click', handleInteraction);
    };
  }, [isNight]);

  // Generate Clouds
  const clouds = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    y: 20 + Math.random() * 150,
    duration: 80 + Math.random() * 60,
    delay: -(Math.random() * 60) // Start halfway through animation
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Sky Overlay */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-indigo-950/30' : 'bg-transparent'}`} />
      
      {/* Sun or Moon */}
      <motion.div 
        key={isNight ? 'moon' : 'sun'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{ scale: { repeat: Infinity, duration: 8, ease: "easeInOut" }, opacity: { duration: 1 } }}
        className={`absolute top-12 right-16 text-7xl drop-shadow-[0_0_40px_${isNight ? 'rgba(255,255,255,0.5)' : 'rgba(255,223,0,0.6)'}]`}
      >
        {isNight ? '🌙' : '☀️'}
      </motion.div>

      {/* Clouds moving VERY slowly from right to left */}
      {!isNight && clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: typeof window !== 'undefined' ? window.innerWidth + 100 : 2000 }}
          animate={{ x: -300 }}
          transition={{
            repeat: Infinity,
            duration: cloud.duration,
            ease: "linear",
            delay: cloud.delay
          }}
          className="absolute text-[80px] opacity-40 drop-shadow-sm"
          style={{ top: cloud.y }}
        >
          ☁️
        </motion.div>
      ))}
      
      {isNight && clouds.map((cloud) => (
        <motion.div
          key={`night-${cloud.id}`}
          initial={{ x: typeof window !== 'undefined' ? window.innerWidth + 100 : 2000 }}
          animate={{ x: -300 }}
          transition={{
            repeat: Infinity,
            duration: cloud.duration * 1.2, // Move even slower at night
            ease: "linear",
            delay: cloud.delay
          }}
          className="absolute text-[80px] opacity-10 drop-shadow-sm brightness-50"
          style={{ top: cloud.y }}
        >
          ☁️
        </motion.div>
      ))}
    </div>
  );
});
