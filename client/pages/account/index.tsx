import { useEffect } from "react";
import useLoggedUser from "../../context/loggedUser/useLoggedUser";
import axios from "axios";
import { SERVER_URL } from "../_app";

const REQ_URL = `${SERVER_URL}/user`;

const user = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const req = await axios.get(REQ_URL, { withCredentials: true });
        setLoggedUser(req.data.message);
      } catch (error) {
        console.log(error);
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
