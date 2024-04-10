import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';

function App() {

  return (
    <>
      <div className="animate__animated animate__bounce z-50">
      <Navbar />
      </div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
