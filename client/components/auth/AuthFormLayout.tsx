import { cva } from "class-variance-authority";
import { NextPage } from "next";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

type FormPathType = "register" | "login" | null;

const AuthFormLayout: NextPage<Props> = ({ children }: Props) => {
  const path = useRouter().pathname.split("/").slice(-1)[0] as FormPathType;

  return (
    <main className={formStyles({ path })}>
      {children}
      <section className={authBannerStyles({ path })}></section>
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
  "w-72 h-8 transition-all duration-500 border-2 border-solid border-black outline-none rounded-md px-2 placeholder:text-sm";

export const submitButtonStyles = "p-2 rounded-md transition-all duration-500";

const authBannerStyles = cva("bg-gradient-to-r min-h-screen flex-grow", {
  variants: {
    path: {
      login: "bg-black",
      register: "bg-yellow-500",
    },
  },
});

const formStyles = cva("flex min-h-screen items-center justify-center", {
  variants: {
    path: {
      login: "bg-yellow-500 text-black",
      register: "bg-black text-yellow-500",
    },
  },
});
