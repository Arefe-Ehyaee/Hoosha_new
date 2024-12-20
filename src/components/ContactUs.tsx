import social1 from "../assets/Images/Instagram - Negative.svg"
import social2 from "../assets/Images/Vector.svg"
import social3 from "../assets/Images/Vector (2).svg"
import social4 from "../assets/Images/Vector (3).svg"

const ContactUs = ({
  
}) => {
  return (
    <div className="bg-[#6ecccc] py-[40px] 2xl:h-[200px]">
      <div className="text-center mb-[35px] font-bold text-3xl text-[#0a1127]">ارتباط با ما</div>
      <div className="flex justify-center gap-4">
        <img src={social1} alt="" />
        <img src={social2} alt="" />
        <img src={social3} alt="" />
        <img src={social4} alt="" />
      </div>
    </div>
  );
};

export default ContactUs;
