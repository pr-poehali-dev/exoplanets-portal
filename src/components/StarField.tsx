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
      {/* Nebula blobs */}
      <div
        className="nebula-blob animate-nebula"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, #b400ff, transparent)',
          top: '-10%',
          left: '-10%',
          animationDuration: '20s',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, #00e5ff, transparent)',
          top: '30%',
          right: '-8%',
          opacity: 0.08,
          animation: 'nebula-drift 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, #ff0080, transparent)',
          bottom: '10%',
          left: '20%',
          opacity: 0.07,
          animation: 'nebula-drift 18s ease-in-out infinite 5s',
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
            fill="white"
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
