import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/config/Config';
import {Helmet} from "react-helmet";


const DetailsEstate = () => {
  const [data, setData] = useState({})
  const {id} = useParams()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(!user){
        navigate('/login')
      }
    })
  },[])

  useEffect(() => {
    setLoading(true)
    fetch('/Data.json')
     .then((datas) => {
        return datas.json();
      })
      .then((datas) => {
        const dataArray = datas.residential_estates

        const details = dataArray.find((value) => value.id === id)
        setData(details)
        setLoading(false)
      })
      .catch((err) => console.log(err))
      
  },[])

  console.log(data)
  return (
    <>
    {/* <div className={`hero min-h-screen`} >
  <div className="flex m-10 gap-10 flex-col lg:flex-row">
    <img src={data.image} className="sm:max-w-sm rounded-lg shadow-2xl h-max" />
    <div>
      <h1 className='font-bold text-4xl'>{data.estate_title}</h1>
      <h1 className='font-semibold text-3xl'>{data.segment_name}</h1>
      <ul>
        <h1 className='underline font-bold'>Descriptions</h1>
        {data.description?.features.map((items, index) => <li className='list-disc list-inside' key={index}>{items}</li>)}
      </ul>
    </div>
  </div>
</div> */}

<Helmet>
  <title>{data.estate_title}</title>
  <meta name="description" content={data?.description?.features} />
</Helmet>

  {!loading ? <div className="hero w-full lg:h-[calc(100vh-70px)] h-max" style={{backgroundImage: `url(${data.image})`}}>
  <div className="hero-overlay bg-opacity-80"></div>
  <div className="flex gap-10 p-10 flex-col lg:flex-row text-neutral-content">
    <img className='lg:max-w-md' src={data.image} alt='image not found' />
    <div className="w-auto">
      <h1 className="mb-5 text-xl lg:text-5xl font-bold">{data?.estate_title}</h1>
      <p className="mb-5 text-lg lg:text-3xl font-bold">{data?.segment_name}</p>
      <div className='flex sm:gap-20 gap-10 text-lg font-bold text-red-600 mb-5'>
        <h1>{data?.location}</h1>
        <h1>{data?.area}</h1>
      </div>
      <h1 className='text-xl font-bold text-green-500 mb-5'>{data?.price}</h1>
      <ul className='mb-5'>
        <h1 className='underline text-2xl mb-2 font-bold'>Descriptions</h1>
        {data?.description?.features?.map((items, index) => <li className='list-disc list-inside' key={index}>{items}</li>)}
      </ul>
      <ul>
        <h1 className='underline text-2xl mb-2 font-bold'>Facilities</h1>
        {data?.facilities?.map((items, index) => <li className='list-disc list-inside' key={index}>{items}</li>)}
      </ul>
      
    </div>
  </div>
</div> : <div className='h-[calc(100vh-70px)] flex items-center justify-center'>Data is loading</div>}
</>
  )
}

export default DetailsEstate