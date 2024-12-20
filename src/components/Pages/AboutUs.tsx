import Navbar from "../Navbar";
import ContactUs from "../ContactUs";
import TitleCard from "./TitleCard";
import grany from "../../assets/Images/grandma.png";


const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <div className="bg-[#F9FAFF] py-[160px]">
      <div className="text-center mb-[50px] font-KalamehBold text-5xl text-[#0a1127]">
         درباره ما
      </div>
      <div className="flex flex-col gap-[80px]">
      <TitleCard
          img={grany}
          imgAlt={"listen"}
          backgroundColor_left={"bg-green-200"}
          imgPosition={"right"}
          text={
            "امروزه با مشغله‌های روزافزون، داشتن یک دستیار شخصی می‌تواند تغییر چشم‌گیری در کیفیت زندگی ما ایجاد کند. هوشا می‌تواند به عنوان یک دستیار تمام‌وقت در کنار شما باشد و یادآوری‌های مهم، تنظیم تقویم کاری، و حتی اطلاعات آب و هوا را در اختیار شما بگذارد. مثلا، می‌توانید از هوشا بخواهید تا برنامه‌ریزی روزانه شما را یادآوری کند یا هنگام نیاز به جلسه‌ای مهم یادآوری دهد. همچنین، با تنظیم یادآورهایی برای مصرف داروها یا انجام ورزش‌های روزانه، می‌توانید به سلامت و نظم بیشتری در زندگی خود دست پیدا کنید."
          }
          title={"کی با مامان جون حرف بزنه وقتی که تنهاست؟"}
        ></TitleCard>
      </div>
    </div>
      <ContactUs></ContactUs>
    </div>
  );
};

export default AboutUs;
