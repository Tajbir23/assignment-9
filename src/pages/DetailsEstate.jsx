import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/config/Config';


const DetailsEstate = () => {
  const [data, setData] = useState({})
  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(!user){
        navigate('/login')
      }
    })
  },[])

  useEffect(() => {
    fetch('/Data.json')
     .then((datas) => {
        return datas.json();
      })
      .then((datas) => {
        const dataArray = datas.residential_estates

        const details = dataArray.find((value) => value.id === id)
        setData(details)
      })
      .catch((err) => console.log(err))
  },[])

  console.log(data)
  return (
    <div className={`hero min-h-screen`} >
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
</div>
  )
}

export default DetailsEstate