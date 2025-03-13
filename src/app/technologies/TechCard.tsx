"use client";

import Image from "next/image";
import techCarousel from './techCard.module.css'
import techCard from './techCard.module.css'
interface PromoCardProps {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  image: string
}

export default function TechCard({ title, subtitle, description, link, image }: PromoCardProps) {
  return (
    <div className={techCard.tech_card}>
        <img src={image} alt="Paypal" className={techCard.icon_image}/>
      <section className={techCard.cardSectionBig} >
      <h2 className={techCard.title}>{title}</h2>
      <h3 className={techCard.subtitle}>{subtitle}</h3>
      <p className={techCard.description}>{description}</p>
      </section>
    </div>
  );
}
