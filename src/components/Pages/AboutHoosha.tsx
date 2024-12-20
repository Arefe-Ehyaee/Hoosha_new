
import maindevice from "../../assets/Images/13.png"
import Navbar from "../Navbar";
import MainContent from "../MainContent";
import ContactUs from "../ContactUs";

const AboutHoosha: React.FC = () => {
  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <MainContent brandName={"هوشا"} deviceImg={maindevice} description={"دوست هوشمند تو"}></MainContent>
        <ContactUs></ContactUs>
    </div>
  );
};

export default AboutHoosha;
