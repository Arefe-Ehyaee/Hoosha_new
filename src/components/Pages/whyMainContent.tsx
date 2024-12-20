import React from "react";
import Lottie from "lottie-react";


interface MainContentProps {
  brandName: string;
  deviceImg: string;
  description: string;
}

const WhyMainContent: React.FC<MainContentProps> = ({
  brandName,
  deviceImg,
  description,
}) => {
  return (
    <div className="2xl:mx-[280px] mx-auto mt-[180px] 2xl:h-[760px] relative">
      <div className="flex flex-col lg:flex-row justify-center gap-2 items-center xl:gap-24">
        <div className="md:mt-[100px]">
          <img src={deviceImg} alt="deviceImg" className="h-[500px] w-[300px]" />

        </div>

        <div className="pt-[10px] px-10 md:w-[750px]">
          <div className="text-[#0a1127] font-KalamehRegular text-xl mb-12 text-right">
            دستیار هوشمند فارسی برای زندگی بهتر
          </div>
          <div className="text-[#0a1127] font-bold font-KalamehBlack text-7xl text-right">
            {brandName}
          </div>
          <div className="text-[#0a1127] font-bold font-KalamehBold text-xl mt-4 text-right">
            {description}
          </div>
          <div
            className="text-justify font-KalamehRegular mt-8 text-lg"
            dir="rtl"
          >
            هوشا یک دستیار هوشمند فارسی‌زبان است که به‌طور اختصاصی برای کاربران
            فارسی‌زبان طراحی شده است. این دستیار هوشمند می‌تواند با استفاده از
            هوش مصنوعی و پردازش زبان طبیعی، نیازهای روزمره شما را برآورده کند و
            تجربه‌ای راحت‌تر و هوشمندانه‌تر را در زندگی شما به ارمغان بیاورد. با
            هوشا، از ساده‌ترین تا پیچیده‌ترین وظایف روزانه خود را می‌توانید به
            راحتی و با استفاده از صدای خودتان مدیریت کنید
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WhyMainContent;
