"use client";

import ClientFooter from "@/components/client/footer/ClientFooter";
import FAQSection from "@/components/client/landing/FAQSection";
import FeaturesSection from "@/components/client/landing/FeaturesSection";
import HeroSection from "@/components/client/landing/HeroSection";
import HowItWorks from "@/components/client/landing/HowItWorks";
import ServiceSection from "@/components/client/landing/ServiceSection";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 to-blue-600 z-[99999]"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      <HeroSection />
      <ServiceSection />
      <FeaturesSection />
      <HowItWorks />
      <FAQSection />
      <ClientFooter />
    </>
  );
}
