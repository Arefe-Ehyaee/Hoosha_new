import React from "react";
import Lottie from "lottie-react";
import backgrad from "../assets/lotties/gradientBack.json";
interface MainContentProps {
  brandName: string;
  deviceImg: string;
  description: string;
}

const MainContent: React.FC<MainContentProps> = ({
  brandName,
  description,
}) => {
  return (
    <div className=" 2xl:mx-[280px] mx-auto mt-[180px] 2xl:h-[760px]">

      <div className="flex flex-col lg:flex-row justify-center gap-2 items-center xl:gap-24">
        <div className="pt-[10px] px-10 md:w-[750px]">
          <div className="text-black font-bold font-KalamehBold text-xl mt-4 text-right">
            {description}
          </div>
          <div className="text-black font-bold font-KalamehBlack text-7xl text-right">
            {brandName}
          </div>
          <div className="text-black font-KalamehRegular font-bold text-2xl mt-12 text-right">
            ارائه‌دهنده راهکارهای هوشمند برای کسب‌وکارها و زندگی روزمره
          </div>
          <div
            className="text-justify font-KalamehRegular mt-8 text-lg text-black"
            dir="rtl"
          >
            ما در پرسیس معتقدیم که هوش مصنوعی، راهی نوین برای ساده‌تر کردن زندگی
            و هوشمندسازی کسب‌وکارهاست. با این هدف، پرسیس از روز نخست فعالیت خود
            بر توسعه محصولاتی تمرکز کرده که بتوانند تعامل انسان با فناوری را به
            سطحی جدید برسانند. پرسیس با بهره‌گیری از جدیدترین تکنولوژی‌ها و تیمی
            از بهترین متخصصین حوزه هوش مصنوعی، مجموعه‌ای از خدمات و راهکارهای
            پیشرفته را ارائه می‌دهد
          </div>
          <div className="flex flex-col lg:flex-row justify-end gap-6 mt-[46px] ">
            <button className="h-[54px] font-KalamehBold text-[22px] rounded-lg">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-center">
                  <p>اطلاعات بیشتر</p>
                </div>
              </div>
            </button>
            <button className="h-[54px] bg-[#6ecccc] font-KalamehBold text-[22px] rounded-lg">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-center">
                  <p>چرا هوشا؟</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
