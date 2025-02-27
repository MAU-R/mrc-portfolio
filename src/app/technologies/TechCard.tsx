"use client";

import Image from "next/image";
import techCarousel from './techCarousel.module.css'
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
    <div className={techCarousel.tech_card}>
      <section className={techCard.cardSection}>
      <h2 className={techCard.title}>{title}</h2>
      <div className={techCard.icon}>
        <Image src={image} alt="Paypal" width={40} height={40} className={techCard.icon_image}/>
      </div>
      </section>
      <section className={techCard.cardSectionBig} >
      <h3 className={techCard.subtitle}>{subtitle}</h3>
      <p className={techCard.description}>{description}</p>
      </section>
    </div>
  );
}
