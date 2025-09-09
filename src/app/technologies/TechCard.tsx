"use client";

interface PromoCardProps {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  image: string;
  isActive?: boolean; // 👈 nueva prop
}

export default function TechCard({
  title,
  subtitle,
  description,
  link,
  image,
  isActive = false,
}: PromoCardProps) {
  return (
    <div className="relative embla__slide flex justify-between w-[5vw] max-w-[550px] min-w-[200px] p-14 border-solid border-3 rounded-4xl border-(--accent-normal) bg-(--accent-dark)/40">
      {/* Glow solo si está activo */}
      {isActive && (
        <div
          className="absolute inset-0 -z-10 rounded-xl blur-[90px] opacity-70 w-full h-full transition-opacity duration-500"
          style={{ backgroundColor: "var(--accent-normal)" }}
        />
      )}

      <img src={image} alt="Paypal" className="w-[10vw] h-[10vw] mr-8" />
      <section className="flex flex-col">
        <h2 className="text-4xl text-(--accent-normal) font-bold mb-auto">{title}</h2>
        <h3 className="font-semibold text-2xl text-(--accent-light-hover) mb-4">
          {subtitle}
        </h3>
        <p className="text-xl text-(--accent-light-active) mb-auto">{description}</p>
      </section>
    </div>
  );
}
