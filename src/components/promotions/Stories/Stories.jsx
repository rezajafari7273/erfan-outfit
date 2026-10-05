// components/promotion/Stories/Stories.jsx
"use client";

import React, { useState } from "react";
import { StoryItem } from "./StoryItem";
import { StoryModal } from "./StoryModal";
import Skeleton from "@/components/ui/Skeleton";

export default function Stories({ items = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!items || items.length === 0) {
    return (
      <div className="w-full py-4 overflow-x-auto no-scrollbar" dir="rtl">
        <div className="flex items-center gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-[76px]">
              <Skeleton variant="circular" className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
              <Skeleton variant="text" className="w-12 h-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-4 overflow-x-auto no-scrollbar" dir="rtl">
        {/* این جا px-4 پاک شد */}
        <div className="flex items-center gap-3 lg:gap-4"> 
          {items.map((story, index) => (
            <StoryItem
              key={story.id}
              item={story}
              onSelect={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <StoryModal
          stories={items}
          currentIndex={selectedIndex}
          onSelectIndex={(index) => setSelectedIndex(index)}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}