// import logo from "@/assets/images/logoo.png";
import anime from "@/assets/images/anim.gif";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          Welcome to <p className="text-blue-700">Vehicle Management System</p>
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Software Engineering Lab Final Assignment
          <br />
          with React JS and styled with Tailwind CSS
        </h2>
        <div className="ml-6 text-center">
          <a
            className="inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            <div className="flex text-lg">
              <span className="justify-center">Do Not Click Please</span>
            </div>
          </a>
          <Link to="/login">
            <a className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline">
              <div className="flex text-lg">
                <span className="justify-center">Login</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center mx-auto">
        <img
          className="object-cover object-center w-3/4 mb-10 border shadow-md g327"
          alt="Placeholder Image"
          src={anime}
        ></img>
      </div>
      {/* {/* <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
        Clean and tidy code.
      </h2>
      <br></br>
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
        Here is our collection of free to use templates made with Next.js &
        styled with Tailwind CSS.
      </p>
      <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <img className="w-10" src="https://nine4.app/favicon.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            tincidunt a libero in finibus. Maecenas a nisl vitae ante rutrum
            porttitor.
          </p>
        </div>
        <div className="ktq4">
          <img className="w-10" src="https://nine4.app/favicon.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            tincidunt a libero in finibus. Maecenas a nisl vitae ante rutrum
            porttitor.
          </p>
        </div>
        <div className="ktq4">
          <img className="w-10" src="https://nine4.app/favicon.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            tincidunt a libero in finibus. Maecenas a nisl vitae ante rutrum
            porttitor.
          </p>
        </div>
        <div className="ktq4">
          <img className="w-10" src="https://nine4.app/favicon.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            tincidunt a libero in finibus. Maecenas a nisl vitae ante rutrum
            porttitor.
          </p>
        </div>
      </div>
      <div className="pt-32 pb-32 max-w-6xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <img src="https://nine4.app/images/nine4-3.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
            Nullam vehicula, libero at euismod tristique, neque ligula faucibus
            urna, quis ultricies massa enim in nunc. Vivamus ultricies, quam ut
            rutrum blandit, turpis massa ornare velit, in sodales tellus ex nec
            odio.
          </p>
        </div>
        <div className="ktq4">
          <img src="https://nine4.app/images/nine4-3.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
            Nullam vehicula, libero at euismod tristique, neque ligula faucibus
            urna, quis ultricies massa enim in nunc. Vivamus ultricies, quam ut
            rutrum blandit, turpis massa ornare velit, in sodales tellus ex nec
            odio.
          </p>
        </div>
      </div>*/}
      <section className="relative pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
            />{" "}
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/"
            >
              <span className="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Main;
