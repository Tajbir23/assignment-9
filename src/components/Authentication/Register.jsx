import { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {Helmet} from "react-helmet";

const Register = () => {
  const [lowerCase, setLowerCase] = useState("");
  const [upperCase, setUpperCase] = useState("");
  const [Length, setLength] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [data, setData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });


  const validatePassword = (password) => {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    if (!lowerCase.test(password)) {
      setLowerCase("Password must lowercase letters");
    } else {
      setLowerCase("");
      setData({ ...data, password });
    }

    if (!upperCase.test(password)) {
      setUpperCase("Password must uppercase letters");
    } else {
      setUpperCase("");
      setData({ ...data, password });
    }
    if (password.length < 6) {
      setLength("Password at least 6 characters long");
    } else {
      setLength("");
      setData({ ...data, password });
    }
  };

  const navigate = useNavigate();


  const handleSignUp = (e) => {
    e.preventDefault();

    if (!upperCase && !lowerCase && !Length ) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: data.name,
            photoURL: data.photo,
          });
          
          toast.success("account create successful", {
            position: "top-right",
            autoClose: 100,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            onClose: () => {
              navigate("/");
            },
          });
        })

        .catch((error) => {
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
          console.log(error.message);
        });
    }
  };
  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
      <div className="hero pt-[70px] bg-base-200">
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
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 sm:w-[400px] w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, photo: e.target.value })}
                  placeholder="Photo"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    onChange={(e) => validatePassword(e.target.value)}
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                  />
                  <div>
                    {showPass ? (
                      <BiShow
                        onClick={() => setShowPass(false)}
                        className="text-2xl absolute top-3 right-2"
                      />
                    ) : (
                      <BiHide
                        onClick={() => setShowPass(true)}
                        className="text-2xl absolute top-3 right-2"
                      />
                    )}
                  </div>
                  <div className=" text-red-700">
                    {lowerCase && (
                      <>
                        {lowerCase},
                      </>
                    )}

                    {upperCase && (
                      <>
                        {upperCase},
                      </>
                    )}

                    {Length && Length}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 ">
          <input type="checkbox" required className="checkbox" />
          <p className="font-semibold text-sm">Accept Term & Conditions</p>
        </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!upperCase && !lowerCase && !Length ? false : true}
                >
                  Signup
                </button>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
