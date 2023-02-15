import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AuthFormLayout, {
  inputStyles,
  isValidEmail,
  submitButtonStyles,
} from "../../components/auth/AuthFormLayout";
import axios, { AxiosError, isAxiosError } from "axios";
import { schoolName, SERVER_URL } from "../_app";
import { useRouter } from "next/router";

type Props = {};

interface FormDataI {
  email: string;
  password: string;
}

const REQ_URL = `${SERVER_URL}/auth/login`;

const LoginForm = (props: Props) => {
  const router = useRouter();

  // Form data
  const [formData, setFormData] = useState<FormDataI>({
    email: "",
    password: "",
  });

  //   SetAlert
  const [alert, setAlert] = useState<string>();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { email, password } = formData;

      // Check if Valid Email
      if (!email) return setAlert("Email ID is required");
      else if (!isValidEmail(email)) return setAlert("Email ID is not valid");

      // Check if Valid Password
      if (!password) return setAlert("User password is required");

      // --------------------------- Sending axios request ---------------------------
      await axios.post(REQ_URL, formData, { withCredentials: true });
      router.push("/");
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
        <title>Log in | {schoolName}</title>
      </Head>

      <section
        className={"flex w-1/3 flex-col items-center justify-center gap-8"}
      >
        <h1 className="text-3xl font-bold">Log into your account</h1>

        <form
          className="mx-auto flex flex-col gap-4"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email ID"
            className={inputStyles}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={inputStyles}
            onChange={handleChange}
          />

          <button type="submit" className={submitButtonStyles}>
            Login
          </button>
        </form>

        <p>
          New here?{" "}
          <Link
            href={"/account/register"}
            className="font-semibold hover:underline"
          >
            Register now!
          </Link>
        </p>
      </section>
    </AuthFormLayout>
  );
};

export default LoginForm;
