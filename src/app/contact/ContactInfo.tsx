'use client'

import { Mail, Linkedin, Phone } from 'lucide-react'

export default function ContactInfo() {
    const contactMethods = [
        {
            icon: Mail,
            label: 'Email',
            value: 'mauricio@example.com',
            href: 'mailto:mauricio@example.com',
            color: 'var(--accent-normal)'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: '/in/mauricio-ramirez',
            href: 'https://linkedin.com/in/mauricio-ramirez',
            color: 'var(--neon-normal)'
        },
        {
            icon: Phone,
            label: 'Teléfono',
            value: '+52 123 456 7890',
            href: 'tel:+521234567890',
            color: 'var(--accent-normal)'
        }
    ]

    return (
        <div className="flex flex-col gap-8 lg:pl-8">
            {/* Intro Text */}
            <div className="space-y-4">
                <h3 className="text-3xl font-bold text-(--primary-light)">
                    Información de Contacto
                </h3>
                <p className="text-lg text-(--primary-light)/80 leading-relaxed">
                    Siempre estoy abierto a discutir nuevos proyectos, ideas creativas o 
                    oportunidades para formar parte de tu visión.
                </p>
            </div>

            {/* Métodos de Contacto */}
            <div className="space-y-6">
                {contactMethods.map((method, index) => {
                    const Icon = method.icon
                    return (
                        <a
                            key={index}
                            href={method.href}
                            target={method.href.startsWith('http') ? '_blank' : undefined}
                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="
                                group flex items-center gap-4 p-6
                                bg-(--accent-dark)/20
                                border-2 border-(--accent-normal)/50
                                hover:border-(--neon-normal)
                                rounded-2xl
                                transition-all duration-300
                                hover:scale-[1.02]
                                hover:shadow-xl
                            "
                            style={{
                                '--icon-color': method.color
                            } as React.CSSProperties}
                        >
                            <div className="
                                flex items-center justify-center
                                w-14 h-14
                                bg-(--accent-normal)/20
                                group-hover:bg-(--neon-normal)/20
                                rounded-xl
                                transition-all duration-300
                            ">
                                <Icon 
                                    className="w-7 h-7" 
                                    style={{ color: method.color }}
                                />
                            </div>
                            
                            <div className="flex-1">
                                <p className="text-sm text-(--primary-light)/60 font-medium">
                                    {method.label}
                                </p>
                                <p className="text-lg text-(--primary-light) font-semibold group-hover:text-(--neon-normal) transition-colors">
                                    {method.value}
                                </p>
                            </div>

                            <div className="
                                text-(--accent-normal)
                                group-hover:text-(--neon-normal)
                                group-hover:translate-x-2
                                transition-all duration-300
                            ">
                                →
                            </div>
                        </a>
                    )
                })}
            </div>

            {/* CTA adicional */}
            <div className="
                mt-8 p-6
                bg-gradient-to-br from-(--neon-dark)/30 to-(--accent-dark)/30
                border-2 border-(--neon-normal)/50
                rounded-2xl
                text-center
            ">
                <p className="text-(--primary-light)/90 mb-2">
                    ¿Prefieres una conversación directa?
                </p>
                <p className="text-2xl font-bold text-(--neon-normal)">
                    ¡Escríbeme hoy mismo!
                </p>
            </div>
        </div>
    )
}