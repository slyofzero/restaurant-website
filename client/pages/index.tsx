import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { orgName, SERVER_URL } from "./_app";
import Hero from "../components/index/Hero";
import { useEffect } from "react";
import useLoggedUser from "../context/LoggedUser/useLoggedUser";

// ------------------------------ Types and interfaces ------------------------------

// ------------------------------ Component ------------------------------
const Home: NextPage = () => {
  const { setLoggedUser } = useLoggedUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const REQ_URL = `${SERVER_URL}/user`;
        const res = await axios.get(REQ_URL, { withCredentials: true });
        const userData = res.data.message;

        setLoggedUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

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
