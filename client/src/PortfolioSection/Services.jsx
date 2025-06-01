import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animate, createScope } from "animejs";
import { motion } from "framer-motion";

const services = [
  {
    title: "AI-Powered Audit Report",
    desc: "Leverage advanced AI to generate intelligent audit summaries, optimized for clarity and impact.",
    icon: "🤖",
  },
  {
    title: "Slither-Based Detection",
    desc: "Uses Slither under the hood to trace security loopholes and vulnerabilities in your Solidity code.",
    icon: "🛡️",
  },
  {
    title: "Smart Suggestions",
    desc: "Provides actionable insights and best practice recommendations to fortify your contracts.",
    icon: "💡",
  },
  {
    title: "Summary & Classification",
    desc: "Categorizes issues by severity and highlights critical areas for immediate attention.",
    icon: "📊",
  },
  {
    title: "Downloadable Reports",
    desc: "Export and share comprehensive audit reports in beautifully formatted PDFs.",
    icon: "📄",
  },
];

const ServicesSection = () => {
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
        animate(".services-title", {
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 1000,
          easing: "easeOutExpo",
        });

        animate(".services-blurb", {
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
      id="services"
      className="relative z-10 w-full min-h-screen py-28 px-6 bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden"
    >
      {/* Decorative Animated Blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-600 opacity-10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-pink-500 opacity-20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="services-title text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-400 tracking-tight mb-6 drop-shadow-[0_0_20px_rgba(255,0,255,0.3)]">
          Services We Offer
        </h2>

        {/* Optional Intro */}
        <p className="services-blurb text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Cutting-edge tools and automation to audit your smart contracts with speed, accuracy, and style.
        </p>

        {/* Service Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_#ff00ff66] hover:border-pink-500/30 cursor-pointer"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400 mb-2 group-hover:brightness-125 transition duration-300">
                {service.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 transition duration-300">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
