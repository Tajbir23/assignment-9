import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";


const About = () => {
    const [randomNumber, setRandomNumber] = useState(0)
    const [data, setData] = useState([])

    useEffect(() => {
        const number = Math.floor(Math.random() * 5)
        setRandomNumber(number)
    },[])

    useEffect(() => {
        fetch('/Data.json')
        .then((datas) => {
            return datas.json();
         })
         .then((datas) => {
            const dataArray = datas.residential_estates
            setData(dataArray)
         })
    },[])

    console.log(data[randomNumber]?.image)
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About</title>
    </Helmet>
    <section className="bg-gray-100 py-16 h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Luxury Real Estate</h2>
            <p className="text-gray-600 leading-relaxed">
              At Luxury Real Estate, we believe in finding more than just a house; we believe in finding your dream home. With our curated selection of the finest properties in exclusive locations, we offer unparalleled luxury living experiences.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Our team of experienced real estate professionals is dedicated to delivering exceptional service, ensuring that every aspect of your buying or selling journey is seamless and stress-free.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Whether you're searching for a waterfront villa, a penthouse in the city, or an expansive estate in the countryside, Luxury Real Estate is your trusted partner in luxury real estate transactions.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={data[randomNumber]?.image} alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
