'use client';
import useResponsiveManifest from './ManifestText';


import { useInView } from './useInView';


const ManifestSection = () => {
  const manifestText = useResponsiveManifest();

  const { ref: titleRef, isVisible: showTitle } = useInView<HTMLHeadingElement>();
  const { ref: subtitleRef, isVisible: showSubtitle } = useInView<HTMLHeadingElement>();
  const { ref: textRef, isVisible: showText } = useInView<HTMLParagraphElement>();
  const { ref: imageRef, isVisible: showImage } = useInView<HTMLDivElement>();

  return (
    <section className="h-[100vh] md:h-[90vh] flex flex-wrap w-full justify-center items-center p-6 lg:p-6">
      <div className="w-9/10 h-4/10 md:w-45/100 md:h-max flex flex-col justify-around gap-1 md:gap-8 p-6 md:p-16">
        <h2
          ref={titleRef}
          className={`transform transition-all duration-1000 delay-500 ease-out text-(--neon-light) text-6xl md:text-7xl lg:text-9xl md:mb-20 ${
            showTitle ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0 '
          }`}
        >
          Manifesto
        </h2>

        <h4
          ref={subtitleRef}
          className={`transform transition-all duration-700 ease-out delay-500 text-(--text-light-active)/90 font-bold text-4xl md:text-5xl lg:text-6xl ${
            showSubtitle ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0 delay-500'
          }`}
        >
          Mi filosofía detrás del código
        </h4>

        <p
          ref={textRef}
          className={`transform transition-all duration-1000 ease-out delay-1000 text-(--text-light) text-xl md:text-2xl lg:text-3xl text-justify ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 '
          }`}
        >
          {manifestText}
        </p>
      </div>

      <div className="w-full h-1/2 md:w-40/100 md:h-full flex flex-col justify-center items-center p-6">
        <div
          ref={imageRef}
          className={`relative transform transition-all duration-1000 ease-out delay-1000 flex items-center justify-center w-9/10 h-3/4 md:h-3/4 bg-(--neon-normal)/30 rounded-xl border-2 border-(--neon-normal) ${
            showImage ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
          }`}
        >
          <div
            className="absolute w-[40vw] h-[60vh] rounded-xl opacity-100 blur-[250px] z-5"
            style={{ backgroundColor: 'var(--neon-dark)' }}
          />
          <img
            src="https://pngimg.com/d/men_in_black_PNG1.png"
            alt="Imagen Glowy"
            className="relative z-10 w-full h-full object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default ManifestSection;
