import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink className={"hover:scale-110 transition"} to={"/"}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={"hover:scale-110 transition"} to={"/blogs"}>
          Donation Requests
        </NavLink>
      </li>
      {/* {user && (
        <>
          <li>
            <NavLink className={"hover:scale-110"} to={"/addBlog"}>Add Blog</NavLink>
          </li>
          <li>
            <NavLink className={"hover:scale-110"} to={"/myWishlist"}>Wishlist</NavLink>
          </li>
        </>
      )} */}
      <li>
        <NavLink className={"hover:scale-110 transition"} to={"/blogs"}>
          Blogs
        </NavLink>
      </li>
    </>
  );

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

  return (
    <div className="navbar text-white fixed top-0 z-50 h-20 bg-gradient-to-r from-white via-gray-200 to-red-700 shadow-sm mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost bg-black lg:hidden"
          >
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
            className="menu menu-sm dropdown-content bg-gradient-to-r to-white from-red-700 rounded-box z-10 mt-3 w-52 p-2 shadow font-semibold"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-red-500 font-extrabold text-2xl">
          <img
            className="w-10"
            src="../../../public/blood.png"
            alt="vitaldrops logo"
          />
          Vital Drops
        </a>
      </div>

      <div className="navbar-end hidden lg:flex font-semibold">
        <ul className="menu menu-horizontal text-xl px-1 ">{links}</ul>
      </div>

      {/* avatar part */}
      {user ? (
        <div className="dropdown order-2 lg:order-none dropdown-left dropdown-bottom ml-auto mr-4 lg:mr-10 lg:ml-8">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img alt="profile photo" src={user.photoURL} />
              ) : (
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 bg-gradient-to-r to-white from-red-700 rounded-box font-semibold z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <a onClick={handleSignOut}>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
