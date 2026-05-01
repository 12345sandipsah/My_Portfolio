import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import photo1 from "../assets/photo1.JPG";
import img1 from "../assets/img1.JPG";
import photo2 from "../assets/photo2.PNG";
import img2 from "../assets/img2.JPG";
import photo3 from "../assets/photo3.png";
import img3 from "../assets/img3.JPG";

const useIsMobile = (query = "(max-width: 639px)") => {
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [isMobile, setIsMobile] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    const listener = (e) => setIsMobile(e.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener); // Safari fallback
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);
  const projects = useMemo(
    () => [
      {
        title: "Travelbnd",
        link: "https://travelbnd.onrender.com/listings",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://travelbnd.onrender.com/listings",
        bgColor: "#418EE3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://travelbnd.onrender.com/listings",
        bgColor: "#EF9E31",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile],
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative text-white"
      ref={sceneRef}
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen relative flex items-center justify-center">
        {/* Top Title */}
        <h2 className="absolute top-6 left-1/2 -translate-x-1/2 text-3xl font-semibold z-30">
          My Work
        </h2>

        {projects.map((project, idx) => (
          <div
            key={project.title}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
            }`}
          >
            {/* IMAGE */}
            <div
              className="relative w-[85%] max-w-[1200px] h-[65vh] rounded-xl overflow-hidden 
shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl transition-all duration-300"
                 loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0"
              style={{
                zIndex:11,
                background:"linear-gradient(180deg,rgba(0,0,0,0.12) 0%,rgba(0,0,0,0) 40%)"
              }}
              >

              </div>
            </div>

            {/* BIG TITLE (LEFT SIDE LIKE YOUR IMAGE) */}
            <motion.h3
              key={project.title}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className={`
                         absolute 
                         ${
                           isMobile
                             ? "top-[12%] left-1/2 -translate-x-1/2 text-center"
                             : "left-[6%] top-[8%]"
                         }
                         text-[clamp(1.8rem,3.5vw,3rem)] 
                         max-w-[80%] 
                         leading-tight 
                         italic font-semibold z-30
                         `}
            >
              {project.title}
            </motion.h3>
          </div>
        ))}
        <div className={`absolute ${isMobile?"bottom-20":"bottom-10"} z-20`}>
          <a href={activeProject?.link} target="_blank"  rel="noopener noreferrer"
          className="inline-block px-4 py-1 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
          aria-label={`View ${activeProject?.title}`}
          >View Projects</a>

        </div>
      </div>
    </section>
  );
}
