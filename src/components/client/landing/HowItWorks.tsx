import Image from "next/image";
import React from "react";
import HowItWorksTabs from "./HowItWorksTabs";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="landing_section2">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12">
          <div className="col-span-6 hidden xl:flex justify-normal items-center">
            <Image
              src="/how-it-works.jpg"
              className="rounded-xl mx-auto transform rotate-6 border dark:border-transparent"
              width={450}
              height={450}
              alt="how it works?"
            />
          </div>
          <div className="xl:col-span-6">
            <div className="max-w-xl text-center mx-auto">
              <h2 className="section_title">
                Start receiving SMS quickly by following simple steps.
              </h2>
              <p>
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
