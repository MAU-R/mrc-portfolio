"use client";

import Image from "next/image";
import techCard from '../techCard.module.css'

interface PromoCardProps {
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

export default function TechCard({ title, subtitle, description, link }: PromoCardProps) {
  return (
    <div className="promo-card">
      <div className={techCard.icon}>
        <Image src="/paypal-logo.svg" alt="Paypal" width={40} height={40} />
      </div>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>{description}</p>
      <a href={link} className="promo-link">
        {link}
      </a>
    </div>
  );
}
