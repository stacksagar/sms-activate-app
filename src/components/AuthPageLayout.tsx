import React from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
  text?: React.ReactNode | string;
  hideText?: boolean;
  children: React.ReactNode;
}
export default function AuthPageLayout({ children, hideText, text }: Props) {
  const constraintsRef = React.useRef(null);
  return (
    <div className="container py-32 xl:py-40">
      <div className="grid grid-cols-1 md:w-[600px] xl:w-auto xl:max-w-[1200px] mx-auto xl:grid-cols-2 p-6 lg:p-12 shadow bg-white dark:bg-gray-950">
        <div className="hidden xl:flex flex-col gap-6 items-center justify-center xl:border-r dark:border-gray-700 xl:mr-10">
          {hideText ? null : text ? text : null}

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
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
}
