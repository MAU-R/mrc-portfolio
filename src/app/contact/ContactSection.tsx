'use client'

import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

export default function ContactSection() {
    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-(--primary-darker)">
            <div className="w-full max-w-7xl">
                {/* Título Principal */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold text-(--primary-light) mb-4">
                        Contáctame
                    </h2>
                    <p className="text-xl text-(--primary-light)/70">
                        ¿Tienes un proyecto en mente? Trabajemos juntos
                    </p>
                </div>
                
                {/* Grid de Formulario e Información */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Formulario */}
                    <ContactForm />
                    
                    {/* Información de Contacto */}
                    <ContactInfo />
                </div>
            </div>
        </section>
    )
}