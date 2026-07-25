import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface InteractiveNatureProps {
  timeOverride: 'auto' | 'day' | 'night';
}

export function InteractiveNature({ timeOverride }: InteractiveNatureProps) {
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
    const dayAudio = 'https://actions.google.com/sounds/v1/ambiences/outdoor_summer_ambience.ogg';
    const nightAudio = 'https://actions.google.com/sounds/v1/ambiences/summer_night_crickets.ogg';
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(isNight ? nightAudio : dayAudio);
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

  // Generate Bushes
  const bushes = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    emoji: Math.random() > 0.5 ? '🌿' : '🪴',
    left: `${(i / 25) * 100}%`,
    bottom: -10 - Math.random() * 20,
    size: 60 + Math.random() * 40,
    delay: Math.random() * 2,
    duration: 5 + Math.random() * 5
  }));

  // Generate Clouds
  const clouds = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    y: 20 + Math.random() * 150,
    duration: 80 + Math.random() * 60,
    delay: -(Math.random() * 60) // Start halfway through animation
  }));

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

      {/* Ambient Bushes along the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden flex items-end opacity-90 drop-shadow-xl">
        {bushes.map((bush) => (
          <motion.div
            key={bush.id}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{
              repeat: Infinity,
              duration: bush.duration,
              ease: "easeInOut",
              delay: bush.delay
            }}
            className="absolute"
            style={{
              left: bush.left,
              bottom: bush.bottom,
              fontSize: bush.size,
              transformOrigin: 'bottom center'
            }}
          >
            {bush.emoji}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
