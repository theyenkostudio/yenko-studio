"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ExpandableBlockProps {
  title: string;
  content: string;
}

const ExpandableBlock = ({
  title,
  content,
}: ExpandableBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="group bg-white border border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden">
      <div
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        onClick={handleInteraction}
        className="cursor-pointer hover:bg-[rgba(0,0,0,0.02)] transition-colors duration-300"
      >
        <div className="py-8 px-10">
          <div className="flex items-center justify-between gap-8">
            <h3 className="text-lg font-semibold text-[#0a0a0a]">
              {title}
            </h3>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 min-w-6 text-[#0a0a0a] transition-opacity duration-300"
              style={{ opacity: isExpanded ? 1 : 0.4 }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8">
              <p className="text-[15px] leading-[1.8] text-[#0a0a0a] opacity-70">
                {content}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableBlock;
