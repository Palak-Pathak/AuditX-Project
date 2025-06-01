import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animate, createScope } from "animejs";
import { motion } from "framer-motion";

const featureData = [
  {
    title: "Real-Time Analysis",
    desc: "Blazing fast scanning and error detection as you code.",
  },
  {
    title: "Zero Trust Audits",
    desc: "Verifiable outputs and transparent audit trails — every single time.",
  },
  {
    title: "Neural Insights",
    desc: "AI-enhanced logic flaw detection tailored to your smart contracts.",
  },
];

const AboutSection = () => {
  const root = useRef(null);
  const scope = useRef(null);
  const hasAnimated = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      scope.current = createScope({ root }).add(() => {
        animate(".about-glow-title", {
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 1000,
          easing: "easeOutExpo",
        });

        animate(".about-blurb", {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 500,
          duration: 1000,
          easing: "easeOutExpo",
        });
      });

      hasAnimated.current = true;
    }

    return () => scope.current?.revert();
  }, [inView]);

  return (
    <section
      ref={(el) => {
        root.current = el;
        ref(el);
      }}
      id="about"
      className="relative z-10 w-full min-h-screen py-28 px-6 bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden"
    >
      {/* ✨ Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Glowing Blurs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-pink-500 opacity-20 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[200px] rounded-full animate-pulse delay-300" />

        {/* SVG Animated Wave */}
        <svg
          className="absolute bottom-0 w-full h-[400px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#grad)"
            fillOpacity="0.3"
            d="M0,160L40,149.3C80,139,160,117,240,101.3C320,85,400,75,480,96C560,117,640,171,720,181.3C800,192,880,160,960,144C1040,128,1120,128,1200,149.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,160L40,149.3C80,139,160,117,240,101.3C320,85,400,75,480,96C560,117,640,171,720,181.3C800,192,880,160,960,144C1040,128,1120,128,1200,149.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z;
                M0,180L40,160C80,140,160,100,240,96C320,92,400,124,480,144C560,164,640,172,720,160C800,148,880,116,960,128C1040,140,1120,196,1200,213C1280,229,1360,203,1400,190L1440,176L1440,320L0,320Z;
                M0,160L40,149.3C80,139,160,117,240,101.3C320,85,400,75,480,96C560,117,640,171,720,181.3C800,192,880,160,960,144C1040,128,1120,128,1200,149.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z"
            />
          </path>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff00cc" />
              <stop offset="100%" stopColor="#333399" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* 🔥 Title */}
        <h2 className="about-glow-title text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-400 tracking-tight mb-6 drop-shadow-[0_0_20px_rgba(255,0,255,0.3)]">
          The Future of Smart Contract Auditing
        </h2>

        {/* ✍️ Blurb */}
        <p className="about-blurb text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Empowering developers with automated, AI-enhanced, and community-audited security solutions. Because your code deserves the sharpest shield.
        </p>

        {/* 🚀 Feature Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featureData.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_#ff00ff66] hover:border-pink-500/30 cursor-pointer"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400 mb-2 group-hover:brightness-125 transition duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 transition duration-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
