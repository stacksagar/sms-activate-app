"use client";

import FAQSection from "@/components/client/landing/FAQSection";
import FeaturesSection from "@/components/client/landing/FeaturesSection";
import HeroSection from "@/components/client/landing/HeroSection";
import HowItWorks from "@/components/client/landing/HowItWorks";
import ServiceSection from "@/components/client/landing/ServiceSection";
import { useSetting } from "@/context/SettingProvider";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const { setting } = useSetting();

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

      <div className="fixed right-4 bottom-4 text-white rounded z-[9999]">
        <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }}>
          <a
            target="_blank"
            className="cursor-pointer"
            title="telegram chat"
            href={`https://t.me/${setting?.public?.telegram_phone}`}
          >
            <Image
              width={44}
              height={44}
              className="rounded-full w-12"
              src="https://i.ibb.co/gydv2pz/telegram.jpg"
              alt=""
            />
          </a>
        </motion.div>
      </div>
    </>
  );
}
