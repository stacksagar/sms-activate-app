import React, { useRef } from "react";
import HowItWorksTabs from "./HowItWorksTabs";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

export default function HowItWorks() {
  const constraintsRef = useRef(null);
  return (
    <section id="how-it-works" className="landing_section2">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 place-items-center gap-6">
          <div className="hidden md:flex col-span-4 items-center border rounded border-[#ffffff3b] justify-end h-fit">
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

          <div className="xl:col-span-6 flex flex-col items-center">
            <div className="max-w-xl text-center mx-auto">
              <h2 className="section_title text-white">
                Start receiving SMS quickly by following simple steps.
              </h2>

              <p className="text-white">
                Our system works fully automatic. You can start receiving sms by
                topping up your account. If you have any problem or questions,
                you can always open a ticket from your customer panel.
              </p>
            </div>

            <HowItWorksTabs />
          </div>
        </div>
      </div>
    </section>
  );
}
