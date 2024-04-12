import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const Estates = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/Data.json")
      .then((datas) => {
        return datas.json();
      })
      .then((datas) => {
        setData(datas.residential_estates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);
  return (
    <>
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold mb-5">Estates</h1>
      <hr className="border-b border-black" />
    </div>
    <div className="flex justify-between flex-wrap gap-5">
      {data.map((item) => {
        return <Cards item={item} key={item.id} />;
      })}
    </div>
    </>
  );
};

export default Estates;
