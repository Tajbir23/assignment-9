import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { auth } from "../components/config/Config"
import { Helmet } from "react-helmet"


const Profile = () => {

    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    
    const [user, setUser] = useState({
        name: "",
        photo: "",
        email: ""
    })
    

    const navigate = useNavigate()

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
          if(user){
            setUser({name: user.displayName, photo: user.photoURL, email: user.email})
            setLoading(false)
            console.log(user)
            
          }else{
            setLoading(false)
            navigate('/login')
            
          }
        })
    },[id])

    // extra route
  return (
    <>
    <Helmet>
        <title>{user.name}</title>
    </Helmet>
    <div className="h-screen flex items-center justify-center">
        {loading ? <h1>Loading</h1> : <>
        <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={user?.photo} alt="Album"/></figure>
  <div className="card-body">
    <div>
        <h1 className='font-bold text-4xl'>{user.name}</h1>
        <h3 className='font-semibold text-3xl'>{user.email}</h3>
    </div>
    <div className="card-actions justify-end">
      <Link to={`/updateProfile/${id}`} className="btn btn-primary">Update profile</Link>
    </div>
  </div>
</div>
        </>}
    </div>
    </>
  )
}

export default Profile