import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import {Helmet} from "react-helmet";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/Config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const successToast = () => {
    return toast.success("Logged in successful", {
      position: "top-right",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      onClose: () => {
        navigate("/");
      },
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

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        successToast();
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  const googleLogin = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => successToast())
      .catch((error) => {
        errorToast(error);
      });
  };

  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => successToast())
      .catch((error) => errorToast(error));
  };
  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="hero h-[calc(100vh-70px)] bg-base-200">
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
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="password"
                  className="input input-bordered"
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
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>

          <div className="flex items-center my-1 mx-5">
            <hr className="border w-full" />
            <h1 className="text-center mx-5">or</h1>
            <hr className="border w-full" />
          </div>

          <div className="px-7 w-full mt-3">
            <button onClick={googleLogin} className="btn w-full btn-accent">
              {" "}
              <FcGoogle className="text-3xl" /> Google
            </button>
          </div>
          <div className="px-7 w-full mt-3 mb-5">
            <button onClick={githubLogin} className="btn w-full btn-accent">
              {" "}
              <FaGithub className="text-3xl" /> Github
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
