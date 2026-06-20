export default function MarqueeText() {
  const text = "// TESZTA STUDIOS // BATCH.01 COLLECTION // BOX-FIT STREETWEAR SPECIALISTS // ALTERED DIMENSION SYSTEM // COMFORT MODULES // ";

  return (
    <div className="w-full overflow-hidden bg-white/5 border-y border-neutral-900 py-3.5 relative select-none">
      <div className="animate-marquee font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 uppercase">
        <span>{text} {text} {text} {text}</span>
      </div>
    </div>
  );
}
