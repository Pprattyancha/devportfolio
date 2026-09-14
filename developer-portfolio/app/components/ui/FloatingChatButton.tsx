"use client";

import { useState } from "react";
import { SmartToyOutlined } from "@mui/icons-material";
import { PortfolioChat } from "./PortfolioChat";

export function FloatingChatButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Floating AI Chat Button */}
      {!chatOpen && (
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          aria-label="Open Portfolio Assistant"
          title="Portfolio Assistant"
          className="
            group
            fixed
            bottom-6
            right-6
            z-[9999]

            flex
            h-[54px]
            w-[54px]
            items-center
            justify-center

            rounded-full

            border
            border-blue-500/50

            bg-[#111318]
            text-gray-300

            shadow-[0_0_12px_rgba(59,130,246,0.25),0_4px_18px_rgba(0,0,0,0.45)]

            transition-all
            duration-300

            hover:scale-110
            hover:border-blue-400/90
            hover:bg-[#151922]
            hover:text-white
            hover:shadow-[0_0_20px_rgba(59,130,246,0.55),0_6px_25px_rgba(0,0,0,0.65)]

            animate-[chatBounce_3s_ease-in-out_infinite]
          "
        >
          {/* Blue outer glow */}
          <span
            className="
              pointer-events-none
              absolute
              -inset-[2px]
              rounded-full
              border
              border-blue-500/20
              opacity-70
              blur-[2px]
              transition-all
              duration-300
              group-hover:border-blue-400/50
              group-hover:opacity-100
              group-hover:blur-[3px]
            "
          />

          {/* Subtle inner border */}
          <span
            className="
              pointer-events-none
              absolute
              inset-[2px]
              rounded-full
              border
              border-white/[0.04]
            "
          />

          {/* AI Icon */}
          <SmartToyOutlined
            className="
              relative
              z-10
              !text-[26px]
              text-gray-400

              transition-all
              duration-300

              group-hover:scale-110
              group-hover:text-blue-300
            "
          />

          {/* Online Indicator */}
          <span
            className="
              absolute
              right-[2px]
              top-[2px]
              z-20

              h-[11px]
              w-[11px]

              rounded-full
              border-2
              border-[#111318]

              bg-[#8bc34a]

              shadow-[0_0_7px_rgba(139,195,74,0.45)]
            "
          />
        </button>
      )}

      {/* Portfolio AI Chat */}
      {chatOpen && (
        <PortfolioChat
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
}