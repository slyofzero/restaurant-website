import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { orgName, SERVER_URL } from "./_app";
import Hero from "../components/index/Hero";

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
        <title>{`Dashboard | ${orgName}`}</title>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>

      <Hero />

      <section className="h-screen bg-black p-4 text-white"></section>
    </>
  );
};

export default Home;
