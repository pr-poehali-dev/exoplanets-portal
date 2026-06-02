import { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const StarField = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.2,
    }));
  }, []);

  return (
    <div className="stars-bg">
      {/* Nature green nebula blobs */}
      <div
        className="nebula-blob animate-nebula"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, #00c853, transparent)',
          top: '-15%',
          left: '-15%',
          animationDuration: '22s',
          opacity: 0.13,
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 550,
          height: 550,
          background: 'radial-gradient(circle, #00ff88, transparent)',
          top: '25%',
          right: '-10%',
          opacity: 0.09,
          animation: 'nebula-drift 28s ease-in-out infinite reverse',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 450,
          height: 450,
          background: 'radial-gradient(circle, #a8ff3e, transparent)',
          bottom: '5%',
          left: '15%',
          opacity: 0.07,
          animation: 'nebula-drift 20s ease-in-out infinite 6s',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, #00ffcc, transparent)',
          top: '60%',
          left: '50%',
          opacity: 0.06,
          animation: 'nebula-drift 16s ease-in-out infinite 3s',
        }}
      />

      {/* Stars */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill={star.id % 5 === 0 ? '#a8ffb0' : star.id % 7 === 0 ? '#b0ffe8' : 'white'}
            style={{
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default StarField;