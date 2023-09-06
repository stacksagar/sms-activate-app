"use client";

import React from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const fromTopMotion = { hidden: { opacity: 0, y: -20 }, visible };

const fromBottomMotion = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

export default function page() {
  return (
    <div className="hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
          <motion.div variants={fromTopMotion} className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="Today Sales Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-blue-500"
              currency="৳"
            />
          </motion.div>

          <motion.div variants={fromTopMotion} className="xl:col-span-4">
            <DashboardCard
              href="/expenses"
              value={0}
              title="Today Expenses Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-pink-500"
              currency="৳"
            />
          </motion.div>

          <motion.div variants={fromTopMotion} className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="Today Profit"
              icon="bangladeshi-taka-sign"
              bg="bg-green-700"
              currency="৳"
            />
          </motion.div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="Prev Month Sales Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-blue-700"
              currency="৳"
            />
          </div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/expenses"
              value={0}
              title="Prev Month Expenses Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-pink-700"
              currency="৳"
            />
          </div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="Prev Month Profit"
              icon="bangladeshi-taka-sign"
              bg="bg-green-600"
              currency="৳"
            />
          </div>

          <motion.div variants={fromBottomMotion} className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="This Month Sales Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-blue-600"
              currency="৳"
            />
          </motion.div>

          <motion.div variants={fromBottomMotion} className="xl:col-span-4">
            <DashboardCard
              href="/expenses"
              value={0}
              title="This Month Expenses Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-pink-600"
              currency="৳"
            />
          </motion.div>

          <motion.div variants={fromBottomMotion} className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="This Month Profit"
              icon="bangladeshi-taka-sign"
              bg="bg-green-700"
              currency="৳"
            />
          </motion.div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="Total Sales Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-blue-700"
              currency="৳"
            />
          </div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/expenses"
              value={0}
              title="Total Expenses Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-pink-700"
              currency="৳"
            />
          </div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/sales-and-return"
              value={0}
              title="Total Profit"
              icon="bangladeshi-taka-sign"
              bg="bg-green-600"
              currency="৳"
            />
          </div>

          <motion.div variants={fromTopMotion} className="xl:col-span-6">
            <DashboardCard
              href="/customers"
              value={0}
              title="Total Due Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-purple-600"
              currency="৳"
            />
          </motion.div>

          <motion.div variants={fromTopMotion} className="xl:col-span-6">
            <DashboardCard
              href="/products"
              value={0}
              title="Total Purchase Amount"
              icon="bangladeshi-taka-sign"
              bg="bg-cyan-700"
              currency="৳"
            />
          </motion.div>
          <div className="xl:col-span-4">
            <DashboardCard
              href="/products"
              value={0}
              title="Total Products"
              icon="tree"
              bg="bg-rose-600"
              currency=""
            />
          </div>

          <div className="xl:col-span-4">
            <DashboardCard
              href="/expenses"
              value={0}
              title="Total Expenses"
              icon="e"
              bg="bg-amber-600"
              currency=""
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
