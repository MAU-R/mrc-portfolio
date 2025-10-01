
type TechFields = {
    icon: string,
    text: string
}

type ProyectProps = {
    index: number,
    title: string,
    subtitle: string
    description:string,
    techs: Array<TechFields>,
    imageUrl:string
}


export default function ProyectCard ({index, title, subtitle, description, imageUrl, techs}: ProyectProps){
    
    return <article className="w-95/100 md:w-8/10 lg:w7/10 flex align-middle h-[40vh] md:h-[40vh] lg:h-[25vh]">
        <div className="w-1/2">
            <img src={imageUrl} alt="Imagen del proyecto" />
            <div
            className={`absolute inset-0 rounded-xl blur-[6000px] xl:w-54/100 md:w-93/100 w-full h-9/10 opacity-38 -z-0 flex items-center justify-center`} 
            style={{ backgroundColor: 'var-(--accent-normal )' }}
          />
        </div>
        <div className="w-1/2  flex flex-col">
            <span className="h-1/8 mb-2">{subtitle}</span>
            <h3 className="h-1/4 mb-1">{title}</h3>
            <div className="w-full bg-(--accent-dark)/70 border-2 border-(--accent-normal) rounded-xl h-1/2 mb-2">
                <p>{description}</p>
            </div>
            <div className="h-1/8 flex w-full justify-around">
                {techs.map((tech) => (
                    <div key={tech.icon} className="flex w-max justify-between p-2 bg-(--accent-normal) rounded-2xl border-2 border-(--accent-normal)">
                    <div
                        className="w-8 h-8 bg-(--accent-dark)/80  [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
                        style={{
                        maskImage: `url(${tech.icon})`,
                        WebkitMaskImage: `url(${tech.icon})`, // Safari
                        }}
                    />
                    <span className="ml-2">{tech.text}</span>
                    </div>
                ))}
            </div>
        </div>
    </article>

}