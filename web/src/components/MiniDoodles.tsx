const MINI_DOODLES = [
  { src: '/uploads/doodle-01.png', top: '8%', left: '6%', size: 72, rot: -14 },
  { src: '/uploads/doodle-02.png', top: '3%', left: '38%', size: 68, rot: 8 },
  { src: '/uploads/doodle-03.png', top: '6%', right: '18%', size: 80, rot: 12 },
  { src: '/uploads/doodle-05.png', top: '22%', right: '5%', size: 64, rot: -8 },
  { src: '/uploads/doodle-06.png', top: '32%', left: '3%', size: 70, rot: 16 },
  { src: '/uploads/doodle-07.png', top: '38%', right: '12%', size: 90, rot: -6 },
  { src: '/uploads/doodle-08.png', top: '48%', left: '8%', size: 88, rot: 10 },
  { src: '/uploads/doodle-09.png', top: '52%', right: '4%', size: 76, rot: -18 },
  { src: '/uploads/doodle-10.png', top: '58%', left: '45%', size: 62, rot: 20 },
  { src: '/uploads/doodle-11.png', top: '62%', right: '22%', size: 66, rot: -10 },
  { src: '/uploads/doodle-12.png', top: '68%', left: '2%', size: 84, rot: 7 },
  { src: '/uploads/doodle-13.png', top: '72%', right: '8%', size: 110, rot: -4 },
  { src: '/uploads/doodle-14.png', top: '76%', left: '32%', size: 66, rot: 14 },
  { src: '/uploads/doodle-15.png', top: '80%', left: '18%', size: 70, rot: -12 },
  { src: '/uploads/doodle-16.png', top: '82%', right: '28%', size: 88, rot: 9 },
  { src: '/uploads/doodle-17.png', top: '86%', left: '55%', size: 78, rot: -16 },
  { src: '/uploads/doodle-18.png', top: '88%', left: '8%', size: 66, rot: 18 },
  { src: '/uploads/doodle-19.png', top: '90%', right: '14%', size: 72, rot: -7 },
  { src: '/uploads/doodle-21.png', top: '93%', left: '42%', size: 80, rot: 11 },
  { src: '/uploads/doodle-22.png', top: '12%', left: '22%', size: 74, rot: -20 },
];

export default function MiniDoodles() {
  return (
    <div className="mini-doodles-layer" aria-hidden="true">
      {MINI_DOODLES.map(({ src, size, rot, ...pos }, i) => {
        const x = (i % 4) - 1.5;
        const y = ((i * 2) % 5) - 2;
        const duration = 18 + (i % 5) * 3;
        const delay = -(i * 1.35);
        return (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              position: 'absolute',
              width: size,
              height: size,
              objectFit: 'contain',
              background: 'transparent',
              mixBlendMode: 'multiply',
              filter: 'brightness(0.9) contrast(1.08)',
              transformOrigin: 'center',
              animation: `miniDoodleDrift ${duration}s ease-in-out ${delay}s infinite alternate`,
              ['--base-rotation' as string]: `${rot}deg`,
              ['--drift-x' as string]: `${x * 6}px`,
              ['--drift-y' as string]: `${y * 5}px`,
              pointerEvents: 'none',
              opacity: 0.24,
              userSelect: 'none',
              zIndex: 0,
              ...(pos as React.CSSProperties),
            }}
          />
        );
      })}
      <style>{`
        @keyframes miniDoodleDrift {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--base-rotation, 0deg));
          }
          100% {
            transform: translate3d(var(--drift-x), var(--drift-y), 0) rotate(var(--base-rotation, 0deg));
          }
        }
        .mini-doodles-layer img {
          --base-rotation: 0deg;
          will-change: transform;
        }
        @media (max-width: 767px) {
          .mini-doodles-layer img {
            opacity: 0.14 !important;
            animation-duration: 24s !important;
          }
        }
      `}</style>
    </div>
  );
}
