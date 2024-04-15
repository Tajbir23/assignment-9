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


  return (
    <>
    <Helmet>
        <title>{user.name}</title>
    </Helmet>
    <div className="h-screen flex items-center justify-center">
        {loading ? <h1>Loading</h1> : <>
        <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
	<img src={user?.photo} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
	<div className="flex flex-col justify-between p-6 space-y-8">
		<div className="space-y-2">
			<h2 className="text-3xl font-semibold tracking-wide">{user?.name}</h2>
			<p className="dark:text-gray-800">{user?.email}</p>
		</div>
		<Link to={`/updateProfile/${id}`} className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50">Update profile</Link>
	</div>
</div>
        </>}
    </div>

    </>
  )
}


export default Profile