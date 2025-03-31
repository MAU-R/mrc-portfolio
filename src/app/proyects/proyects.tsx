import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import projects from './proyects.module.css';
import ProyectCard from "./ProyectCard";
export const ProyectSections = ()=>{
    return <section className={projects.projectsSection}>
        <div className={projects.proyect_header}>
            <h2 className={projects.section_heading + " rubik-font"}>Mi <br/> Experiencia</h2>
        </div>
        <ProyectCard/>
    </section>
}