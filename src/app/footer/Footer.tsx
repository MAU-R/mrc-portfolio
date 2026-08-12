'use client'

import { Github, Linkedin, FileText, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
    const socialLinks = [
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/mauricio-ramirez',
            color: 'var(--accent-normal)'
        },
        {
            icon: Github,
            label: 'Github',
            href: 'https://github.com/mauricio-ramirez',
            color: 'var(--neon-normal)'
        },
        {
            icon: FileText,
            label: 'Mi CV',
            href: '/cv-mauricio-ramirez.pdf',
            color: 'var(--accent-normal)'
        },
        {
            icon: Mail,
            label: 'Email',
            href: 'mailto:mauricio@example.com',
            color: 'var(--neon-normal)'
        }
    ]

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="
            w-full
            bg-gradient-to-b from-(--primary-darker) to-(--primary-dark)
            border-t-2 border-(--accent-normal)/30
            py-16 px-4
        ">
            <div className="max-w-7xl mx-auto">
                {/* Grid Principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Columna 1: Marca */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-(--primary-light)">
                            Mauricio<br/>
                            <span className="text-(--neon-normal)">Ramirez</span>
                        </h3>
                        <p className="text-(--primary-light)/70 text-lg">
                            Software Engineer
                        </p>
                        <p className="text-(--primary-light)/60">
                            Construyendo el futuro, una línea de código a la vez.
                        </p>
                    </div>

                    {/* Columna 2: Links Rápidos */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-(--primary-light)">
                            Encuéntrame
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((link, index) => {
                                const Icon = link.icon
                                return (
                                    <a
                                        key={index}
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={link.label}
                                        className="
                                            group flex items-center gap-2 px-4 py-2
                                            bg-(--accent-dark)/30
                                            border-2 border-(--accent-normal)/50
                                            hover:border-(--neon-normal)
                                            rounded-xl
                                            transition-all duration-300
                                            hover:scale-105
                                            hover:shadow-lg
                                        "
                                    >
                                        <Icon 
                                            className="w-5 h-5" 
                                            style={{ color: link.color }}
                                        />
                                        <span className="
                                            text-sm text-(--primary-light) 
                                            group-hover:text-(--neon-normal)
                                            transition-colors
                                        ">
                                            {link.label}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Columna 3: Volver Arriba */}
                    <div className="space-y-4 flex flex-col items-start lg:items-end">
                        <button
                            onClick={scrollToTop}
                            className="
                                group flex items-center gap-3 px-6 py-3
                                bg-(--neon-normal)
                                hover:bg-(--neon-normal-hover)
                                text-(--primary-dark)
                                font-bold
                                rounded-xl
                                transition-all duration-300
                                hover:scale-105
                                shadow-lg hover:shadow-2xl
                            "
                        >
                            <span>Volver Arriba</span>
                            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <p className="text-(--primary-light)/60 text-sm text-right">
                            Hecho con ❤️ y mucho ☕
                        </p>
                    </div>
                </div>

                {/* Divisor */}
                <div className="
                    w-full h-[2px]
                    bg-gradient-to-r from-transparent via-(--accent-normal) to-transparent
                    mb-8
                " />

                {/* Copyright y Firma */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-(--primary-light)/70">
                    <p className="text-center md:text-left">
                        © 2026 Mauricio Ramirez. Todos los derechos reservados.
                    </p>
                    <p className="text-center md:text-right">
                        Diseñado y desarrollado con <span className="text-(--neon-normal)">React</span>, 
                        <span className="text-(--accent-normal)"> Next.js</span> y 
                        <span className="text-(--neon-normal)"> Three.js</span>
                    </p>
                </div>
            </div>

            {/* Glow effect de fondo */}
            <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-32 blur-[100px] opacity-20 -z-10"
                style={{ backgroundColor: 'var(--neon-normal)' }}
            />
        </footer>
    )
}