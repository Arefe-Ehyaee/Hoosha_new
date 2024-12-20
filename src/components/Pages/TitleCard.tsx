interface TitleCardProps {
    img: string;
    imgAlt: string;
    backgroundColor_left?: string;
    backgroundColor_right?: string;
    imgPosition: "left" | "right";
    text: string;
    title: string;
  }
  
  const TitleCard = ({
    img,
    imgAlt,
    backgroundColor_left,
    backgroundColor_right,
    imgPosition,
    text,
    title
  }: TitleCardProps) => {
    return (
      <div className="flex flex-col md:flex-row justify-center drop-shadow-xl px-10">
        <div
          className={`bg-white ${backgroundColor_left} md:h-[496px] md:w-[524px] md:rounded-l-3xl`}
        >
          {imgPosition === "left" && <img src={img} alt={imgAlt}/>}
          {imgPosition === "right" && (
            <div
              className="px-10 text-justify mt-[50px] leading-10 font-bold"
              dir="rtl"
            >
                <div className="font-bold text-2xl font-KalamehBlack mb-5 text-[#59a8a8]">{title}</div>
              {text}
            </div>
          )}
        </div>
        <div
          className={`bg-white ${backgroundColor_right} md:h-[496px] md:w-[524px] md:rounded-r-3xl`}
        >
          {imgPosition === "right" && <img src={img} alt={imgAlt}/>}
          {imgPosition === "left" && (
            <div
              className="px-10 text-justify mt-[100px] leading-10 font-bold"
              dir="rtl"
            >
                <div className="font-bold text-2xl font-KalamehBlack mb-5  text-[#59a8a8]">{title}</div>
              {text}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default TitleCard;
  