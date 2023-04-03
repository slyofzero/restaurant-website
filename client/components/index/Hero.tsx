import indexStyles from "./index.module.css";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import indexBackground from "../../public/images/desktop-bg.png";
import Link from "next/link";
import { SERVER_URL, orgName } from "../../pages/_app";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useLoggedUser from "../../context/loggedUser/useLoggedUser";

// ------------------------------ SSR ------------------------------
// export const getServerSideProps = async () => {};

// ------------------------------ Component ------------------------------
const Hero = () => {
  const router = useRouter();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const { setLoggedUser } = useLoggedUser();

  // Logout user
  const logoutUser = async () => {
    const REQ_URL = `${SERVER_URL}/user/logout`;

    try {
      const req = await axios.delete(REQ_URL, { withCredentials: true });

      if (req.data) {
        setLoggedUser({});
        router.push("/account/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className="flex h-screen flex-col gap-4 bg-black/50 bg-cover bg-fixed bg-center bg-no-repeat font-oswald bg-blend-multiply"
      style={{ backgroundImage: `url(${indexBackground.src}` }}
    >
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

      <main className="flex w-1/2 flex-col items-center">
        <div className="mt-16 w-fit bg-yellow-500/50 p-4 text-black">
          <h1 className="text-4xl uppercase leading-snug">
            <p style={{ wordSpacing: "1rem" }}>
              Savour the{" "}
              <span className="font-bold tracking-widest">बम्बइया</span> tang
            </p>

            <p style={{ wordSpacing: "1rem" }}>in only three steps</p>
          </h1>
        </div>

        <ul className="mt-8 flex gap-8 text-3xl">
          <li className={socialLink}>
            <BsInstagram />
          </li>

          <li className={socialLink}>
            <BsFacebook />
          </li>

          <li className={socialLink}>
            <BsYoutube />
          </li>
        </ul>
      </main>

      {/* || Scroll down animation */}
      <div className="absolute right-36 bottom-12 flex gap-4 text-white">
        <div
          className={`h-16 overflow-hidden bg-slate-200 ${indexStyles.thinLine}`}
        >
          <div
            className={`h-4 w-full bg-yellow-600 ${indexStyles.movingDown}`}
          ></div>
        </div>

        <div className="select-none">Scroll down</div>
      </div>
    </section>
  );
};

export default Hero;

// ------------------------------ Styling ------------------------------
const hamburgerMenuBar = "block h-1 w-8 bg-black";

const socialLink =
  "cursor-pointer p-4 rounded-full bg-black h-fit text-yellow-500 hover:scale-110 transition-all";

const hamburgerMenuItem =
  "font-bold uppercase hover:underline hover:cursor-pointer";
