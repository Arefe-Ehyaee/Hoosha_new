import React from "react";

interface FeaturesProps {
 children?: React.ReactNode;
}
const Features: React.FC<FeaturesProps> = ({
  children
}) => {
  return (
    <div className="bg-[#6ecccc] mt-[50px] py-[70px] 2xl:h-[560px]">
      <div className="text-center mb-[100px] font-KalamehBold text-5xl text-[#0a1127]">ویژگی ها</div>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center">
        {children}
      </div>
      
    </div>
  );
};

export default Features;
