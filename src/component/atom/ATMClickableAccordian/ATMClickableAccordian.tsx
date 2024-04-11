import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type AccordionProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleExtraClass?: string;
  extraClass?: string;
};
const ATMClickableAccordian: React.FC<AccordionProps> = ({
  title,
  children,
  className,
  titleExtraClass,
  extraClass,
}) => {
  const [isOpenAccordian, setIsOpenAccordian] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleAccordion = () => {
    setIsOpenAccordian(!isOpenAccordian);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpenAccordian
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpenAccordian]);
  return (
    <div
      className={` items-center w-full   flex ${
        isOpenAccordian ? "max-h-screen  " : " "
      }`}
      onClick={toggleAccordion}
    >
      <div className={twMerge(`w-full flex flex-col  ${extraClass}`)}>
        <div className={twMerge(`flex gap-2 items-center ${titleExtraClass}`)}>
          {title}
        </div>
        <div className="relative w-full animate-[wiggle_8s_ease-in-out_infinite] ">
          <div
            ref={contentRef}
            className={twMerge(
              `shadow-2xl  z-30 absolute right-0 bg-white w-full overflow-hidden transition-max-height ease-out duration-1000 ${className}`
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMClickableAccordian;
