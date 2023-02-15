import { cva } from "class-variance-authority";
import { NextPage } from "next";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

type FormPathType = "register" | "login" | null;

const AuthFormLayout: NextPage<Props> = ({ children }) => {
  const path = useRouter().pathname.split("/").slice(-1)[0] as FormPathType;

  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
      <section className={heroStyles({ path })}></section>
    </main>
  );
};

export default AuthFormLayout;

// Function to check if a string is in valid email format
export const isValidEmail = (email: string) => {
  const emailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  return String(email).toLowerCase().match(emailFormat);
};

// <------------------------------ Styling ------------------------------>
export const inputStyles =
  "w-72 h-8 focus:bg-slate-900 focus:text-white transition-all duration-500 border-2 border-solid border-black outline-none rounded-md px-2 placeholder:text-sm";

export const submitButtonStyles =
  "bg-slate-900 p-2 text-white rounded-md hover:bg-slate-700 transition-all duration-500";

const heroStyles = cva("bg-gradient-to-r min-h-screen flex-grow", {
  variants: {
    path: {
      login: "from-purple-400 to-fuchsia-700",
      register: "from-red-400 to-orange-700",
    },
  },
});
