import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init()
function App() {


  return (
    <>
      <div className="animate__animated animate__bounce z-50">
      <Navbar />
      </div>
      <Outlet />
      <div data-aos="fade-up">
        <Footer />
      </div>
    </>
  )
}

export default App
