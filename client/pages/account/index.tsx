import { useEffect } from "react";
import useLoggedUser from "../../context/LoggedUser/useLoggedUser";
import axios from "axios";
import { SERVER_URL } from "../_app";
import { useRouter } from "next/router";
import useAuthAlert from "../../context/AuthAlert/useAuthAlert";

const REQ_URL = `${SERVER_URL}/user`;

const user = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const router = useRouter();
  const { setAlert } = useAuthAlert();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const req = await axios.get(REQ_URL, { withCredentials: true });
        setLoggedUser(req.data.message);
      } catch (error) {
        console.log(error);
        setAlert("Please login to access that webpage.");
        router.push("/account/login");
      }
    };

    getUserData();
  }, []);

  return (
    <main>
      <p>User: {loggedUser.email}</p>
    </main>
  );
};

export default user;
