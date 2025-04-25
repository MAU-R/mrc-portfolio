import {titleClass} from '../utils/getClass'

export default function WorkExperience() {
    const experiencias = [
      {
        fecha: '2024 — Presente',
        puesto: 'Desarrollador Frontend',
        empresa: 'Agencia YOMERENGUES',
        ubicacion: 'Remoto',
        logros: [
          'Desarrollo de interfaces responsivas usando Next.js y Tailwind',
          'Optimización de rendimiento en sitios con alto tráfico',
        ],
        tecnologias: 'Next.js, React, Tailwind CSS, Vercel',
      },
      {
        fecha: '2023 — 2024',
        puesto: 'Desarrollador Web',
        empresa: 'Empresa WebApp',
        ubicacion: 'Ciudad',
        logros: [
          'Implementación de características complejas en aplicaciones web',
          'Colaboración en un equipo multifuncional bajo metodologías ágiles',
        ],
        tecnologias: 'JavaScript, Vue.js, Node.js, Sass',
      },
    ];
    
    return (
      <section className="h-max bg-(--primary-normal  ) text-(--text-light) px-4 md:px-12 flex flex-col justify-between p-14" id="experiencia">
        <h2 className={`text-3xl md:text-4xl font-bold text-(--accent-normal)  w-full text-center  ${titleClass}`}>Mi Trayectoria Profesional</h2>
        <div className="space-y-8 border-l border-(--primary-dark) bg-(accent-normal)/80  pl-6">
          {experiencias.map((exp, i) => (
            <div key={i} className="">
              <span className=" -left-[13px] top-1 w-3 h-3 bg-blue-500 rounded-full" />
              <p className="text-sm text-gray-300 mb-1">{exp.fecha}</p>
              <h3 className="text-lg font-bold">{exp.puesto}</h3>
              <p className="text-sm text-blue-200 mb-2">
                {exp.empresa} <span className="text-gray-400">|</span> {exp.ubicacion}
              </p>
              <ul className="text-gray-300 space-y-1 text-sm mb-2">
                {exp.logros.map((logro, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-[3px]">📌</span>
                    <span>{logro}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">Tecnologías:</span> {exp.tecnologias}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  