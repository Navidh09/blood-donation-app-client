import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="footer sm:footer-horizontal bg-red-500 text-base-content p-10">
        <aside>
          <img
            className="w-16"
            src="../../../public/blood.jpg"
            alt="vital drops logo"
          />
          <p className="text-[#E0E0E0]">
            <span className="text-2xl text-white font-extrabold">
              Vital Drops
            </span>
            <br />
            Every Drop Counts, Every Life Matters
          </p>
        </aside>
        <nav className="text-white">
          <h6 className="footer-title opacity-100 text-2xl">Important Links</h6>
          <Link to={"/"}>Home</Link>
          <Link>Add Blood Request</Link>
          <Link>Search Blood Donors in Bangladesh</Link>
          <Link>Frequently Asked Questions (FAQs)</Link>
          <Link>About Us</Link>
          <Link>Contact Us</Link>
        </nav>
        <nav className="text-white">
          <h6 className="footer-title opacity-100 text-2xl">About Blood</h6>
          <Link>What is blood?</Link>
          <Link>What is blood donation?</Link>
          <Link>Who can donate blood?</Link>
          <Link>How often can I donate blood?</Link>
          <Link>Different Blood Terms</Link>
          <Link>Different Blood Groups</Link>
        </nav>
      </div>
      <div className="footer sm:footer-horizontal footer-center bg-gray-700 text-white p-4">
        <aside>
          <p className="flex md:flex-row flex-col items-center gap-2">
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="text-red-400 font-semibold flex items-center gap-1">
              {" "}
              Vital Drops{" "}
              <img className="w-5" src="../../../public/blood.png" alt="" />
            </span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
