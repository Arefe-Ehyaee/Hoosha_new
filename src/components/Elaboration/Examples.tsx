import Card from "./Card";
import kitchen from "../../assets/Images/kitchen.png";
import listen from "../../assets/Images/listen.png";
import control from "../../assets/Images/controll.png";

interface ExampleProps {
  children?: React.ReactNode;
 }


const Examples = ({children} : ExampleProps) => {
  return (
    <div className="bg-[#F9FAFF] py-[160px]">
      <div className="text-center mb-[50px] font-KalamehBold text-5xl text-[#0a1127]">
        خدمات ما 
      </div>
      <div className="flex flex-col gap-[80px]">
        {children}
      </div>
    </div>
  );
};

export default Examples;
