import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import useAuthValidation from '../components/Customhook/useAuthValidation';

const UpdateProfile = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    
    const {data} = useAuthValidation();

    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            if(data.uid === id){
                setLoading(false)
            } else {
                navigate('/login')
            }
        }
    },[id, data])
    
  return (
    <div>
        {loading ? <h1>Loading</h1> : <>
            
        </>}
    </div>
  )
}

export default UpdateProfile