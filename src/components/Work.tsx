import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "Arul Associates",
              category: "Client-Based Live Project",
              tools: "React, Node.js, MongoDB, WhatsApp API",
              image: "/images/arulassociates.png",
              link: "https://www.arulassociates.com/",
            },
            {
              name: "Gladz Music",
              category: "Client-Based Live Project",
              tools: "React, Node.js, Audio API",
              image: "/images/gladzmusic.png",
              link: "https://www.gladzmusic.com/",
            },
            {
              name: "Club Italia",
              category: "Client-Based Live Project",
              tools: "React, GSAP, CSS Animations",
              image: "/images/clubitalia.png",
              link: "https://www.theclubitalia.com/",
            },
            {
              name: "SVS Construction",
              category: "Client-Based Live Project",
              tools: "React, Vercel, WhatsApp Integration",
              image: "/images/svsconstruction.png",
              link: "https://svs-construction-portfolio.vercel.app/",
            },
            {
              name: "VOLTEX Innovation Hub",
              category: "Client-Based Live Project",
              tools: "React, Video Crossfade, Modern UI",
              image: "/images/voltexsolution.png",
              link: "https://www.voltexsolution.com/",
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
