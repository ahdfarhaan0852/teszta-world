import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import InteractiveLogo from './InteractiveLogo';
import MarqueeText from './MarqueeText';
import ProductQuickView from './ProductQuickView';

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
  },
  {
    id: 8,
    name: 'TZ-08 CARGO SWEATPANTS',
    price: 'IDR 389.000',
    image: '/images/product-8.png',
    description: 'Relaxed fleece cargo pants featuring modular pocket arrays, elastic drawstring waist, and cuff adjusters.',
    specs: ['380 GSM heavyweight fleece', 'Utility cargo pockets', 'Metal toggle drawstrings', 'Adjustable elastic ankle cuffs'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 9,
    name: 'TZ-09 TRUCKER JACKET',
    price: 'IDR 459.000',
    image: '/images/product-9.png',
    description: 'Classic trucker silhouette in custom washed heavy cotton canvas. Features metallic branded button closures.',
    specs: ['12oz heavyweight cotton canvas', 'Acid wash finish', 'Branded metal rivets', 'Adjustable waistband tabs'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 10,
    name: 'TZ-10 Y2K BUCKET HAT',
    price: 'IDR 179.000',
    image: '/images/product-10.png',
    description: 'Wide-brim bucket hat with distressed edges and embroidered contrasting brand logos.',
    specs: ['100% durable cotton twill', 'Distressed vintage details', 'Embroidered ventilation eyelets', 'Comfort sweatband inside'],
    sizes: ['One Size']
  },
  {
    id: 11,
    name: 'TZ-11 INDUSTRIAL TRACK PANTS',
    price: 'IDR 359.000',
    image: '/images/product-11.png',
    description: 'Heavy nylon track pants with contrast side striping, zipped side pockets, and snap button cuffs.',
    specs: ['Premium crinkle nylon fabric', 'Mesh lining for breathability', 'Secure YKK zipper pockets', 'Reflective stripe detailing'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 12,
    name: 'TZ-12 UTILITY TECH VEST',
    price: 'IDR 329.000',
    image: '/images/product-12.png',
    description: 'Multi-pocket tactical vest built for modular storage. Adjustable side straps fit any layering configuration.',
    specs: ['Ripstop tactical fabric', '6 pocket modular configuration', 'Quick-release side buckles', 'Rear utility mesh pocket'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 13,
    name: 'TZ-13 ZIP-UP FLEECE HOODIE',
    price: 'IDR 529.000',
    image: '/images/product-13.png',
    description: 'Heavy brushback fleece zip hoodie. Two-way matte black zipper and dropped shoulder seam detailing.',
    specs: ['420 GSM heavy brushback fleece', 'YKK double-slider zipper', 'Tonal logo embroidery', 'Double-lined hood structure'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 14,
    name: 'TZ-14 GRAPHIC OVERSIZED TEE',
    price: 'IDR 249.000',
    image: '/images/product-14.png',
    description: 'Ultra-heavy box-fit t-shirt featuring high-density plastisol cybernetic graphics printed on chest and back.',
    specs: ['260 GSM combed cotton', 'Premium plastisol screen print', 'Preshrunk to retain shape', 'Thick ribbed crewneck collar'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 15,
    name: 'TZ-15 KNIT CROPPED SWEATER',
    price: 'IDR 399.000',
    image: '/images/product-15.png',
    description: 'Coarse knit cropped fit sweater. Loose gauge construction, ribbed hem, cuffs, and neckband.',
    specs: ['Acrylic-wool blend yarn', 'Distressed drop-needle look', 'Heavy boxy cropped shape', 'Drop shoulder seams'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 16,
    name: 'TZ-16 SCUTUM WINDBREAKER',
    price: 'IDR 449.000',
    image: '/images/product-16.png',
    description: 'Waterproof panelled windbreaker jacket with high collar hood and elastic drawcords.',
    specs: ['Waterproof micro-ripstop shell', 'Adjustable toggle hood', 'Velcro adjustable sleeve tabs', 'Reflective print details'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 17,
    name: 'TZ-17 REFLECTIVE BEANIE',
    price: 'IDR 149.000',
    image: '/images/product-17.png',
    description: 'Double-layer knit beanie featuring reflective threads woven into the cuff for low-light visibility.',
    specs: ['100% reflective acrylic thread', 'Classic cuffed design', 'High elastic shape retention', 'Minimalist woven label'],
    sizes: ['One Size']
  },
  {
    id: 18,
    name: 'TZ-18 TECH SLING BAG',
    price: 'IDR 229.000',
    image: '/images/product-18.png',
    description: 'Compact crossbody bag with dual main zipped compartments, key clip, and adjustable webbed shoulder strap.',
    specs: ['CORDURA water-resistant nylon', 'FIDLOCK magnetic buckle strap', 'Internal organization pockets', 'High-tensile hardware'],
    sizes: ['One Size']
  },
  {
    id: 19,
    name: 'TZ-19 COTTON RIBBED SOCKS',
    price: 'IDR 89.000',
    image: '/images/product-19.png',
    description: 'Cushioned crew socks featuring custom sports ribbing and jacquard logo graphics along the calf.',
    specs: ['80% combed cotton, 20% spandex', 'Cushioned footbed support', 'Ribbed calf band elasticity', 'Seamless toe box closure'],
    sizes: ['One Size']
  },
  {
    id: 20,
    name: 'TZ-20 VINTAGE SWEATSHIRT',
    price: 'IDR 419.000',
    image: '/images/product-20.png',
    description: 'Sun-faded wash sweatshirt with retro collar drop and relaxed cuffs. Hand-softened fabric texture.',
    specs: ['360 GSM combed cotton fleece', 'Sun-faded stone wash dye', 'Relaxed ribbed side inserts', 'Classic crewneck collar drop'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 21,
    name: 'TZ-21 BASEBALL LOGO JERSEY',
    price: 'IDR 349.000',
    image: '/images/product-21.png',
    description: 'Streetwear jersey silhouette featuring custom button front, contrast sleeve piping, and chenille brand patch.',
    specs: ['Heavy mesh breathable fabric', 'Chenille patch chest graphics', 'White contrast line piping', 'Scalloped athletic hemline'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 22,
    name: 'TZ-22 UTILITY CANVAS BELT',
    price: 'IDR 129.000',
    image: '/images/product-22.png',
    description: 'Extra-long canvas belt featuring tactical metal slide release buckle with laser engraved logo details.',
    specs: ['High-density woven canvas strap', 'Tactical cobra metal buckle', 'Laser engraved brand emblem', 'Heat-sealed belt end clip'],
    sizes: ['One Size']
  },
  {
    id: 23,
    name: 'TZ-23 PARKA FISHTAIL SHELL',
    price: 'IDR 599.000',
    image: '/images/product-23.png',
    description: 'Traditional fishtail parka updated with tech shell fabrics, water-resistant zip runs, and drawcord waist waist.',
    specs: ['Matte nylon tech outer shell', 'Drawstring waist & fishtail hem', 'Utility arm pockets', 'Dual-entry handwarmer pockets'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 24,
    name: 'TZ-24 ATHLETIC MESH SHORTS',
    price: 'IDR 199.000',
    image: '/images/product-24.png',
    description: 'Double-layered mesh shorts with extra wide elastic waistband and extra-long cotton drawstrings.',
    specs: ['Double-layer heavyweight mesh', 'Extra-long waist drawstrings', 'Deep zipper side pockets', 'Relaxed knee-length fit'],
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export default function MainShowcase() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const currentFrameRef = useRef(0);
  const [images, setImages] = useState([]);
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [radius, setRadius] = useState(550);

  // Refs untuk gesture drag / swipe dan pergerakan orbit inersia
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const userDragY = useRef(0);
  const userDragX = useRef(0); // vertical drag tilt offset
  const scrollRotationY = useRef(0);
  const baseTiltX = useRef(-22); // mulai dengan tilt mendongak

  const currentRotationY = useRef(0);
  const currentRotationX = useRef(-22);
  const currentRotationZ = useRef(0);

  // Variasi posisi acak unik & deterministik untuk visual Y2K deconstructed
  const getCardOffsets = (id) => {
    const sin1 = Math.sin(id * 9.13);
    const sin2 = Math.cos(id * 12.45);
    const sin3 = Math.sin(id * 7.89);
    return {
      y: sin1 * 30,       // offset Y: -30px s.d 30px
      z: sin2 * 20,       // offset Z: -20px s.d 20px
      rotX: sin3 * 3,     // rotasi X: -3deg s.d 3deg
      rotZ: sin1 * 4,     // rotasi Z: -4deg s.d 4deg
    };
  };

  const totalFrames = 240;

  const handleImageLoad = () => {
    setLoadedImagesCount((prev) => prev + 1);
  };

  // Responsivitas radius orbit 3D secara dinamis
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(550); // radius jauh di mobile agar tidak menumpuk
      } else {
        // Radius sangat jauh di desktop agar 24 produk memiliki ruang keliling yang cukup luas
        setRadius(Math.max(900, window.innerWidth * 0.65));
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Efek scroll untuk mengontrol visibilitas header navigasi
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efek gesture drag & swipe untuk memutar orbit secara manual
  useEffect(() => {
    const container = document.getElementById('orbit-container');
    if (!container) return;

    const handleStart = (e) => {
      isDragging.current = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX.current = clientX;
      startY.current = clientY;
    };

    const handleMove = (e) => {
      if (!isDragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - startX.current;
      const deltaY = clientY - startY.current;

      startX.current = clientX;
      startY.current = clientY;

      userDragY.current -= deltaX * 0.22; // kepekaan putaran horizontal
      userDragX.current -= deltaY * 0.22; // kepekaan tilt vertikal

      // Batasi tilt vertikal kursor agar tidak terbalik
      userDragX.current = Math.min(25, Math.max(-25, userDragX.current));
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    // Support touch swipe mobile (passive true agar scroll halaman tidak patah)
    container.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      container.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);

      container.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  // Preloading 240 frame gambar ke memori browser
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameName = `frame_${String(i).padStart(3, '0')}.jpg`;
      img.src = `/frames/${frameName}`;
      
      img.onload = () => {
        loadedCount++;
        setTargetProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setTargetProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  // Simulasi progress loading yang halus dan premium
  useEffect(() => {
    if (displayedProgress < targetProgress) {
      const timer = setTimeout(() => {
        setDisplayedProgress((prev) => Math.min(prev + 1, targetProgress));
      }, 25); // Kecepatan aman, 100 langkah * 25md = ~2.5 detik minimum durasi loading
      return () => clearTimeout(timer);
    } else if (displayedProgress === 100 && targetProgress === 100) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 600); // Tambahan jeda buffer agar 100% terbaca jelas oleh pengguna
      return () => clearTimeout(timer);
    }
  }, [displayedProgress, targetProgress]);

  // Utilitas menggambar ke Canvas (aspect contain)
  const drawImageProp = (ctx, img, w, h) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    
    let renderWidth, renderHeight;
    
    if (imgRatio > canvasRatio) {
      renderWidth = w;
      renderHeight = w / imgRatio;
    } else {
      renderHeight = h;
      renderWidth = h * imgRatio;
    }
    
    const renderX = (w - renderWidth) * 0.5;
    const renderY = (h - renderHeight) * 0.5;
    
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);
  };

  // GSAP ScrollTrigger untuk mengelola seluruh interaksi pin (Rotasi & Katalog Slide)
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawFrame = (index) => {
      if (images[index] && context) {
        currentFrameRef.current = index;
        drawImageProp(context, images[index], canvas.width, canvas.height);
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    drawFrame(0);

    // Gunakan gsap.context() untuk manajemen unmount dan StrictMode React yang bersih
    const ctx = gsap.context(() => {
      const frameObj = { val: 0 };
      const track = trackRef.current;

      // 1. Timeline pinning utama yang mengunci layar untuk rotasi dan transisi katalog
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#catalog-section', // Pemicunya di container interaktif
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.2}`, // Durasi pin total mencakup rotasi 3D & putaran orbit
          pin: true, // pin container langsung untuk stabilitas layout
          pinSpacing: true,
          scrub: 1.5, // damping inersia untuk pergerakan putaran yang ultra halus
          invalidateOnRefresh: true,
        }
      });

      // A. Putar frame produk di bagian awal pin (durasi 1.2 dalam timeline)
      tl.to(frameObj, {
        val: images.length - 1,
        duration: 1.2,
        ease: 'none',
        onUpdate: () => {
          const frameIndex = Math.min(
            images.length - 1,
            Math.max(0, Math.floor(frameObj.val))
          );
          drawFrame(frameIndex);
        },
      }, 0);

      // B. Fade-in canvas produk di awal (durasi 0.3)
      tl.fromTo(canvas, 
        { opacity: 0 },
        { opacity: 0.8, ease: 'power1.out', duration: 0.3 },
        0
      );

      // C. Fade-out canvas & info rotasi di tengah timeline (durasi 0.2, mulai dari detik 1.0)
      tl.to(canvas, 
        { opacity: 0, ease: 'power1.in', duration: 0.2 },
        1.0
      );
      tl.to('#rotation-header', 
        { opacity: 0, y: -40, ease: 'power1.inOut', duration: 0.2 },
        1.0
      );
      tl.to('#rotation-footer', 
        { opacity: 0, y: 40, ease: 'power1.inOut', duration: 0.2 },
        1.0
      );

      // D. Animasi Rotasi 3D Orbit Carousel dengan Ayunan Tilt Acak & Dinamis (atas/bawah/samping)
      if (track) {
        // 1. Animasi proxy scroll untuk rotasi dasar Y
        const rotationProxy = { value: 0 };
        tl.fromTo(rotationProxy,
          { value: 0 },
          { 
            value: -360, 
            ease: 'none', 
            duration: 1.7,
            onUpdate: () => {
              scrollRotationY.current = rotationProxy.value;
            }
          },
          1.3
        );

        // 2. Animasi tilt basis scroll (poros X)
        const tiltProxy = { value: -22 };
        tl.fromTo(tiltProxy,
          { value: -22 },
          { 
            value: 18, 
            ease: 'power1.inOut', 
            duration: 1.3,
            onUpdate: () => {
              baseTiltX.current = tiltProxy.value;
            }
          },
          1.3
        );
        tl.to(tiltProxy,
          { 
            value: -12, 
            ease: 'power1.out', 
            duration: 0.4,
            onUpdate: () => {
              baseTiltX.current = tiltProxy.value;
            }
          },
          2.6
        );

        // GSAP Ticker loop untuk pergerakan inersia (damped float) & wobble melayang acak
        const updateOrbit = () => {
          // Efek wobble melayang perlahan secara acak
          const time = gsap.ticker.time * 0.4;
          const wobbleX = Math.sin(time) * 3;
          const wobbleY = Math.cos(time * 0.7) * 2;
          const wobbleZ = Math.sin(time * 0.5) * 1.5;

          // Hitung target akhir (scroll + manual user drag + wobble)
          const targetY = scrollRotationY.current + userDragY.current + wobbleY;
          const targetX = baseTiltX.current + userDragX.current + wobbleX;
          const targetZ = wobbleZ;

          // Lerp interpolation (0.07 damping untuk inersia super halus)
          currentRotationY.current += (targetY - currentRotationY.current) * 0.07;
          currentRotationX.current += (targetX - currentRotationX.current) * 0.07;
          currentRotationZ.current += (targetZ - currentRotationZ.current) * 0.07;

          const zOffset = window.innerWidth < 768 ? -280 : -550; // Jauhkan kamera dengan translateZ negatif
          gsap.set(track, {
            rotateY: currentRotationY.current,
            rotateX: currentRotationX.current,
            rotateZ: currentRotationZ.current,
            z: zOffset,
            "--track-rotation": currentRotationY.current
          });
        };

        gsap.ticker.add(updateOrbit);

        // Fade-in & Scale-up container orbit
        tl.fromTo('#orbit-container',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.4 },
          1.2
        );

        // Fade-in header marquee katalog
        tl.fromTo('#catalog-header-overlay',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 },
          1.2
        );

        // Fade-out container orbit & header di akhir scroll sebelum unpin
        tl.to('#orbit-container',
          { opacity: 0, scale: 0.9, ease: 'power2.in', duration: 0.2 },
          2.9
        );
        tl.to('#catalog-header-overlay',
          { opacity: 0, y: -20, ease: 'power2.in', duration: 0.2 },
          2.9
        );

        // Hentikan ticker saat unmount
        tl.eventCallback("onComplete", () => {});
        return () => {
          gsap.ticker.remove(updateOrbit);
        };
      }
    });

    return () => {
      ctx.revert(); // Reverts all GSAP elements, timelines, and scrollTriggers cleanly!
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, images, loadedImagesCount]);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} id="scroll-container" className="relative w-full bg-black text-brand-text">
      
      {/* Preloader Minimalis */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <div className="w-[240px] border border-white/10 p-5 bg-neutral-950 rounded">
              <h3 className="text-xs font-mono text-white tracking-[0.25em] text-center mb-3">
                TESZTA STUDIOS
              </h3>
              <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-white transition-all duration-100 ease-out"
                  style={{ width: `${displayedProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between font-mono text-[9px] text-white/50">
                <span>LOADING FRAMES</span>
                <span>{displayedProgress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Background Canvas (z-0) - Tetap fixed di belakang */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none opacity-0"
      />

      {/* Navigation Header (fixed top-0) */}
      <motion.header 
        initial={{ y: -72, opacity: 0 }}
        animate={{ 
          y: showHeader ? 0 : -72, 
          opacity: showHeader ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-6 md:px-12 border-b border-brand-border bg-black/60 backdrop-blur-md z-30"
      >
        <div 
          onClick={() => scrollToSection('#hero-section')}
          className="font-sans font-bold text-base tracking-[0.25em] uppercase text-white cursor-pointer hover:text-neutral-300 transition-colors"
        >
          TESZTA STUDIOS
        </div>
        
        <div className="flex gap-6 font-mono text-[10px] tracking-wider text-brand-muted">
          <button 
            onClick={() => scrollToSection('#catalog-section')}
            className="hover:text-white transition-colors duration-300 cursor-pointer"
          >
            [ CATALOG ]
          </button>
          <button 
            onClick={() => scrollToSection('#about-section')}
            className="hover:text-white transition-colors duration-300 cursor-pointer"
          >
            [ ABOUT ]
          </button>
          <a 
            href="https://shopee.co.id/teszta.studios?categoryId=100011&entryPoint=ShopByPDP&itemId=26575400254" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            [ SHOPEE ]
          </a>
        </div>
      </motion.header>

      {/* Vertically Stacked Content Sections (z-10) */}
      <div className="relative z-10 w-full pt-[72px]">

        {/* SECTION 1: WELCOME PAGE */}
        <section 
          id="hero-section" 
          className="w-full h-[90dvh] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-black"
        >
          {/* Step 1: Logo fades in with slight zoom-out effect shortly after loading screen finishes */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-10"
          >
            <InteractiveLogo />
          </motion.div>

          {/* Step 2: Welcome text fades in and slides up, appearing together with the logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="text-center max-w-md mt-4 select-none relative z-10"
          >
            <p className="font-mono text-[10px] text-brand-muted tracking-[0.3em] uppercase mb-2">
              // WELCOME TO TESZTA WORLD
            </p>
            <p className="font-sans text-xs text-neutral-400 tracking-wide leading-relaxed">
              Avant-garde streetwear silhouette configurations. Scroll down to explore the collection.
            </p>

            {/* Scroll Indicator */}
            <div className="mt-12 flex flex-col items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] text-brand-muted tracking-[0.25em] uppercase animate-pulse">
                Scroll to start
              </span>
              <div className="w-[1px] h-8 bg-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white rounded animate-bounce" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2 & 3: UNIFIED PRODUCT ROTATION & CATALOG SHOWCASE (PINNED FLOW) */}
        <div id="catalog-section" className="w-full relative bg-transparent">
          <div 
            id="interactive-flow-wrapper" 
            className="w-full h-screen relative overflow-hidden bg-transparent flex flex-col justify-between"
          >
            
            {/* A. PRODUCT ROTATION OVERLAY */}
            <div 
              id="rotation-header" 
              className="absolute top-0 left-0 right-0 pt-24 text-center select-none z-10"
            >
              <p className="font-mono text-[9px] text-brand-muted tracking-[0.3em] uppercase mb-1">
                // ACTIVE CONFIGURATION
              </p>
              <h2 className="font-sans font-bold text-lg md:text-xl text-white tracking-wider uppercase">
                TZ-02 WAFFLE SHIRT // 3D VIEW
              </h2>
            </div>

            <div 
              id="rotation-footer" 
              className="absolute bottom-0 left-0 right-0 pb-12 text-center select-none z-10"
            >
              <div className="flex flex-col items-center justify-center gap-2 opacity-80">
                <span className="font-mono text-[9px] text-brand-muted tracking-[0.25em] uppercase animate-pulse">
                  Scroll to spin product
                </span>
                <div className="w-[1px] h-8 bg-neutral-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white rounded animate-bounce" />
                </div>
              </div>
            </div>

            {/* B. CATALOG OVERLAY (MARQUEE BANNER) */}
            <div 
              id="catalog-header-overlay" 
              className="absolute top-0 left-0 right-0 pt-20 w-full opacity-0 z-10"
              style={{ pointerEvents: 'none' }}
            >
              <div className="py-4 bg-black/45 border-y border-brand-border">
                <MarqueeText />
              </div>
            </div>

            {/* C. 3D ORBIT CATALOG VIEWPORT */}
            <div 
              id="orbit-container" 
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto orbit-container overflow-visible opacity-0 cursor-grab active:cursor-grabbing"
            >
              <div className="orbit-viewport pointer-events-none">
                <div 
                  ref={trackRef} 
                  className="orbit-track pointer-events-auto"
                  style={{ 
                    transform: 'rotateX(-22deg) rotateY(0deg) rotateZ(-6deg)',
                    '--track-rotation': 0
                  }}
                >
                  {PRODUCTS.map((prod, index) => {
                    const angle = index * (360 / PRODUCTS.length);
                    const offsets = getCardOffsets(prod.id);
                    return (
                      <div
                        key={prod.id}
                        className="orbit-card"
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(${radius + offsets.z}px) translateY(${offsets.y}px) rotateX(${offsets.rotX}deg) rotateZ(${offsets.rotZ}deg) rotateY(calc(${-angle}deg - var(--track-rotation) * 1deg))`
                        }}
                      >
                        <motion.div
                          onClick={() => setSelectedProduct(prod)}
                          layoutId={`card-${prod.id}`}
                          className="w-full h-full hologram-card p-3 flex flex-col justify-between relative group rounded cursor-pointer"
                          whileHover={{
                            scale: 1.12,
                            y: -12,
                            borderColor: 'rgba(6, 182, 212, 0.8)',
                            boxShadow: '0 15px 35px rgba(6, 182, 212, 0.25)',
                            zIndex: 50
                          }}
                          transition={{ type: 'spring', stiffness: 100, damping: 22 }}
                        >
                          {/* Header Kartu */}
                          <div className="flex justify-between font-mono text-[8px] text-brand-muted select-none">
                            <span>// TZ-COLLECTION</span>
                            <span>TZ-00{prod.id}</span>
                          </div>

                          {/* Gambar Produk */}
                          <div className="flex-1 flex items-center justify-center p-2 bg-black/10 rounded my-2 overflow-hidden">
                            <motion.img
                              layoutId={`image-${prod.id}`}
                              src={prod.image}
                              alt={prod.name}
                              onLoad={handleImageLoad}
                              className="max-h-[140px] md:max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none rounded-sm"
                            />
                          </div>

                          {/* Info Produk */}
                          <div className="border-t border-brand-border/50 pt-2">
                            <h3 className="font-display font-bold text-[10px] md:text-xs text-white uppercase tracking-wider mb-0.5 truncate">
                              {prod.name}
                            </h3>
                            
                            <div className="flex justify-between items-center font-mono text-[9px] text-brand-muted">
                              <span>{prod.price}</span>
                              <span className="text-white text-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                [ VIEW ]
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: ABOUT BRAND */}
        <section 
          id="about-section" 
          className="w-full min-h-[85dvh] flex flex-col justify-center items-center px-6 py-24 bg-black/75 backdrop-blur-[4px]"
        >
          <div className="max-w-xl text-center select-none">
            <span className="font-mono text-[10px] text-brand-muted tracking-[0.3em] uppercase mb-3 block">
              // THE PHILOSOPHY
            </span>
            
            <h2 className="font-sans font-bold text-2xl md:text-4xl text-white uppercase tracking-tight mb-6">
              REDEFINING BOX-FIT APPAREL
            </h2>

            <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">
              Kami mengeksplorasi batas potongan kain tebal (*heavyweight fabrics*) untuk menghasilkan struktur pakaian yang kokoh dan asimetris. Setiap rancangan didesain untuk komunitas streetwear yang menghargai kenyamanan ekstrem dan siluet yang distingtif.
            </p>

            <div className="flex justify-center gap-8 font-mono text-[10px] text-brand-muted border-t border-brand-border pt-6 mt-6">
              <div>
                <span className="text-white block font-bold mb-1">240-420 GSM</span>
                HEAVYWEIGHT COTTON
              </div>
              <div>
                <span className="text-white block font-bold mb-1">Y2K INSPIRED</span>
                STREETWEAR SILHOUETTE
              </div>
              <div>
                <span className="text-white block font-bold mb-1">BOX-FIT</span>
                ERGONOMIC CUTS
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Product Detailed Expand Modal (layoutId Zoom) */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductQuickView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Universal Footer (At the bottom of vertical page flow) */}
      <footer className="w-full border-t border-brand-border bg-black py-12 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-20">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] text-brand-muted tracking-[0.2em] uppercase">// ACCESS PORTALS</span>
          <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-wider text-white">
            <a 
              href="https://shopee.co.id/teszta.studios?categoryId=100011&entryPoint=ShopByPDP&itemId=26575400254" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-muted transition-colors duration-300"
            >
              [ SHOPEE ]
            </a>
            <a 
              href="https://www.tokopedia.com/teszta-world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-muted transition-colors duration-300"
            >
              [ TOKOPEDIA ]
            </a>
            <a 
              href="https://www.instagram.com/teszta.world/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-muted transition-colors duration-300"
            >
              [ INSTAGRAM ]
            </a>
            <a 
              href="https://www.tiktok.com/@teszta.world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-muted transition-colors duration-300"
            >
              [ TIKTOK ]
            </a>
          </div>
        </div>
        
        <div className="flex flex-col items-start sm:items-end gap-2 text-left sm:text-right">
          <span className="font-mono text-[8px] text-brand-muted tracking-[0.25em] uppercase">// SYSTEM STATE: ONLINE</span>
          <span className="font-mono text-[9px] text-brand-muted uppercase tracking-widest">
            © 2026 TESZTA WORLD. ALL RIGHTS RESERVED.
          </span>
        </div>
      </footer>

    </div>
  );
}
