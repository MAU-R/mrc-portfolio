'use client'

import { useState } from 'react'

type TechFields = {
    icon: string,
    text: string
}

type ProyectProps = {
    index: number,
    title: string,
    subtitle: string
    description: string,
    techs: Array<TechFields>,
    imageUrl: string
}

export default function ProyectCard({ index, title, subtitle, description, imageUrl, techs }: ProyectProps) {
    const [isHovered, setIsHovered] = useState(false)
    
    // Alternar el layout: par (imagen izquierda) / impar (imagen derecha)
    const isEven = index % 2 === 0
    
    return (
        <article 
            className={`
                w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} 
                gap-6 md:gap-8 items-center justify-between
                transition-all duration-500 ease-out
                ${isHovered ? 'scale-[1.02]' : 'scale-100'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Columna de Imagen */}
            <div className="w-full md:w-1/2 relative group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-(--accent-normal) shadow-2xl">
                    {/* Placeholder para la imagen - puedes reemplazar con imágenes reales */}
                    <div 
                        className="w-full aspect-video bg-gradient-to-br from-(--accent-dark) to-(--neon-dark) flex items-center justify-center"
                        style={{
                            backgroundImage: imageUrl.includes('project') ? 'none' : `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {imageUrl.includes('project') && (
                            <div className="text-center p-8">
                                <div className="text-6xl mb-4">🚀</div>
                                <p className="text-(--primary-light)/50">Screenshot del proyecto</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Overlay de hover */}
                    <div className={`
                        absolute inset-0 bg-(--accent-normal)/20 backdrop-blur-sm
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                        flex items-center justify-center
                    `}>
                        <button className="px-6 py-3 bg-(--neon-normal) text-(--primary-dark) rounded-xl font-bold hover:scale-110 transition-transform">
                            Ver Proyecto
                        </button>
                    </div>
                </div>
                
                {/* Glow effect */}
                <div
                    className={`
                        absolute -inset-4 rounded-3xl blur-2xl -z-10
                        transition-opacity duration-500
                        ${isHovered ? 'opacity-60' : 'opacity-30'}
                    `}
                    style={{ backgroundColor: 'var(--accent-normal)' }}
                />
            </div>

            {/* Columna de Contenido */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {/* Subtitle */}
                <span className="text-sm md:text-base font-medium text-(--accent-normal) uppercase tracking-wider">
                    {subtitle}
                </span>
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-(--primary-light) leading-tight">
                    {title}
                </h3>
                
                {/* Description Box */}
                <div className="relative">
                    <div className="
                        w-full bg-(--accent-dark)/70 
                        border-2 border-(--accent-normal) 
                        rounded-xl p-6
                        backdrop-blur-sm
                        shadow-lg
                    ">
                        <p className="text-(--primary-light)/90 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mt-2">
                    {techs.map((tech, idx) => (
                        <div 
                            key={`${tech.text}-${idx}`}
                            className="
                                flex items-center gap-2 
                                px-4 py-2 
                                bg-(--accent-dark)/60 
                                border-2 border-(--accent-normal) 
                                rounded-full
                                hover:bg-(--accent-normal)/20
                                transition-all duration-300
                                hover:scale-105
                                shadow-md
                            "
                        >
                            <div
                                className="w-6 h-6 bg-(--primary-light) [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
                                style={{
                                    maskImage: `url(${tech.icon})`,
                                    WebkitMaskImage: `url(${tech.icon})`,
                                }}
                            />
                            <span className="text-sm font-medium text-(--primary-light)">
                                {tech.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}