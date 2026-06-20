import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

export default function InteractiveLogo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Memetakan posisi kursor kearah rotasi 3D
  // Batas rotasi diatur maksimal 15 derajat agar tetap elegan
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  // Pegas animasi spring agar gerakannya kenyal
  const springX = useSpring(rotateX, { stiffness: 90, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 90, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Hitung posisi relatif kursor dari pusat layar
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set(clientX - centerX);
      y.set(clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <div className="perspective-[1000px] flex items-center justify-center py-8">
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full max-w-[240px] md:max-w-[340px] cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <img
          src="/teszta-world-logo.png"
          alt="Teszta World Logo"
          className="w-full h-auto select-none pointer-events-none filter invert brightness-200 contrast-105"
          style={{ transform: 'translateZ(30px)' }}
        />
      </motion.div>
    </div>
  );
}
