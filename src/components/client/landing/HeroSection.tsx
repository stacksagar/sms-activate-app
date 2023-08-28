import React, { useRef, useState } from "react";
import ClientHeader from "../header/ClientHeader";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import MuiButton from "@/common/MaterialUi/MuiButton";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

export default function HeroSection() {
  const constraintsRef = useRef(null);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="relative isolate grid grid-cols-1 md:grid-cols-12"
        >
          <div className="hidden md:flex col-span-4 items-center justify-end">
            <motion.div className="drag-area" ref={constraintsRef} />
            <motion.div
              animate={{
                y: [-10, 10],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              drag
              dragConstraints={constraintsRef}
            >
              <div className="-ml-10">
                <Player
                  autoplay={true}
                  loop={true}
                  src="/data/mobile-technology.json"
                  style={{ height: "500px" }}
                ></Player>
              </div>
            </motion.div>
          </div>

          <div className="col-span-8">
            <div className="mx-auto max-w-2xl py-36">
              <div className="text-center">
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible,
                  }}
                  className="text-left text-4xl font-bold tracking-tight sm:text-6xl"
                >
                  Receive Online SMS with Virtual Number Service
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-6 text-lg leading-8 text-left"
                >
                  Use our disposable phone number service to verify your
                  accounts. Cheap and reliable SMS verification service. Pay
                  with credit/debit card or cryptocurrency.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="mt-10 flex items-center justify-start gap-x-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link href="/dashboard">
                      <MuiButton color="secondary">Dashboard</MuiButton>
                    </Link>
                  </motion.div>

                  <Link
                    href="/auth/signin"
                    className="text-sm font-semibold leading-6 group"
                  >
                    Signin
                    <span aria-hidden="true" className="group-hover:pl-2">
                      →
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            ></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
