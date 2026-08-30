// components/home/PopularCategories.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FolderIcon } from "@heroicons/react/24/outline";
import SectionHeader from "@/components/common/SectionHeader";
import { MOCK_QUICK_CATEGORIES } from "../mocks/quickCategories.mock";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
    },
  },
};

export default function PopularCategories({ categories = MOCK_QUICK_CATEGORIES }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full  select-none">
      {/* ۱. هدر بخش */}
      <SectionHeader
        icon={FolderIcon}
        titlePrimary="محبوب ترین"
        titleSecondary="دسته بندی ها"
        watermarkText="Popular Categories"
        watermarkTextMobile="Categories"
        subtitleMain="بهترین انتخاب‌ها از میان " 
        subtitleHighlight="دسته‌بندی‌های محبوب"
        subtitleSub="همه‌چیز برای ساختن استایل تو"
        buttonTextMobile="مشاهده همه "
        buttonText="همه دسته بندی ها"
        buttonHref="/categories"
      />

      {/* ۲. لیست کارت‌های مربعی (همیشه وسط‌چین) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8 mx-auto max-w-7xl"
      >
        {categories.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Link
              href={item.href || "#"}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* فریم مربعی تصویر */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-primary/5 border border-cart-boarder p-1.5 shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:bg-primary/10 group-hover:border-[#e5c158] group-hover:shadow-lg group-hover:shadow-prborder-primary/10">
                
                {/* ظرف داخلی تصویر */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* اورلی ملایم روی تصویر */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>

              {/* عنوان زیر کارت */}
              <div className="mt-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out text-center">
                <span className="text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-prborder-primary transition-colors duration-300">
                  {item.title}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}