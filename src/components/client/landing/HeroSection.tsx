import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MuiButton from "@/common/MaterialUi/MuiButton";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

export default function HeroSection() {
  return (
    <div id="hero-section" className="bg-white dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="relative"
        >
          <div className="max-w-2xl py-36">
            <div className="text-center">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible,
                }}
                className="text-left text-4xl font-bold tracking-tight sm:text-6xl text-white"
              >
                Receive Online SMS with Virtual Number Service
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg leading-8 text-left text-white"
              >
                Use our disposable phone number service to verify your accounts.
                Cheap and reliable SMS verification service. Pay with
                credit/debit card or cryptocurrency.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex items-center justify-start gap-x-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a href="/services">
                    <MuiButton color="success">Order Now</MuiButton>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          ></div>
        </motion.div>
      </div>
    </div>
  );
}
