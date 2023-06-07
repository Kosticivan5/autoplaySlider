import "./index.css";
import { list } from "./data";
import { useEffect, useState } from "react";
import { LuQuote } from "react-icons/lu";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";

function App() {
  const [slides, setSlides] = useState(list);
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((activeSlide - 1 + list.length) % list.length);
  };
  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % slides.length);
  };

  useEffect(() => {
    let autoplay = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(autoplay);
    };
  }, [activeSlide]);

  console.log(activeSlide);
  return (
    <section className="relative mx-auto my-16 h-sl-h w-10/12 max-w-2xl overflow-hidden text-center ">
      {slides.map((slide, index) => {
        const { id, image, name, title, quote } = slide;
        return (
          <article
            style={{ transform: `translateX(${100 * (index - activeSlide)}%)` }}
            key={id}
            className={
              index === activeSlide
                ? " absolute left-0 top-0 h-full w-full opacity-100 transition duration-500 ease-out"
                : " absolute left-0 top-0 h-full w-full opacity-0 transition duration-500 ease-out"
            }
          >
            <div>
              <img
                src={image}
                alt={name}
                className=" box- inline-block h-40 w-40 rounded-full border-2 border-solid border-rose-900 object-cover shadow-md shadow-blue-950"
              />
            </div>
            <h2 className=" mt-6 text-2xl uppercase text-rose-700">{title}</h2>
            <h5 className="mt-1 text-lg capitalize text-blue-950">{name}</h5>
            <p className="mt-8 text-neutral-600">{quote}</p>
            <LuQuote className="mt-4 inline-block text-5xl text-rose-700" />
          </article>
        );
      })}
      <button
        type="button"
        className="absolute left-0 top-52 flex items-center justify-center  "
        onClick={prevSlide}
      >
        <BsFillArrowLeftSquareFill
          className="h-full
          w-full
          shrink-0
          text-3xl
          text-blue-950 transition duration-300 ease-in-out hover:text-rose-700"
        />
      </button>
      <button
        type="button"
        className=" absolute right-0 top-52 flex items-center justify-center "
        onClick={nextSlide}
      >
        <BsFillArrowRightSquareFill className=" h-full w-full shrink-0  text-3xl text-blue-950 transition duration-300 ease-in-out hover:text-rose-700" />
      </button>
    </section>
  );
}

export default App;
