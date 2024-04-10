import Estates from "./Estates";
import Slider from "../components/Slider";

const Body = () => {
  return (
    <div className="bg-gray-100 pt-10">
      <div className="mx-10">
      <Slider />
      <div className="mt-10 pb-10">
        <Estates />
      </div>
    </div>
    </div>
  );
};

export default Body;
