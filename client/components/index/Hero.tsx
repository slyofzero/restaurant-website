import indexStyles from "./index.module.css";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import indexBackground from "../../public/images/desktop-bg.png";
import Header from "../Header";

// ------------------------------ Types and interfaces ------------------------------

// ------------------------------ Component ------------------------------
const Hero = () => {
  return (
    <section
      className="flex h-screen flex-col gap-4 bg-black/50 bg-cover bg-fixed bg-center bg-no-repeat font-oswald bg-blend-multiply"
      style={{ backgroundImage: `url(${indexBackground.src}` }}
    >
      <Header />

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
const socialLink =
  "cursor-pointer p-4 rounded-full bg-black h-fit text-yellow-500 hover:scale-110 transition-all";
