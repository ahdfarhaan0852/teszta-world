import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeText from './MarqueeText';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { 
    id: 1, 
    name: 'TZ-01 BOX-FIT TEE', 
    price: 'IDR 249.000', 
    image: '/images/product-1.jpeg',
    description: 'Heavyweight signature T-shirt with a relaxed boxy cut, drop shoulders, and reinforced crewneck stitching. Engineered for daily wear.',
    specs: ['100% Heavy Cotton', '240 GSM weight fabric', 'Pre-shrunk treatment', 'Signature boxy fit silhouette'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 2, 
    name: 'TZ-02 WAFFLE SHIRT', 
    price: 'IDR 289.000', 
    image: '/images/product-2.jpeg',
    description: 'Long-sleeve waffle knit shirt. Features comfortable micro-waffle texturing and structured sleeve cuffs.',
    specs: ['Cotton waffle knit blend', 'Elastic knit cuffs', 'Breathable warmth layer', 'Oversized silhouette cut'],
    sizes: ['M', 'L', 'XL']
  },
  { 
    id: 3, 
    name: 'TZ-03 OVERSIZED HOODIE', 
    price: 'IDR 499.000', 
    image: '/images/product-3.jpeg',
    description: 'Super-heavy fleece hoodie. Dual-layer hood, no drawstrings, oversized fit, and hidden kangaroo pocket.',
    specs: ['420 GSM heavy fleece', 'Double-lined structured hood', 'Hidden drop pockets', 'Ribbed side panels'],
    sizes: ['M', 'L', 'XL']
  },
  { 
    id: 4, 
    name: 'TZ-04 BOX-FIT LONG-SLEEVE', 
    price: 'IDR 279.000', 
    image: '/images/product-4.jpeg',
    description: 'Heavyweight long-sleeve cotton tee. Clean cuffs, drop shoulders, and minimalist brand identity print.',
    specs: ['240 GSM premium cotton', 'Elastic ribbed collar & cuffs', 'Tonal stitching details', 'Oversized drape fit'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 5, 
    name: 'TZ-05 INDUSTRIAL TEE', 
    price: 'IDR 249.000', 
    image: '/images/product-5.jpeg',
    description: 'Special edition box-fit tee featuring custom industrial graphics on the chest and back panel.',
    specs: ['100% Combed Heavy Cotton', 'Acid wash charcoal finish', 'High-density screen print', 'Reinforced neck rib'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 6, 
    name: 'TZ-06 SIGNATURE HOODIE', 
    price: 'IDR 499.000', 
    image: '/images/product-6.jpeg',
    description: 'Off-black heavy cotton fleece hoodie with back puff print detailing and custom hardware.',
    specs: ['400 GSM brushed fleece', 'Clean hem and cuffs', 'Tonal puff print graphics', 'Relaxed drop-shoulder fit'],
    sizes: ['M', 'L', 'XL']
  },
  { 
    id: 7, 
    name: 'TZ-07 REFLECTIVE CAP', 
    price: 'IDR 189.000', 
    image: '/images/product-7.jpeg',
    description: 'Adjustable techwear cap with reflective piping and durable water-resistant technical structure.',
    specs: ['Waterproof nylon shell', 'Reflective screen piping', 'Adjustable clip strapback', 'Low-profile structured crown'],
    sizes: ['One Size']
  }
];

export default function DragCarousel3D({ onSelectProduct }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedImagesCount((prev) => prev + 1);
  };

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      // Hitung jarak geser horizontal menggunakan function-based value untuk keandalan resize
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.5, // damping inersia untuk pergerakan horizontal yang mulus
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert(); // Reverts all GSAP pinning and tweens cleanly!
  }, [loadedImagesCount]);

  return (
    <div 
      ref={sectionRef} 
      id="catalog-section"
      className="w-full bg-black/55 backdrop-blur-[2px] border-y border-brand-border overflow-hidden"
    >
      {/* Teks Berjalan di bagian atas pin */}
      <div className="py-4">
        <MarqueeText />
      </div>

      {/* Track Grid Horizontal di tengah-tengah Viewport Penuh */}
      <div className="h-[80vh] flex items-center overflow-hidden relative">
        <div 
          ref={trackRef} 
          className="flex gap-8 px-12 md:px-24 w-max"
        >
          {PRODUCTS.map((prod, index) => {
            // Rotasi asimetris untuk estetika Y2K streetwear
            const rotateAngle = (index % 2 === 0 ? 1.5 : -1.5) * (index % 3 === 0 ? 1.2 : 0.8);

            return (
              <motion.div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                layoutId={`card-${prod.id}`}
                className="w-[270px] md:w-[320px] min-w-[270px] md:min-w-[320px] bg-neutral-950/80 border border-neutral-900 p-5 flex flex-col justify-between h-[420px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative group transition-all duration-300 rounded cursor-pointer"
                style={{ rotate: `${rotateAngle}deg` }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  y: -12,
                  borderColor: '#ffffff',
                  boxShadow: '0 12px 30px rgba(255,255,255,0.06)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {/* Header Kartu */}
                <div className="flex justify-between font-mono text-[9px] text-brand-muted">
                  <span>// TZ-COLLECTION.01</span>
                  <span>TZ-00{prod.id}</span>
                </div>

                {/* Gambar Produk */}
                <div className="flex-1 flex items-center justify-center p-4 bg-black/20 rounded my-4 overflow-hidden">
                  <motion.img
                    layoutId={`image-${prod.id}`}
                    src={prod.image}
                    alt={prod.name}
                    onLoad={handleImageLoad}
                    className="max-h-[220px] object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                </div>

                {/* Info Produk */}
                <div className="border-t border-brand-border pt-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-1">
                    {prod.name}
                  </h3>
                  
                  <div className="flex justify-between items-center font-mono text-xs text-brand-muted">
                    <span>{prod.price}</span>
                    <span className="text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      [ QUICK VIEW ]
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
