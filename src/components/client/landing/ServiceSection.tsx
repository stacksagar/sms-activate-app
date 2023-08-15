import Button from "@/common/Buttons/Button";
import FIcon from "@/common/FIcon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Link from "next/link";

import React from "react";
type ServiceCardProps = {
  icon: IconProp;
  title: string;
  details: string;
};

const ServiceCard = ({ icon, title, details }: ServiceCardProps) => {
  return (
    <>
      <div className="w-full text-center bg-[#00000009] dark:bg-[#ffffff09]">
        <div className="p-4 space-y-2">
          <h1 className="text-3xl">
            <FIcon icon={icon} />
          </h1>
          <h4 className="text-xl font-semibold text-dark">{title}</h4>
          <p className="text-body-color">{details}</p>
          <div className="w-fit mx-auto">
            <Button color="indigo">Verify</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ServiceSection() {
  return (
    <section className="landing_section shadow border-t dark:border-[#ffffff1e]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="section_sub_title">POPULAR SERVICES</span>
              <h2 className="section_title">Most Popular Services</h2>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="Facebook Verification"
            details="Verify your Facebook account using our virtual phone numbers. Facebook sms verification starts from $0.05."
            icon="facebook"
          />
          <ServiceCard
            title="Twitter Verification"
            details="Verify your Twitter account using our virtual phone numbers. Twitter sms verification starts from $0.05."
            icon="twitter"
          />
          <ServiceCard
            title="Telegram Verification"
            details="Verify your Telegram account using our virtual phone numbers. Telegram sms verification starts from $0.5."
            icon="telegram"
          />
          <ServiceCard
            title="Whatsapp Verification"
            details="Verify your Whatsapp account using our virtual phone numbers. Whatsapp sms verification starts from $0.82."
            icon="whatsapp"
          />
          <ServiceCard
            title="Discord Verification"
            details="Verify your Discord account using our virtual phone numbers. Discord sms verification starts from $0.05."
            icon="whatsapp"
          />
          <ServiceCard
            title="Instagram Verification"
            details="Verify your Instagram account using our virtual phone numbers. Instagram sms verification starts from $0.05."
            icon="instagram"
          />
        </div>
      </div>
    </section>
  );
}
