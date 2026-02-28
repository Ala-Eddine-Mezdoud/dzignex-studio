"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"

type LandingProps = {
  className?: string
}

const Landing = ({ className = "" }: LandingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Subtle scroll parallax for the left content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Mouse parallax setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 40, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const headline = "We Build Digital Power."
  // Split for staggered reveal
  const words = headline.split(" ")

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-screen min-h-[850px] flex items-center overflow-hidden bg-dzignex-black ${className}`}
    >
      {/* Moving Perspective Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ perspective: '1000px' }}>
        <motion.div 
           animate={{ backgroundPositionY: ['0px', '80px'] }}
           transition={{ repeat: Infinity, ease: 'linear', duration: 3 }}
           className="w-[200%] h-[200%] absolute left-[-50%] top-[20%] origin-top"
           style={{
             backgroundImage: 'linear-gradient(var(--color-dzignex-white) 1px, transparent 1px), linear-gradient(90deg, var(--color-dzignex-white) 1px, transparent 1px)', 
             backgroundSize: '80px 80px',
             transform: 'rotateX(75deg) translateZ(-200px)',
           }}
        />
      </div>

      {/* Vignette gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-dzignex-black via-transparent to-dzignex-black pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-dzignex-black via-dzignex-black/80 to-transparent pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full">
        
        {/* Left Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center items-start pt-24 lg:pt-0"
          style={{ y: y1, opacity }}
        >
          {/* Eyebrow Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-[2px] bg-dzignex-blue shadow-[0_0_10px_rgba(12,62,255,0.5)]" />
            <span className="text-dzignex-blue uppercase tracking-[0.2em] text-sm font-semibold">Elite Creative Agency</span>
          </motion.div>

          {/* Staggered Headline */}
          <h1 className="font-semibold text-6xl md:text-7xl xl:text-8xl tracking-tighter text-dzignex-white leading-[1.05] mb-8">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-3 mr-4 lg:mr-5">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: 0.3 + (i * 0.1) 
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="text-xl md:text-2xl text-dzignex-white/60 tracking-tight max-w-xl font-light mb-12"
          >
            Design that speaks, packaging that sells, and brands people remember. We forge digital experiences that dominate.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden group bg-dzignex-white text-dzignex-black font-semibold text-base px-8 py-5 rounded-full flex items-center justify-center gap-3 w-full sm:w-auto transition-shadow hover:shadow-[0_0_30px_rgba(243,246,255,0.3)]"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">Book Consultation</span>
              <div className="absolute inset-0 bg-dzignex-blue transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 group-hover:text-dzignex-white transition-colors duration-500 font-medium">
                ↗
              </span>
            </motion.button>

            <motion.button 
              whileHover={{ x: 10 }}
              className="text-dzignex-white/50 hover:text-dzignex-white font-medium text-sm uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 group w-full sm:w-auto justify-center sm:justify-start"
            >
              <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">View Our Work</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content - Abstract Visual */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="lg:col-span-5 relative h-[40vh] lg:h-full w-full hidden md:flex items-center justify-center lg:justify-end"
          style={{ perspective: 1200 }}
        >
          {/* Abstract Composition with Multi-layered Parallax */}
          <div className="relative w-[300px] h-[300px] xl:w-[450px] xl:h-[450px]">
            
            {/* Blurry glow at back */}
            <motion.div 
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-80, 80]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-80, 80]),
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-dzignex-blue/20 blur-[100px] rounded-full point-events-none" 
            />

            {/* Layer 1: Back wireframe circle */}
            <motion.div 
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]),
                rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
                rotateY: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
              }}
              className="absolute inset-[10%] border opacity-30 border-dzignex-white/20 rounded-full"
            />

            {/* Layer 2: Rotating dashed ring */}
            <motion.div
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]),
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="absolute inset-[20%] border-[1px] border-dashed border-dzignex-blue/40 rounded-full"
            />

            {/* Layer 3: Middle glass pane */}
            <motion.div
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [60, -60]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [60, -60]),
                rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]),
                rotateY: useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]),
              }}
              className="absolute inset-[25%] bg-dzignex-white/[0.01] backdrop-blur-[2px] border border-dzignex-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dzignex-white/10 to-transparent" />
              {/* Inner accent inside glass */}
              <div className="w-[40%] h-[40%] border border-dzignex-white/5 rounded-full" />
            </motion.div>

            {/* Layer 4: Front solid focal element */}
            <motion.div
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-90, 90]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-90, 90]),
                rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]),
                rotateY: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]),
              }}
              className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] xl:w-[120px] xl:h-[120px] bg-gradient-to-tr from-dzignex-blue via-dzignex-blue to-dzignex-red/50 rounded-2xl shadow-[0_0_50px_rgba(12,62,255,0.4)] flex items-center justify-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-1/3 h-1/3 bg-dzignex-white rounded-full drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Landing