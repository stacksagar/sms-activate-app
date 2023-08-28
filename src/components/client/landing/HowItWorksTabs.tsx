import { useState } from "react";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function HowItWorksTabs() {
  let [categories] = useState({
    Service: [
      {
        id: 1,
        text: "Indicate your preference by selecting the specific website from which you would like to receive SMS notifications. Keep updated and engaged with the content that matters most to you, directly through SMS alerts.",
      },
    ],
    Country: [
      {
        id: 1,
        text: "Choose the country that aligns with your preference, and select it as the origin for your phone number. This step ensures you get a number that corresponds to your desired location and facilitates seamless communication.",
      },
    ],
    "Make Payment": [
      {
        id: 1,
        text: "Easily and confidently replenish your account balance to successfully finalize your order. Our secure top-up process guarantees that your transactions are safeguarded, allowing you to swiftly proceed with your purchase without any concerns about payment.",
      },
    ],
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className="w-full py-6"
    >
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white dark:bg-gray-950 shadow"
                    : "text-white hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white dark:bg-gray-800 p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 1 },
                        },
                      }}
                    >
                      {post.text}
                    </motion.p>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </motion.div>
  );
}
