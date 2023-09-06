import React, { useEffect } from "react";
import Image from "next/image";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import { fetchServicesPrices } from "@/redux/features/servicesPricesSlice/requests";
import { fetchServices } from "@/redux/features/services/requests";
type ServiceCardProps = {
  service: string;
  logo: string;
  price: number;
};

const ServiceCard = ({ service, logo, price }: ServiceCardProps) => {
  return (
    <div className="flex items-center justify-between rounded overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-800 p-3 flex items-center gap-1">
        <Image
          width={25}
          height={25}
          alt=""
          src={logo || "/"}
          className="rounded"
        />
        {service}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-3">
        ${price?.toFixed(2)}
      </div>
    </div>
  );
};

export default function ServiceSection() {
  const { data: prices, fetched: fetched_prices } = useReduxSelector(
    (s) => s.services_prices
  );

  const { services, fetched: fetched_services } = useReduxSelector(
    (s) => s.services
  );

  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (fetched_prices) return;
    dispatch(fetchServicesPrices(null));
  }, [dispatch, fetched_prices]);

  useEffect(() => {
    if (fetched_services) return;
    dispatch(fetchServices(null));
  }, [dispatch, fetched_services]);

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
          {prices.map((item) => (
            <ServiceCard
              key={item?._id}
              service={services[item.service]?.name}
              logo={services[item.service]?.logo}
              price={item.user_cost}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
