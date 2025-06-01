import { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';
import { Link } from "react-router-dom";


const HeroSection = () => {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate('.hero-title', {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 800,
        delay: 300,
        easing: 'easeInOutQuad',
      });

      animate('.hero-subtitle', {
        opacity: [0, 1],
        duration: 600,
        delay: 800,
        easing: 'easeInOutQuad',
      });

      animate('.hero-button', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 1000,
        easing: 'easeOutExpo',
      });
    });

    return () => scope.current.revert();
  }, []);

  return (

    <div
      ref={root}
      className="relative z-10 h-screen flex flex-col justify-center items-center text-center px-6"
    >
      
     <h1 className="hero-title text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient tracking-wide">
           Smart Contract Auditor
    </h1>

      <p className="hero-subtitle mt-4 text-lg md:text-xl text-white/80 max-w-xl">
        Decentralized Security · Trustless Infrastructure · Verified Protocols
      </p>
      <Link
          to="/try"
          className="hero-button mt-6 bg-[#00faff] hover:bg-[#cc99ff] text-black px-6 py-3 rounded-xl shadow-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-[#cc99ff]/50"
      >
         Try AuditX
       </Link>

    </div>
  );
};

export default HeroSection;
