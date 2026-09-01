// components/common/SectionHeader.jsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeftIcon, FolderIcon } from "@heroicons/react/24/outline";

export default function SectionHeader({
  icon: Icon = FolderIcon,
  titlePrimary = "",
  titleSecondary = "",
  buttonTextMobile = "",
  buttonText = "",
  buttonHref = "#",
  watermarkText = "",
  watermarkTextMobile = "",
  subtitleMain = "",
  subtitleHighlight = "",
  subtitleSub = "",
  showSubtitle = true,
  showButton = true,
  timer = null,
  showTimer = false,
  timerPosition = "right",
}) {
  return (
    <div className="relative w-full">
      <div className="relative w-full flex flex-row items-center justify-between gap-3 md:py-3 min-h-[56px] sm:min-h-[64px]">
        {/* خط تزئینی با فرو رفتگی */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="stepped-top-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#6f0000" stopOpacity="1" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            <path
              className="block lg:hidden"
              d="M 0,1 L 330,1 C 350,1 355,28 370,28 C 380,28 620,28 630,28 C 645,28 650,1 670,1 L 1000,1"
              fill="none"
              stroke="url(#stepped-top-border-gradient)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />

            <path
              className="hidden lg:block"
              d="M 0,1 L 400,1 C 430,1 440,28 460,28 L 710,28 C 730,28 740,1 770,1 L 1000,1"
              fill="none"
              stroke="url(#stepped-top-border-gradient)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* بخش چپ: آیکون و عنوان */}
        <div className="relative flex items-center gap-2.5 sm:gap-3.5 z-10 shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-md sm:rounded-2xl bg-gradient-to-tr from-primary to-rose-900 text-secondary flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />}
          </div>

          <div className="flex flex-col justify-center relative">
            {(watermarkText || watermarkTextMobile) && (
              <>
                <span className="block md:hidden text-[10px] font-bold tracking-widest text-primary/20 uppercase select-none font-serif truncate max-w-[150px] leading-tight">
                  {watermarkTextMobile}
                </span>
                <span className="hidden md:block text-xs sm:text-sm font-black tracking-widest text-primary/20 uppercase select-none font-serif truncate max-w-[250px] leading-tight">
                  {watermarkText}
                </span>
              </>
            )}
            <h2 className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
              {titlePrimary && <span className="hidden sm:inline text-[#332C2D]">{titlePrimary} </span>}
              {titleSecondary && (
                <span className="text-primary text-xs sm:text-base md:text-lg font-rokh font-bold inline-block">
                  {titleSecondary}
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* بخش راست: subtitle و دکمه */}
        <div className="flex items-center gap-3 sm:gap-5 z-10 shrink-0 justify-end">
          {/* نمایش subtitle - همیشه نمایش داده میشه */}
          {showSubtitle && subtitleMain && (
            <div className="hidden lg:flex flex-col items-end text-left">
              <p className="text-xs font-medium text-neutral-600">
                {subtitleHighlight ? (
                  <>
                    {subtitleMain.split(subtitleHighlight)[0]}
                    <span className="text-primary font-rokh font-bold">{subtitleHighlight}</span>
                    {subtitleMain.split(subtitleHighlight)[1]}
                  </>
                ) : (
                  subtitleMain
                )}
              </p>
              {subtitleSub && (
                <span className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5">
                  {subtitleSub}
                </span>
              )}
            </div>
          )}

          {/* دکمه */}
          {showButton && (
            <>
              <div className="block md:hidden">
                <Link
                  href={buttonHref}
                  className="group flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gradient-to-l from-primary to-rose-800 text-button-text font-medium text-xs shadow-sm shadow-primary/20 active:scale-95 transition-all"
                >
                  <span>{buttonTextMobile}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowUpLeftIcon className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </Link>
              </div>

              <div className="hidden md:flex items-center">
                <Link
                  href={buttonHref}
                  className="group relative flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-l from-primary to-rose-800 text-button-text font-medium text-sm shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
                >
                  <span>{buttonText}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowUpLeftIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* تایمر در بخش فرو رفتگی هدر - دقیقاً روی خط */}
        {showTimer && timer && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1 -translate-y-1/2 z-20 pointer-events-auto">
            {timer}
          </div>
        )}
      </div>
    </div>
  );
}