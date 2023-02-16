import indexStyles from "./index.module.css";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import indexBackground from "../../public/images/desktop-bg.png";
import Link from "next/link";
import { orgName } from "../../pages/_app";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section
      className="flex h-screen flex-col gap-4 bg-black/50 bg-cover bg-fixed bg-center bg-no-repeat font-oswald bg-blend-multiply"
      style={{ backgroundImage: `url(${indexBackground.src}` }}
    >
      <header className="h-36">
        <div className="sticky top-0 flex items-center justify-between gap-20 bg-yellow-500/80 px-24 py-4 font-poppins">
          <h1 className="select-none border-4 border-double border-orange-700 px-2 py-1 font-oswald text-2xl font-bold uppercase">
            {orgName}
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

      <main>
        <div className="mx-auto mt-16 w-fit bg-yellow-500/50 p-4 text-black">
          <h1 className="flex flex-col gap-1 text-4xl uppercase">
            <div className="flex flex-row-reverse gap-4">
              <span className="flex gap-8">
                <span>Savour</span>
                <span>the</span>
              </span>
            </div>
            <br />
            <div className="flex justify-between">
              <span
                lang="hi"
                className="mt-1 font-poppins font-bold tracking-widest"
              >
                बम्बइया
              </span>
              <span>tang</span>
              <span>in</span>
            </div>
            <br />
            <div className="flex gap-4">
              <span>only</span>
              <span>three</span>
              <span>steps</span>
            </div>
          </h1>
        </div>
      </main>

      {/* || Scroll down animation */}
      <div className="relative mx-auto flex w-fit flex-grow gap-8 text-white">
        <div className="absolute -left-52 top-16 flex gap-4">
          <div
            className={`h-16 overflow-hidden bg-slate-200 ${indexStyles.thinLine}`}
          >
            <div
              className={`h-4 w-full bg-yellow-600 ${indexStyles.movingDown}`}
            ></div>
          </div>

          <div>Scroll down</div>
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
      </div>
    </section>
  );
};

export default Hero;

// ------------------------------ Styling ------------------------------
const hamburgerMenuBar = "block h-1 w-8 bg-black";

const socialLink =
  "cursor-pointer p-4 rounded-full bg-black h-fit text-yellow-500 hover:scale-110 transition-all";
