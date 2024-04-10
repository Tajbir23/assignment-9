
import { IoLocationOutline } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';

AOS.init()

const Cards = ({item}) => {
  const navigate = useNavigate()
  return (
    <>
      <div data-aos="fade-right" className="h-52 md:w-80 lg:w-96 w-full group box-border relative cursor-pointer">
        <img
          className="h-full w-full object-cover"
          src={item.image}
        />
        <h1 className="absolute text-white font-bold text-xl top-2 right-2 px-5 py-1 rounded-s-full bg-red-600">{item.status}</h1>
        <div className="absolute inset-0 bg-slate-800 bg-opacity-65 opacity-0 group-hover:opacity-100 flex flex-col justify-end">
          <div>
            <h1 className="text-white font-bold text-xl px-4 py-1">
              {item.estate_title}
            </h1>
            <h1 className="text-white font-bold text-xl px-4 py-1 flex gap-2 items-center">
            <IoLocationOutline />
              {item.location}
            </h1>
            <h1 className="text-white font-bold text-xl px-4 py-1 flex gap-2 items-center">
              <FaSackDollar />
              {item.price}
            </h1>
          </div>
          <div className="text-right">
            <button onClick={() => navigate(`/details/${item.id}`)} className="bg-blue-700 hover:bg-blue-900 px-5 py-2 m-4 mt-1 text-white font-semibold rounded-xl">{item.view_property_button}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
