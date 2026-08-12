---
name: react-3d-quality
description: Reglas de calidad para proyectos REACT
---

- Usa type hints en toda función pública. Nunca `Any` sin justificar.
- Maneja errores con excepciones específicas, nunca `except Exception` genérico salvo en el borde de la API.
- En endpoints FastAPI: valida con Pydantic, nunca dicts sueltos como request/response.
- Funciones cortas (<40 líneas); si crece, extrae helpers.
- Nada de código muerto ni comentarios que repitan lo obvio del código.
- Si hay lógica de scheduling, usa el patrón existente con APScheduler del proyecto.
- Antes de proponer un cambio grande, resume el plan en 3-5 pasos y espera confirmación si el cambio toca más de 2 archivos.
- Escribe o actualiza tests cuando el cambio afecta lógica de negocio.