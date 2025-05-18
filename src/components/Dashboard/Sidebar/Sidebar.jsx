import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { GrLogout } from "react-icons/gr";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { logOutUser } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  //   const [role, isLoading] = useRole();

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        toast.success("logged out");
        navigate("/login");
      })
      .catch(() => {
        toast.error("something error");
      });
  };

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/" className="flex items-center text-red-500 gap-2">
            <img src="/blood.png" alt="logo" width="30" height="30" />
            <h2>Vital Drops</h2>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex text-white flex-col justify-between overflow-x-hidden bg-gradient-to-b via-white from-white to-red-700 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full md:flex  py-2 rounded-lg justify-center items-center mx-auto">
            <Link
              to="/"
              className="btn btn-ghost text-red-500 font-extrabold text-2xl"
            >
              <img className="w-10" src="/blood.png" alt="vitaldrops logo" />
              <h2>Vital Drops</h2>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items */}
              {/* {role === "customer" && <CustomerMenu />}
              {role === "seller" && <SellerMenu />}
              {role === "admin" && <AdminMenu />} */}
            </nav>
          </div>
        </div>

        <div className="divider">
          <hr />

          {/* <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          /> */}
          <Link
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-white  hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
