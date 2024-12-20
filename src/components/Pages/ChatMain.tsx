import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import ContactUs from "../ContactUs";
import Lottie from "lottie-react";
import chat from "../../assets/lotties/chat.json";

function ChatMain() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#dcf1f7]">
      <Navbar brandName={"Hoosha"}></Navbar>
      <div className="bg-[#F9FAFF] py-[60px]">
        <div className="flex justify-center">
          <Lottie
            animationData={chat}
            loop={true}
            autoplay={true}
            style={{ width: "50%", height: "50%" }}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6 mb-20">
          <button
            className="h-[54px] font-KalamehBold text-[22px] rounded-lg"
            onClick={() => {
              navigate("/voiceChat");
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-center">
                <p>صحبت کن</p>
              </div>
            </div>
          </button>
          <button
            className="h-[54px] bg-[#6ecccc] font-KalamehBold text-[22px] rounded-lg"
            onClick={() => {
              navigate("/textChat");
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-center">
                <p>بنویس</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <ContactUs></ContactUs>
    </div>
  );
}

export default ChatMain;
