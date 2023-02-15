import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { schoolName, SERVER_URL } from "./_app";

import indexBackground from "../public/images/index-bg.jpg";

const REQ_URL = `${SERVER_URL}/user`;

interface UserDataI {
  id?: string;
  name?: string;
  email?: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataI>({});

  // Get data related to the logged in user
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(REQ_URL, { withCredentials: true });
        setUserData(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  const logoutUser = async () => {
    try {
      await axios.delete(`${REQ_URL}/logout`, { withCredentials: true });
      router.push("/account/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{`Dashboard | ${schoolName}`}</title>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>

      <section
        className="h-screen bg-black/50 bg-cover bg-center bg-no-repeat bg-blend-multiply"
        style={{ backgroundImage: `url(${indexBackground.src}` }}
      >
        <header className="h-32">
          <div className="sticky top-0 flex items-center justify-between gap-20 bg-yellow-500/80 px-24 py-4 font-poppins">
            <h1 className="select-none border-4 border-double border-orange-700 px-2 py-1 text-2xl font-bold uppercase">
              {schoolName}
            </h1>

            <nav className="flex flex-grow flex-row-reverse gap-12 text-sm font-semibold tracking-widest">
              <Link href="/about">Events</Link>
              <Link href="/about">News</Link>
              <Link href="/about">Contact</Link>
              <Link href="/about">About Us</Link>
            </nav>

            <button className="flex flex-col gap-1">
              <span className={hamburgerMenuBar}></span>
              <span className={hamburgerMenuBar}></span>
              <span className={hamburgerMenuBar}></span>
            </button>
          </div>
        </header>

        <div>
          <h1 className="text-4xl font-bold uppercase text-yellow-400">
            {/* <span>Experience</span>
      <br />
      <span>the taste</span> */}
            Hero
          </h1>
        </div>
      </section>
    </>
  );
};

export default Home;

// ------------------------------ Styling ------------------------------
const hamburgerMenuBar = "block h-1 w-8 bg-black";
