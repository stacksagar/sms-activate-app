import React from "react";
import Image from "next/image";
type ServiceCardProps = {
  service: string;
  logo: string;
  price: number;
};

const ServiceCard = ({ service, logo, price }: ServiceCardProps) => {
  return (
    <div className="flex items-center justify-between rounded overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-800 p-3 flex items-center gap-1">
        <Image width={25} height={25} alt="" src={logo} className="rounded" />
        {service}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-3">
        ${price?.toFixed(2)}
      </div>
    </div>
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
        <div className="flex flex-wrap gap-4 justify-center">
          <ServiceCard
            service="Google Voice"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/gf0.webp"
            price={4.5}
          />
          <ServiceCard
            service="WhatsApp"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/wa0.webp"
            price={5}
          />
          <ServiceCard
            service="Facebook"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/fb0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Craigslist"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/wc0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Discord"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/ds0.webp"
            price={0.2}
          />
          <ServiceCard
            service="LinkedIn"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/lf0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Twitter"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/tw0.webp"
            price={0.2}
          />
          <ServiceCard
            service="DoorDash"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/ac0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Google / Gmail / Youtube"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/go0.webp"
            price={0.35}
          />
          <ServiceCard
            service="Poshmark"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/oz0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Apple"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/wx0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Tinder"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/oi0.webp"
            price={0.5}
          />
          <ServiceCard
            service="Bumble"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/mo0.webp"
            price={0.4}
          />
          <ServiceCard
            service="TikTok"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/lf0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Nike"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/ew0.webp"
            price={0.27}
          />
          <ServiceCard
            service="Instagram"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/ig0.webp"
            price={0.2}
          />{" "}
          <ServiceCard
            service="WeChat"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/wb0.webp"
            price={0.25}
          />
          <ServiceCard
            service="Uber"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/ub0.webp"
            price={0.1}
          />
          <ServiceCard
            service="Hinge"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/vz0.webp"
            price={0.5}
          />
          <ServiceCard
            service="eBay"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/dh0.webp"
            price={0.2}
          />
          <ServiceCard
            service="Grindr"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/yw0.webp"
            price={0.3}
          />
          <ServiceCard
            service="Coinbase"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/re0.webp"
            price={0.8}
          />
          <ServiceCard
            service="Ticketmaster"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/gp0.webp"
            price={0.4}
          />
          <ServiceCard
            service="LINE messenger"
            logo="https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/me0.webp"
            price={0.2}
          />
        </div>
      </div>
    </section>
  );
}
