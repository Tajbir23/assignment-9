import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/Config";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    photo: "",
    uid: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile({
          name: user.displayName,
          photo: user.photoURL,
          uid: user.uid,
        });
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
  }, [navigate]);


  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="!relative z-20">
      <div className="navbar !absolute bg-base-100 animate__animated animate__bounce">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {profile?.uid && (
                <li>
                  <NavLink to={`profile/${profile?.uid}`}>
                    Update profile
                  </NavLink>
                </li>
              )}
              <li >
                <NavLink to="/contact">Contact me </NavLink>
              </li>
              <li >
                <NavLink to="/about">About </NavLink>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Luxury real estate</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {profile?.uid && (
              <li>
                <NavLink to={`profile/${profile?.uid}`}>Update profile</NavLink>
              </li>
            )}
            <li>
                <NavLink to="/contact">Contact me</NavLink>
              </li>
              <li >
                <NavLink to="/about">About </NavLink>
              </li>
          </ul>
        </div>
        <div className="navbar-end ">
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : profile ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={profile?.photo}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>{profile.name}</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      signOut(auth).then(() => navigate("/"));
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mr-5">
              <NavLink className="" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default Navbar;
