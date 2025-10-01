
type workCardProps = {
    align:number,
    description: string,
    title: string,
    timeStamp: string,
    duration: string
}
export default function WorkCard ({align, description, title, duration, timeStamp}: workCardProps){

    const cardClass = align % 2 === 0 ? " col-start-2 flex justify-start" : " col-start-1 flex justify-end";
    const circleClass = align %2 ==0 ? "-left-[5vh] -top-[4vh] " : "-right-[5vh] -top-[4vh]" 
    const glowClass = align % 2 === 0 ? "left-0" : "right-0 xl:ml-[50%] md:ml-[10%] ml-0";
    return  <div 
    className = {`relative ${cardClass} w-full`}
    style={{ gridRowStart: align + 1 }}
    >

          {/* Glow detrás del card */}

           <div
            className={`absolute ${glowClass} inset-0 rounded-xl blur-[60px] xl:w-54/100 md:w-93/100 w-full h-9/10 opacity-88 -z-0 flex items-center justify-center`} 
            style={{ backgroundColor: '#ef5caf' }}
          />
          {/* Card principal */}
          <div className="z-2 relative bg-(--neon-darker)/45 border border-(--neon-normal-active) rounded-xl p-6 w-full lg:w-8/10 xl:w-1/2">

            {/* Círculo con número */}
              <span className={`
                absolute ${circleClass}
                bg-(--neon-dark-active)/95
                border border-(--neon-normal-active) 
                text-white text-2xl lg:text-3xl font-bold rounded-full 
                w-[9vh] h-[9vh] lg:w-[7vh] lg:h-[7vh] 2xl:w-[6vh] 2xl:h-[6vh]   flex items-center justify-center 
                shadow-[0_0_5px_var(--neon-dark-active),0_0_10px_var(--neon-normal-active)]
              `}>
                1
              </span>

            {/* Contenido */}
            <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white z-10 mt-2">{title}</h3>
            <span className="text-2xl font-bold text-gray-50 mt-4">{duration}</span>
            <p className="mt-1 text-lg font-bold text-gray-50">{timeStamp}</p>
            <p className="mt-4 text-white  text-lg md:text-xl">
              {description}
            </p>
          </div>
        </div>
}