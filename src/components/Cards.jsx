// import { NavLink } from "react-router-dom"

const Cards = ({item}) => {
  return (
    <>
      <div className="h-52 md:w-80 lg:w-96 w-full group box-border relative">
        <img
          className="h-full w-full object-cover"
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        />
        <div className="absolute inset-0 bg-slate-800 bg-opacity-65 opacity-0 group-hover:opacity-100 flex flex-col justify-end">
          <h1 className="text-white font-bold text-xl px-4 py-2">
            Hello world
          </h1>
        </div>
      </div>
    </>
  );
};

export default Cards;
