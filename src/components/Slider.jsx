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


  return (
    <>

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
        className="md:h-96 h-40 mt-10"
      >
        {data.map((items) => <SwiperSlide key={items.id}>
          <div className='relative h-full w-full'>
            <img className='h-full w-full ' src={items.image} alt='image not found'/>
            <h1 className='absolute sm:top-5 sm:left-5 left-2 top-2 inset-0 font-bold text-white lg:text-4xl md:text-3xl sm:text-2xl text-xs'>{items.estate_title}</h1>
          </div>
        </SwiperSlide>)}
        
      </Swiper>

      </>
  )
}

export default Slider