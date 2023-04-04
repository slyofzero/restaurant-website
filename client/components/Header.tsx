import Link from "next/link";
import { useState } from "react";
import { SERVER_URL, orgName } from "../pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import useLoggedUser from "../context/LoggedUser/useLoggedUser";

const Header = () => {
  const router = useRouter();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const { setLoggedUser } = useLoggedUser();

  // Logout user
  const logoutUser = async () => {
    const REQ_URL = `${SERVER_URL}/user/logout`;

    try {
      await axios.delete(`${REQ_URL}`, { withCredentials: true });
      setLoggedUser({});
      router.push("/account/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="h-36">
      <div className="sticky top-0 flex items-center justify-between gap-20 bg-yellow-500/80 px-24 py-4 font-poppins">
        <h1 className="select-none border-4 border-double border-orange-700 px-2 py-1 font-oswald text-2xl font-bold uppercase">
          {orgName}
        </h1>

        <nav className="flex flex-grow flex-row-reverse gap-12 text-sm font-semibold tracking-widest">
          <Link href="/about">Events</Link>
          <Link href="/about">News</Link>
          <Link href="/about">Contact</Link>
          <Link href="/about">About Us</Link>
        </nav>

        {/* ------------------------------ Hamburger Menu Stuff ------------------------------ */}
        {/* Hamburger menu button*/}
        <button
          onClick={() => {
            setShowHamburgerMenu((prevValue) => !prevValue);
          }}
          className="flex flex-col gap-1"
        >
          <span className={hamburgerMenuBar}></span>
          <span className={hamburgerMenuBar}></span>
          <span className={hamburgerMenuBar}></span>
        </button>

        {/* Hamburger menu */}
        <ul
          className={`absolute top-20 right-0 flex w-36 flex-col gap-2 bg-orange-400/80 p-4 transition-all duration-300 ${
            showHamburgerMenu ? "opacity-1" : "opacity-0"
          }`}
        >
          <li>
            <Link href={"/account"} className={hamburgerMenuItem}>
              User
            </Link>
          </li>
          <li>
            <Link href={"/logout"} className={hamburgerMenuItem}>
              Register
            </Link>
          </li>
          <li className={hamburgerMenuItem} onClick={logoutUser}>
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

// ------------------------------ Styling ------------------------------
const hamburgerMenuBar = "block h-1 w-8 bg-black";

const hamburgerMenuItem =
  "font-bold uppercase hover:underline hover:cursor-pointer";
