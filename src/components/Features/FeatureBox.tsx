import React from "react";

interface FeatureBoxProps {
  title: string;
  description: string;
}
const FeatureBox: React.FC<FeatureBoxProps> = ({ title, description }) => {
  return (
    <div className="h-[240px] w-[330px] rounded-[14px] md:mr-8 drop-shadow-xl relative group">
      <div className="absolute -inset-1 bg-gradient-to-t from-[#008b8b] to-blue-500 rounded-lg blur opacity-15 group-hover:opacity-90 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
        <div className="space-y-2 h-[150px]">
          <div className="font-bold text-[#0a1127] text-center mt-4 text-xl">
            {title}
          </div>
          <div className="p-10 text-center">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
