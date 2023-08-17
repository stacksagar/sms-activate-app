"use client";
import Image from "next/image";
import React from "react";

export default function BlogCard({
  image,
  date,
  CardTitle,
  CardDescription,
}: any) {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mx-auto mb-10 max-w-[370px]">
          <div className="mb-8 overflow-hidden rounded">
            <Image
              src={image}
              alt=""
              className="w-full"
              width={300}
              height={300}
            />
          </div>
          <div>
            {date && (
              <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                {date}
              </span>
            )}
            <h3>
              <a
                href="/#"
                className="inline-block mb-4 text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </a>
            </h3>
            <p className="text-base text-body-color">{CardDescription}</p>
          </div>
        </div>
      </div>
    </>
  );
}
