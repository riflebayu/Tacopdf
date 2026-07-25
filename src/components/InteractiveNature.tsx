import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

interface InteractiveNatureProps {
  timeOverride: 'auto' | 'day' | 'night';
}

export function InteractiveNature({ timeOverride }: InteractiveNatureProps) {
  const [isNight, setIsNight] = useState(false);

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

  // Cat State
  const [catDirection, setCatDirection] = useState(1);
  const [catX, setCatX] = useState(0);
  const [catPaused, setCatPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/pets/cat_meow.ogg');
    audioRef.current.volume = 0.5;
  }, []);

  const handleCatClick = () => {
    if (!audioRef.current) return;
    setCatPaused(true);
    
    // Play sound and reset
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.error("Audio blocked by browser:", e));

    setTimeout(() => {
      setCatPaused(false);
    }, 1500); // Pause for 1.5s after meowing
  };

  // Simple game loop for the cat moving back and forth
  useEffect(() => {
    if (catPaused) return;
    const interval = setInterval(() => {
      setCatX((prev) => {
        const next = prev + (5 * catDirection);
        // Turn around logic (roughly spanning 0 to window.innerWidth - 100)
        const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 100 : 1000;
        if (next >= maxWidth) {
          setCatDirection(-1);
          return maxWidth;
        }
        if (next <= 0) {
          setCatDirection(1);
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [catDirection, catPaused]);

  // Flying Creatures (Random spawns)
  const [creatures, setCreatures] = useState<{ id: number, y: number, speed: number, type: string }[]>([]);
  
  useEffect(() => {
    const spawnCreature = () => {
      const id = Date.now() + Math.random();
      const y = Math.random() * (window.innerHeight * 0.5); // Fly in top half
      const speed = 15 + Math.random() * 20; // 15-35 seconds to cross screen
      
      const dayTypes = ['🕊️', '🦅', '🦋'];
      const nightTypes = ['🦇', '🦉'];
      const pool = isNight ? nightTypes : dayTypes;
      const type = pool[Math.floor(Math.random() * pool.length)];

      setCreatures(prev => [...prev, { id, y, speed, type }]);

      // Remove after they cross
      setTimeout(() => {
        setCreatures(prev => prev.filter(c => c.id !== id));
      }, speed * 1000);
    };

    // Spawn initially and then randomly every 5-15s
    spawnCreature();
    const interval = setInterval(spawnCreature, 5000 + Math.random() * 10000);
    
    return () => clearInterval(interval);
  }, [isNight]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Sky Elements */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-indigo-950/20' : 'bg-transparent'}`} />
      
      {isNight ? (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 right-20 text-6xl drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
        >
          🌙
        </motion.div>
      ) : (
        <div className="absolute top-10 right-20 text-6xl opacity-70">
          <motion.div animate={{ x: [0, 50, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>☁️</motion.div>
        </div>
      )}

      {/* Flying Creatures */}
      {creatures.map(c => (
        <motion.div
          key={c.id}
          initial={{ x: -100, y: c.y }}
          animate={{ x: typeof window !== 'undefined' ? window.innerWidth + 100 : 2000 }}
          transition={{ duration: c.speed, ease: "linear" }}
          className="absolute text-3xl opacity-80"
          style={{ transform: c.type === '🦇' ? 'scaleX(-1)' : 'none' }} // Ensure they face right if default is left
        >
          {c.type}
        </motion.div>
      ))}

      {/* Left Tree */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 text-[150px] drop-shadow-xl"
        style={{ transformOrigin: 'bottom center' }}
      >
        🌳
        {isNight && <span className="absolute top-10 left-10 text-3xl opacity-80 animate-pulse">🦉</span>}
        {!isNight && <span className="absolute top-10 left-10 text-3xl opacity-80">🕊️</span>}
      </motion.div>

      {/* Right Tree */}
      <motion.div
        animate={{ rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-10 -right-10 text-[180px] drop-shadow-xl"
        style={{ transformOrigin: 'bottom center' }}
      >
        🌲
      </motion.div>

      {/* Interactive Cat */}
      <motion.div
        style={{ left: catX }}
        animate={{ 
          scaleX: catDirection === 1 ? -1 : 1, // Flips horizontal based on direction
          scaleY: catPaused ? 1.2 : 1 
        }}
        className="absolute bottom-5 text-5xl cursor-pointer pointer-events-auto transition-transform hover:drop-shadow-lg z-50"
        onClick={handleCatClick}
        title="Meow!"
      >
        🐈
      </motion.div>
    </div>
  );
}
