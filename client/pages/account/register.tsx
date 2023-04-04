import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AuthFormLayout, {
  inputStyles,
  submitButtonStyles,
  isValidEmail,
} from "../../components/auth/AuthFormLayout";
import axios, { AxiosError, isAxiosError } from "axios";
import { orgName, SERVER_URL } from "../_app";
import { useRouter } from "next/router";
import useAuthAlert from "../../context/AuthAlert/useAuthAlert";

// ------------------------------ Types and Interfaces ------------------------------
interface FormDataI {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const REQ_URL = `${SERVER_URL}/auth/register`;

// ------------------------------ Component ------------------------------
const RegisterForm = () => {
  const router = useRouter();

  // Storing the data that is entered into the form in a state
  const [formData, setFormData] = useState<FormDataI>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //  Storing any alert messages that happen during form submission as a state
  const { alert, setAlert } = useAuthAlert();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      // --------------------------- Form data validation ---------------------------
      const { name, email, password, confirmPassword } = formData;

      // Check if Valid Name
      if (!name) return setAlert("Please enter you name");

      // Check if Valid Email
      if (!email) return setAlert("Email ID is required");
      else if (!isValidEmail(email)) return setAlert("Email ID is not valid");

      // Check if Valid Password
      if (!password) return setAlert("User password is required");
      if (!confirmPassword)
        return setAlert("Confirmation password is required");

      if (password !== confirmPassword) {
        return setAlert("Passwords do not match");
      }

      // --------------------------- Sending axios request ---------------------------
      await axios.post(REQ_URL, formData, { withCredentials: true });
      router.push("/account/login");
    } catch (err) {
      if (isAxiosError(err)) {
        const error = err as AxiosError;
        const axiosErrorData = error.response?.data as any;
        setAlert(axiosErrorData.message);
      } else {
        const error = err as Error;
        console.log(error);
      }
    }
  };

  //   Handle input field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AuthFormLayout>
      <Head>
        <title>Create Account | {orgName}</title>
      </Head>

      <section
        className={"flex w-1/3 flex-col items-center justify-center gap-8"}
      >
        <h1 className="text-3xl font-bold">Create new account</h1>

        <p>{alert}</p>

        <form
          className="mx-auto flex flex-col gap-4"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Name"
            className={newInputStyles}
            onChange={handleChange}
          />

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email ID"
            className={newInputStyles}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={newInputStyles}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            className={newInputStyles}
            onChange={handleChange}
          />

          <button
            type="submit"
            className={`${submitButtonStyles} bg-yellow-500 text-black`}
          >
            Register
          </button>
        </form>

        <p>
          Already a user?{" "}
          <Link
            href={"/account/login"}
            className="font-semibold hover:underline"
          >
            Log into account!
          </Link>
        </p>
      </section>
    </AuthFormLayout>
  );
};

export default RegisterForm;

// ------------------------------ Styling ------------------------------
const newInputStyles = `${inputStyles} focus:bg-yellow-500 text-black focus:placeholder:text-black/50`;
