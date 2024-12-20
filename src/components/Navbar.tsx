import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  brandName: string;
}

const Navbar = ({ brandName }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [clickedButton, setClickedButton] = useState<string | null>(null);

  return (
    <nav
      className="lg:flex lg:w-full lg:justify-between font-bold text-[#0a1127] h-[67px]  md:px-[160px]"
      dir="rtl"
    >
      <div className="text-center align-baseline my-auto font-myComforta text-3xl">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <div>{brandName}</div>
        </button>
      </div>

      <div className="hidden lg:flex justify-between gap-8 my-auto text-[22px] font-KalamehBold">
        <button
          onClick={() => {
            navigate("/");
          }}
          className={`${
            location.pathname === "/"
              ? "text-[#6ecccc] underline underline-offset-8"
              : ""
          }`}
        >
          <div className="">صفحه اصلی</div>
        </button>

        <button
          onClick={() => {
            navigate("/services");
          }}
          className={`${
            location.pathname === "/services"
              ? "text-[#6ecccc] underline underline-offset-8"
              : ""
          }`}
        >
          <div className="">خدمات</div>
        </button>

        <button
          onClick={() => {
            navigate("/aboutUs");
          }}
          className={`${
            location.pathname === "/aboutUs"
              ? "text-[#6ecccc] underline underline-offset-8"
              : ""
          }`}
        >
          <div>درباره ما</div>
        </button>

        <button
          onClick={() => {
            navigate("/chat");
          }}
          className={`${
            location.pathname === "/chat"
              ? "text-[#6ecccc] underline underline-offset-8"
              : ""
          }`}
        >
          <div className="">چت</div>
        </button>
      </div>

      <div>
        <button className="hidden lg:flex w-[114px] h-[54px] bg-[#6ecccc] text-[22px] mt-2 pt-2 pr-3 rounded-lg ">
          ارتباط با ما
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
