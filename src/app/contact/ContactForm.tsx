'use client'

import { useState } from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')
        
        // Simulación de envío (aquí integrarías EmailJS, SendGrid, etc.)
        setTimeout(() => {
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 3000)
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="relative">
            {/* Glow effect de fondo */}
            <div 
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 -z-10"
                style={{ backgroundColor: 'var(--accent-normal)' }}
            />
            
            <form 
                onSubmit={handleSubmit}
                className="
                    bg-(--accent-dark)/30 
                    border-2 border-(--accent-normal)
                    rounded-2xl p-8
                    backdrop-blur-sm
                    shadow-2xl
                    space-y-6
                "
            >
                {/* Nombre */}
                <div>
                    <label 
                        htmlFor="name" 
                        className="block text-(--primary-light) font-medium mb-2 text-lg"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="
                            w-full px-4 py-3
                            bg-(--accent-dark)/50
                            border-2 border-(--accent-normal)
                            rounded-xl
                            text-(--primary-light)
                            placeholder-(--primary-light)/40
                            focus:outline-none
                            focus:border-(--neon-normal)
                            focus:ring-2 focus:ring-(--neon-normal)/50
                            transition-all duration-300
                        "
                        placeholder="Tu nombre completo"
                    />
                </div>

                {/* Email */}
                <div>
                    <label 
                        htmlFor="email" 
                        className="block text-(--primary-light) font-medium mb-2 text-lg"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="
                            w-full px-4 py-3
                            bg-(--accent-dark)/50
                            border-2 border-(--accent-normal)
                            rounded-xl
                            text-(--primary-light)
                            placeholder-(--primary-light)/40
                            focus:outline-none
                            focus:border-(--neon-normal)
                            focus:ring-2 focus:ring-(--neon-normal)/50
                            transition-all duration-300
                        "
                        placeholder="tu@email.com"
                    />
                </div>

                {/* Mensaje */}
                <div>
                    <label 
                        htmlFor="message" 
                        className="block text-(--primary-light) font-medium mb-2 text-lg"
                    >
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="
                            w-full px-4 py-3
                            bg-(--accent-dark)/50
                            border-2 border-(--accent-normal)
                            rounded-xl
                            text-(--primary-light)
                            placeholder-(--primary-light)/40
                            focus:outline-none
                            focus:border-(--neon-normal)
                            focus:ring-2 focus:ring-(--neon-normal)/50
                            transition-all duration-300
                            resize-none
                        "
                        placeholder="Cuéntame sobre tu proyecto..."
                    />
                </div>

                {/* Botón de Envío */}
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="
                        w-full py-4
                        bg-(--neon-normal)
                        hover:bg-(--neon-normal-hover)
                        active:bg-(--neon-normal-active)
                        text-(--primary-dark)
                        font-bold text-lg
                        rounded-xl
                        transition-all duration-300
                        hover:scale-[1.02]
                        active:scale-[0.98]
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        shadow-lg
                        hover:shadow-2xl
                    "
                >
                    {status === 'idle' && 'Enviar Mensaje'}
                    {status === 'sending' && 'Enviando...'}
                    {status === 'success' && '✓ Mensaje Enviado'}
                    {status === 'error' && 'Error - Intenta de nuevo'}
                </button>

                {/* Mensaje de éxito */}
                {status === 'success' && (
                    <p className="text-center text-(--neon-normal) font-medium animate-pulse">
                        ¡Gracias! Te contactaré pronto 🚀
                    </p>
                )}
            </form>
        </div>
    )
}