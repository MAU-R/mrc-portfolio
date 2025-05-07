import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Script from 'next/script';

export default function ScrollAccordion() {
  const sectionsRef = useRef(null);
  const videosRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Configuración inicial de ScrollTrigger
    ScrollTrigger.create({
      trigger: ".intro-wrapper",
      start: "top top",
      end: "bottom top",
      pin: ".text-align-center",
      pinSpacing: false
    });

    // Manejo del scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight + 550;
      const sections = sectionsRef.current.children;
      const videos = videosRef.current.children;
      const lastSectionIndex = sections.length - 1;

      Array.from(sections).forEach((section, index) => {
        if (scrollPosition >= index * windowHeight && scrollPosition < (index + 1) * windowHeight) {
          section.classList.add('is-1');
          videos[index].classList.add('is-1');
        } else {
          if (index !== lastSectionIndex) {
            section.classList.remove('is-1');
            videos[index].classList.remove('is-1');
          }
        }
      });

      if (scrollPosition > lastSectionIndex * windowHeight) {
        sections[lastSectionIndex].classList.add('is-1');
        videos[lastSectionIndex].classList.add('is-1');
      } else {
        sections[lastSectionIndex].classList.remove('is-1');
        videos[lastSectionIndex].classList.remove('is-1');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />

      <div className="intro-wrapper">
        <div className="intro">
          <div className="text-align-center" id="js-pin">
            <div className="max-width-small align-center">
              <div className="margin-bottom margin-small">
                <h2 className="heading-style-h3">
                  <span className="light-green-underline">149€/month</span> &amp; not a single worry
                </h2>
              </div>
              <p className="text-size-medium">
                We take care of registration, insurance, and maintenance to ensure you have 
                a hassle-free ride! <sup>*including theft coverage under certain conditions.</sup>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section_tabs">
        <div className="padding-section-large">
          <div className="tabs_height">
            <div className="tabs_sticky-wrapper">
              <div className="tabs_container">
                <div className="tabs_component">
                  <div className="tabs_left">
                    <div className="tabs_left-top" ref={sectionsRef}>
                      <div className="tabs_let-content is-1">
                        <h2 className="heading-style-h4 text-color-gray100">
                          Reinventing micro-mobility with <span className="text-color-green">Award winning</span> design
                        </h2>
                        <div className="tabs_line" />
                        <p className="text-size-small text-color-gray400">
                          Our mission is to close the gap between a scooter and a bike. Yoda is the lightest vehicle of its category, designed to be agile and fun for everyone to ride.
                        </p>
                      </div>
                      <div className="tabs_let-content is-2">
                        <h2 className="heading-style-h4 text-color-gray100">
                          Best in class energy management for <span className="text-color-green">optimal autonomy</span>
                        </h2>
                        <div className="tabs_line" />
                        <p className="text-size-small text-color-gray400">
                          3 riding modes: 🌱 eco, ⚡️ normal & 🚀 boost - that offer up to 80 km range on one single charge with a swappable battery.
                        </p>
                      </div>
                      <div className="tabs_let-content is-3">
                        <h2 className="heading-style-h4 text-color-gray100">
                          Durable and effortless, <span className="text-color-green">all the way</span>
                        </h2>
                        <div className="tabs_line" />
                        <p className="text-size-small text-color-gray400">
                          We spent years crafting Yoda, stripping away unnecessary components to deliver a <strong>simple</strong> and <strong>efficient</strong> mobility experience.
                        </p>
                      </div>
                    </div>
                    <div className="tabs_left-bottom">
                      <button className="button is-green is-secondary">
                        <div className="button-text">Order today</div>
                        <div className="button-circle-wrapper">
                          <div className="button-icon _1 w-embed">
                            <svg height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.66699 11.3332L11.3337 4.6665" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.66699 4.6665H11.3337V11.3332" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="button-circlee background-color-green" />
                      </button>
                    </div>
                  </div>
                  <div className="tabs_right" ref={videosRef}>
                    <div className="tabs_video is-1 w-background-video w-background-video-atom">
                      <video autoPlay loop muted playsInline data-object-fit="cover">
                        <source src="https://assets-global.website-files.com/65ae37af356fab4845432048/65be0fdac914d702e08f70ed_Yoda-Helmet_1-transcode.mp4" />
                        <source src="https://assets-global.website-files.com/65ae37af356fab4845432048/65be0fdac914d702e08f70ed_Yoda-Helmet_1-transcode.webm" />
                      </video>
                      <img
                        src="https://assets-global.website-files.com/65ae37af356fab4845432048/65b0dc37d226a551affbf2ea_GDA24_HO_WINNER_MC_RGB.webp"
                        loading="lazy"
                        sizes="(max-width: 479px) 56px, 80px"
                        alt="German design award winner 2024 logo."
                        className="tabs_video-gda-badge"
                      />
                    </div>
                    <div className="tabs_video w-background-video w-background-video-atom">
                      <video autoPlay loop muted playsInline data-object-fit="cover">
                        <source src="https://assets-global.website-files.com/65ae37af356fab4845432048/65ae37af356fab48454320ae_BatteryRemoval_Pingpong_001-transcode.mp4" />
                        <source src="https://assets-global.website-files.com/65ae37af356fab4845432048/65ae37af356fab48454320ae_BatteryRemoval_Pingpong_001-transcode.webm" />
                      </video>
                    </div>
                    <div className="tabs_video w-background-video w-background-video-atom">
                      <video autoPlay loop muted playsInline data-object-fit="cover">
                        <source src="https://assets-global.website-files.com/65ae37af356fab4845432048/65be104f9aba74d774b7f4a3_Yoda-Exploded-50-transcode.mp4" />
                        <source src="https://assets-global.website-files.com/65ae37af356fab4845432048/65be104f9aba74d774b7f4a3_Yoda-Exploded-50-transcode.webm" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: '50vh' }} />

      <style jsx global>{`
        :root {
          --gray-700: #424242;
          --gray-500: #737373;
          --black: black;
          --border-radius--tiny: .375rem;
          --light-grey: #f4f4f4;
          --border-radius--xtiny: .25rem;
          --gray-800: #292929;
          --gray-25: #fcfcfc;
          --gray-400: #a3a3a3;
          --gray-50: #fafafa;
          --gray-900: #141414;
          --dark-green: #25fabe;
          --green: #61ffc9;
          --nav--gray-800: #292929;
          --nav--gray-50: #fafafa;
          --gray-600: #525252;
          --white: white;
          --border-radius--xxsmall: .5rem;
          --gray-300: #d6d6d6;
          --gray-200: #e5e5e5;
          --gray-100: whitesmoke;
          --border-radius--xlarge: 2rem;
          --border-radius--xxtiny: .175rem;
          --border-radius--large-still: 1.75rem;
          --border-radius--0: 0rem;
          --border-radius--medium: 1.25rem;
          --border-radius--large-change: 1.75rem;
          --border-radius--xmedium: 1.5rem;
          --border-radius--xsmall: .75rem;
          --border-radius--small: 1rem;
          --border-radius--home-hero: 2rem;
          --nav--gray-700: #424242;
          --border-radius--about-image: 2rem;
          --border-radius--button-circle: 100vw;
          --nav--circle: #292929;
          --nav--y: #61ffc9;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          -webkit-overflow-scrolling: touch;
          touch-action: manipulation;
        }

        body {
          margin: 0;
          height: 100%;
          font-family: "Poppins", sans-serif;
        }

        .intro-wrapper {
          position: relative;
          height: 90vh;
          background-color: #f8f8f8;
        }

        .intro {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          position: relative;
        }

        .text-align-center {
          max-width: 600px;
          text-align: center;
          position: absolute;
          top: 50px;
          scroll-behavior: smooth;
          height: 100%;
          will-change: transform, opacity;
        }

        .align-center {
          margin-left: auto;
          margin-right: auto;
        }

        .max-width-small {
          width: 100%;
          max-width: 30rem;
        }

        .margin-small {
          margin: 3.5rem;
          margin-bottom: 0;
        }

        .heading-style-h3 {
          letter-spacing: -.02em;
          font-size: 2.8125rem;
          font-weight: 500;
          line-height: 1;
        }

        .light-green-underline {
          box-shadow: none;
          display: inline-block;
        }

        p {
          color: var(--gray-500);
          margin-bottom: 5rem;
        }

        .text-size-medium {
          font-size: 1.125rem;
        }

        sup {
          top: 0em;
        }

        sub,
        sup {
          vertical-align: baseline;
          font-size: 75%;
          line-height: 0;
          position: relative;
        }

        .section_tabs {
          z-index: 99;
          border-radius: var(--border-radius--xlarge);
          background-color: var(--gray-800);
          position: relative;
        }

        .padding-section-large {
          padding-top: 7rem;
          padding-bottom: 7rem;
          position: relative;
        }

        @media (max-width: 576px) {
          .padding-section-large {
            padding-top: 2rem;
            padding-bottom: 0rem;
          }
        }

        .tabs_height {
          height: 550vh;
        }

        @media (max-width: 576px) {
          .tabs_height {
            height: 600vh;
          }
        }

        .tabs_sticky-wrapper {
          height: 100vh;
          position: -webkit-sticky;
          position: sticky;
          top: 5vh;
        }

        .tabs_container {
          width: 100%;
          max-width: 120rem;
          margin-left: auto;
          margin-right: auto;
        }

        .tabs_component {
          height: 90vh;
          grid-column-gap: 1.5rem;
          grid-row-gap: 1.5rem;
          grid-template-rows: auto;
          grid-template-columns: .4fr 1fr;
          grid-auto-columns: 1fr;
          padding-left: 3.3%;
          padding-right: 3.3%;
          display: grid;
        }

        @media (max-width: 576px) {
          .tabs_component {
            grid-template-columns: 1fr;
          }
        }

        .tabs_left {
          border-radius: var(--border-radius--medium);
          background-color: var(--gray-700);
          flex-direction: column;
          justify-content: flex-end;
          align-items: stretch;
          padding: 1.5rem;
          display: flex;
        }

        .tabs_left-top {
          height: 100%;
          position: relative;
        }

        .tabs_let-content {
          width: 100%;
          height: 100%;
          text-align: center;
          flex-direction: column;
          justify-content: space-around;
          padding-top: 0%;
          padding-bottom: 0%;
          display: flex;
          position: absolute;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .tabs_let-content.is-1 {
          opacity: 1;
        }

        .heading-style-h4 {
          letter-spacing: -.02em;
          font-size: 2.125rem;
          font-weight: 500;
          line-height: 1.05;
        }

        @media (max-width: 576px) {
          .heading-style-h4 {
            margin: 0;
            font-size: 20px;
          }
        }

        .text-color-gray100 {
          color: var(--gray-100);
        }

        .tabs_line {
          width: 100%;
          height: 1px;
          background-color: var(--gray-500);
        }

        .text-color-gray400 {
          color: var(--gray-400);
        }

        .text-size-small {
          font-size: 1rem;
        }

        @media (max-width: 576px) {
          .text-size-small {
            font-size: .875rem;
          }
        }

        .button {
          grid-column-gap: .5rem;
          grid-row-gap: .5rem;
          border: 1px solid var(--gray-800);
          background-color: var(--gray-800);
          color: var(--gray-25);
          text-align: center;
          letter-spacing: .03em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: .6rem;
          justify-content: center;
          align-items: center;
          padding: .6rem 1.35rem;
          font-size: .875rem;
          text-decoration: none;
          transition: color .6s;
          display: flex;
          overflow: hidden;
        }

        .button.is-green {
          border-color: var(--green);
          background-color: var(--green);
          color: var(--gray-900);
        }

        .button.is-secondary {
          color: var(--gray-900);
          background-color: transparent;
          transition: border-color .6s, color .6s;
        }

        .button.is-green.is-secondary {
          color: var(--gray-25);
          background-color: rgba(97, 255, 201, 0);
        }

        .button-circlee {
          color: var(--white);
          width: 80%;
          aspect-ratio: 1 / 1;
          border-radius: var(--border-radius--button-circle);
          position: absolute;
          top: 0;
          transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
          transform-style: preserve-3d;
          height: 250px;
          transition: all .2s ease-in-out;
          will-change: transform, width, height, color;
          border: 1px solid transparent;
        }

        .button.is-green.is-secondary:hover {
          color: var(--gray-800);
          border-color: var(--green);
        }

        .button.is-green.is-secondary:hover .button-circlee {
          background-color: var(--green);
          transform: translate3d(0px, -43%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
          width: 100%;
        }

        .tabs_right {
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius--medium);
          position: relative;
          overflow: hidden;
          grid-area: span 1 / span 1 / span 1 / span 1;
        }

        .tabs_video {
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius--medium);
          object-fit: cover;
          position: absolute;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .tabs_video.is-1 {
          opacity: 1;
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-position: 50%;
          background-size: cover;
        }

        .tabs_video-gda-badge {
          width: 5rem;
          margin-bottom: 1.5rem;
          object-fit: cover;
          position: relative;
          z-index: 2;
          margin-top: 2rem;
          margin-right: 2rem;
        }
      `}</style>
    </div>
  );
}