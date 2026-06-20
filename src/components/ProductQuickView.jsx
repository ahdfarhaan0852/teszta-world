import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductQuickView({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Click backdrop to close */}
      <div className="absolute inset-0 z-0" onClick={onClose}></div>

      {/* Modal Box */}
      <motion.div
        layoutId={`card-${product.id}`}
        className="relative z-10 w-full max-w-4xl bg-neutral-950 border border-brand-border text-white p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] md:max-h-[95vh] overflow-y-auto rounded"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 font-mono text-xs text-brand-muted hover:text-white border border-brand-border hover:border-white px-3 py-1.5 transition-all duration-300 transform active:scale-95 cursor-pointer z-20"
        >
          [ CLOSE ]
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-6">
          
          {/* Left Media Side: Image (LayoutId zoom) */}
          <div className="md:col-span-6 flex items-center justify-center bg-black/30 border border-brand-border p-6 rounded relative aspect-square overflow-hidden">
            <motion.img
              layoutId={`image-${product.id}`}
              src={product.image}
              alt={product.name}
              className="max-h-[350px] object-contain select-none"
            />
          </div>

          {/* Right Product Info Details */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                // TZ-COLLECTION.01
              </span>
              <h2 className="font-sans font-bold text-2xl md:text-3xl text-white uppercase tracking-tight mt-1 mb-2">
                {product.name}
              </h2>
              <div className="font-mono text-lg font-bold text-white mb-6">
                {product.price}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-mono text-[9px] text-brand-muted uppercase tracking-wider mb-2">
                  // DESCRIPTION
                </h4>
                <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="mb-6">
                <h4 className="font-mono text-[9px] text-brand-muted uppercase tracking-wider mb-2">
                  // TECHNICAL SPECS
                </h4>
                <ul className="grid grid-cols-1 gap-1.5 font-mono text-[10px] text-neutral-500">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sizing Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-mono text-[9px] text-brand-muted uppercase tracking-wider">
                    // SELECT SIZE
                  </h4>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="font-mono text-[9px] text-brand-muted hover:text-white hover:underline uppercase cursor-pointer"
                  >
                    [ SIZE GUIDE ]
                  </button>
                </div>
                
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 border font-mono text-[10px] font-bold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                        selectedSize === size
                          ? 'border-white text-white bg-white/10'
                          : 'border-brand-border text-brand-muted hover:border-neutral-500 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Redirect CTAs */}
            <div className="border-t border-brand-border pt-6">
              <h4 className="font-mono text-[9px] text-brand-muted uppercase tracking-wider mb-4">
                // BUY NOW AT OFFICIAL STORES
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://shopee.co.id/teszta.studios?categoryId=100011&entryPoint=ShopByPDP&itemId=26575400254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-orange-500/30 bg-orange-500/5 hover:bg-orange-500 hover:text-white text-orange-500 text-xs font-mono font-bold tracking-widest text-center uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_10px_rgba(249,115,22,0.05)] hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                >
                  BUY ON SHOPEE
                </a>
                <a
                  href="https://www.tokopedia.com/teszta-world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-green-500/30 bg-green-500/5 hover:bg-green-500 hover:text-white text-green-500 text-xs font-mono font-bold tracking-widest text-center uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_10px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                >
                  BUY ON TOKOPEDIA
                </a>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="https://www.instagram.com/teszta.world/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-[9px] text-brand-muted hover:text-white hover:underline uppercase tracking-wider"
                >
                  // OR CONTACT VIA INSTAGRAM DIRECT MESSAGE
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sizing Chart Sub-Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          >
            <div className="absolute inset-0 z-0" onClick={() => setShowSizeChart(false)}></div>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative z-10 w-full max-w-sm bg-neutral-950 border border-brand-border p-6 rounded shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-4 right-4 font-mono text-[10px] text-brand-muted hover:text-white cursor-pointer"
              >
                [ CLOSE ]
              </button>
              
              <h3 className="font-sans font-bold text-base text-white uppercase tracking-wider mb-6">
                SIZE SPECIFICATION CHART
              </h3>

              <table className="w-full font-mono text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-border text-white">
                    <th className="py-2">SIZE</th>
                    <th className="py-2">CHEST (cm)</th>
                    <th className="py-2">LENGTH (cm)</th>
                    <th className="py-2">SLEEVE (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 text-neutral-400">
                    <td className="py-2.5 font-bold text-white">S</td>
                    <td className="py-2.5">55</td>
                    <td className="py-2.5">68</td>
                    <td className="py-2.5">58</td>
                  </tr>
                  <tr className="border-b border-white/5 text-neutral-400">
                    <td className="py-2.5 font-bold text-white">M</td>
                    <td className="py-2.5">58</td>
                    <td className="py-2.5">70</td>
                    <td className="py-2.5">60</td>
                  </tr>
                  <tr className="border-b border-white/5 text-neutral-400">
                    <td className="py-2.5 font-bold text-white">L</td>
                    <td className="py-2.5">61</td>
                    <td className="py-2.5">72</td>
                    <td className="py-2.5">62</td>
                  </tr>
                  <tr className="border-b border-brand-border text-neutral-400">
                    <td className="py-2.5 font-bold text-white">XL</td>
                    <td className="py-2.5">64</td>
                    <td className="py-2.5">74</td>
                    <td className="py-2.5">64</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-4 font-sans text-[9px] text-neutral-600 leading-normal">
                * Note: Flat garment dimensions. Sizing is boxy/relaxed fit. Tolerance +/- 1.5 cm.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
