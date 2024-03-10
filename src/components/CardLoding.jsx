import { FaHeart } from "react-icons/fa";

const CardLoding = () => {
  return (
    <div
      className="card shadow-xl relative mr-5 md:my-5 h-[440px] "
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="300"
    >
      <div className={`rating gap-1 absolute right-2 top-2 p-4 heartSta`}>
        <div className="skeleton h-8 w-8 rounded-md mt-4"></div>
      </div>
      <figure>
        <div className="skeleton h-[200px] w-[200px] rounded-full mt-12"></div>
      </figure>
      <div className="card-body">
        <div className="skeleton h-6 w-44 rounded-md"></div>

        <div className="skeleton h-4 w-44 rounded-md"></div>

        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <div className="skeleton h-8 w-16 rounded-md"></div>
          </h5>
          <div className="skeleton h-10 w-28 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoding;
