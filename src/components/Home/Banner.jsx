import { Link, useNavigate } from "react-router";
import bannerImg from "../../assets/banner_image.jpg";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    user?.email ? toast.warn("You are already a Donor") : navigate("/signup");
  };

  return (
    <div
      className="w-full h-96 mt-20 bg-cover bg-center flex items-end gap-4 p-24 flex-col lg:flex-row"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <Link
        onClick={handleSignup}
        className="text-xl btn bg-red-500 border-none text-white w-full p-6 max-w-xs lg:w-auto"
      >
        Join as a Donor
      </Link>
      <Link
        to={"/searchDonor"}
        className="text-xl btn border border-red-500 bg-white text-red-500 p-6 w-full max-w-xs lg:w-auto"
      >
        Search Donors
      </Link>
    </div>
  );
};

export default Banner;
