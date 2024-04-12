import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import useAuthValidation from '../components/Customhook/useAuthValidation';
import {Helmet} from "react-helmet";
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../components/config/Config';
import { Bounce, ToastContainer, toast } from "react-toastify";

const UpdateProfile = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    
    const [user, setUser] = useState({
        name: "",
        photo: "",
        email: ""
    })
    
    const {data} = useAuthValidation();

    const navigate = useNavigate()

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
          if(user){
            setUser({name: user.displayName, photo: user.photoURL, email: user.email})
            setLoading(false)
            
          }else{
            setLoading(false)
            navigate('/login')
            
          }
        })
    },[id, data])


    const successToast = () => {
        return toast.success("Logged in successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      };
    
      const errorToast = (error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      };

    const handleUpdate = (e) => {
        e.preventDefault()
        
        updateProfile(auth.currentUser, {displayName: user.name, photoURL: user.photo})
       .then(() => {
        successToast()
       })
       .catch((error) => {
        errorToast(error)
       })
    }
    
  return (
    <>
    <Helmet>
        <title>Profile</title>
    </Helmet>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    <div className='w-full h-[calc(100vh-70px)] flex items-center justify-center'>
        {loading ? <h1>Loading</h1> : <>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 sm:w-[400px] w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" value={user?.name} onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" disabled value={user?.email ? user?.email : ''} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" value={user.photo} onChange={(e) => setUser({...user, photo: e.target.value})} placeholder="Photo url" className="input input-bordered" />
        </div>
        <div className="form-control mt-6">
          <button onClick={handleUpdate} type='submit' className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </>}
    </div>
    </>
  )
}

export default UpdateProfile