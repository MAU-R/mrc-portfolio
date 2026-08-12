import ProyectCard from "./ProyectCards"

export const ProyectSection = () => {
    const proyectsInformation = [
        {
            title: 'Sistema de Gestión Empresarial',
            subtitle: 'ERP Completo',
            imageUrl: '/img/project-erp.png',
            description: 'Sistema integral de gestión empresarial con módulos de inventario, ventas, finanzas y recursos humanos. Arquitectura escalable con microservicios.',
            techs: [
                {
                    icon: '/img/spring.png',
                    text: 'Spring Boot'
                },
                {
                    icon: '/img/react.png',
                    text: 'React'
                },
                {
                    icon: '/img/aws.png',
                    text: 'AWS'
                }
            ]
        },
        {
            title: 'Plataforma E-Commerce',
            subtitle: 'Tienda Online',
            imageUrl: '/img/project-ecommerce.png',
            description: 'Plataforma de comercio electrónico con carrito de compras, pasarela de pagos y sistema de gestión de órdenes en tiempo real.',
            techs: [
                {
                    icon: '/img/next.png',
                    text: 'Next.js'
                },
                {
                    icon: '/img/Nest.js.png',
                    text: 'NestJS'
                },
                {
                    icon: '/img/aws.png',
                    text: 'AWS'
                }
            ]
        },
        {
            title: 'Dashboard Analytics',
            subtitle: 'Business Intelligence',
            imageUrl: '/img/project-analytics.png',
            description: 'Dashboard interactivo para análisis de datos empresariales con visualizaciones en tiempo real y reportes personalizables.',
            techs: [
                {
                    icon: '/img/vue.png',
                    text: 'Vue.js'
                },
                {
                    icon: '/img/nuxt.png',
                    text: 'Nuxt'
                },
                {
                    icon: '/img/spring.png',
                    text: 'Spring'
                }
            ]
        },
        {
            title: 'API Gateway Microservicios',
            subtitle: 'Arquitectura Distribuida',
            imageUrl: '/img/project-gateway.png',
            description: 'Gateway centralizado para gestión de microservicios con balanceo de carga, autenticación y monitoreo de servicios.',
            techs: [
                {
                    icon: '/img/Nest.js.png',
                    text: 'NestJS'
                },
                {
                    icon: '/img/react.png',
                    text: 'React'
                },
                {
                    icon: '/img/aws.png',
                    text: 'AWS'
                }
            ]
        }
    ]

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-start py-16 px-4 gap-12">
            <div className="w-full max-w-7xl text-center mb-8">
                <h2 className="text-5xl md:text-6xl font-bold text-(--primary-light) mb-4">
                    Mis Proyectos
                </h2>
                <p className="text-xl text-(--primary-light)/70">
                    Soluciones tecnológicas que transforman ideas en realidad
                </p>
            </div>
            
            <div className="w-full max-w-7xl flex flex-col gap-16">
                {proyectsInformation.map((proyect, index) => (
                    <ProyectCard key={index} {...proyect} index={index} />
                ))}
            </div>
        </section>
    )
}