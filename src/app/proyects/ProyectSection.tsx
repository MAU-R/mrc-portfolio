import ProyectCard from "./ProyectCards"



export  const ProyectSection = () =>{
    const proyectsInformation = [
        {
            title: 'Proyecto de muestra',
            subtitle: 'Proyecto de muestra',
            imageUrl:'BITCH',
            description: 'hellow',
            techs:[
                {
                    icon:'../../assets/Nest.svg',
                    text:'Nest'
                }
            ]
        }
    ]
    return <section className="flex w-full h-max justify-center p-4">
    {proyectsInformation.map((proyect, index) => <ProyectCard {...proyect} index = {index} /> )}
    
    </section>


}      