import Image from "next/image";

import React from "react";
type FeatureCardProps = {
  image: string;
  title: string;
  details: string;
};

const FeatureCard = ({ image, title, details }: FeatureCardProps) => {
  return (
    <div className="flex items-start gap-2 bg-white dark:bg-gray-800 p-5 rounded shadow">
      <div className="pt-1 pr-3">
        <div className="min-w-[45px] w-full bg-black bg-opacity-80 p-2 rounded shadow">
          <Image src={image || "/"} width={45} height={45} alt="feature" />
        </div>
      </div>
      <div className="">
        <h4 className="text-xl font-semibold text-dark">{title}</h4>
        <p className="text-body-color lg:max-w-[80%]">{details}</p>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <section id="features" className="landing_section2">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="section_sub_title">Features</span>
              <h2 className="section_title">Developed for you</h2>
              <p className="pt-2">
                Advanced Security with Swift Verification: Experience the Ease
                and Reliability of Instant SMS Verification for Your Peace of
                Mind.
              </p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-10 2xl:gap-16">
          <FeatureCard
            title="Safe and Guaranteed"
            details="We provide a 100% guaranteed SMS confirmation service. If you don't receive the SMS, full amount will be refunded!"
            image="medal.svg"
          />
          <FeatureCard
            title="Customer Satisfaction"
            details="Our main priority is to provide the best service to our customers. You only pay when you receive the text message."
            image="target.svg"
          />
          <FeatureCard
            title="Uninterrupted Support"
            details="We are always here. If you have a problem, you can always open a ticket from your customer panel."
            image="clock-3.svg"
          />
          <FeatureCard
            title="Advanced API Systemn"
            details="We have prepared a detailed API documentation for developers! You can use all services with our free API."
            image="shop-2.svg"
          />
          <FeatureCard
            title="Reliable Payment Methods"
            details="Safely top-up your account. We do not store your card details. Pay with your credit/debit card or cryptocurrency."
            image="team.svg"
          />
          <FeatureCard
            title="Fully Automated System"
            details="All orders are delivered automatically. You can top-up your account and start receiving SMS immediately."
            image="check.svg"
          />
        </div>
      </div>
    </section>
  );
}
