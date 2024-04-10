import { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/Data.json')
    .then((datas) => {
       return datas.json()
    })
    .then((datas) => {
      
       setData(datas.residential_estates)
     })
     .catch((err) => console.log(err))
  },[])

  // console.log(data)

  return (
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="sm:h-[calc(100vh-115px)] h-40 mt-20"
      >
        {data.map((items) => <SwiperSlide key={items.id}><img className='h-full w-full' src={items.image} alt='image not found'/></SwiperSlide>)}
        
      </Swiper>
  )
}

export default Slider