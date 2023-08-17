"use client";
import ResponsivePagination from "@/common/ReactResponsivePagination/ReactResponsivePagination";
import ClientFooter from "@/components/client/footer/ClientFooter";
import ClientHeader from "@/components/client/header/ClientHeader";
import React from "react";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <>
      <ClientHeader />
      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="block mb-2 text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <BlogCard
              date="Dec 22, 2023"
              CardTitle="Meet AutoManage, the best AI management tools"
              CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              image="/blog1.jpg"
            />
            <BlogCard
              date="Dec 22, 2023"
              CardTitle="Meet AutoManage, the best AI management tools"
              CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              image="/blog1.jpg"
            />
            <BlogCard
              date="Dec 22, 2023"
              CardTitle="Meet AutoManage, the best AI management tools"
              CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              image="/blog1.jpg"
            />
          </div>
        </div>
        <ResponsivePagination
          current={1}
          total={1}
          onPageChange={() => console.log("working")}
        />
      </section>
      <ClientFooter />
    </>
  );
};

export default Blog;
