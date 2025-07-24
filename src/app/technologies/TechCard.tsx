"use client";
interface PromoCardProps {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  image: string
}

export default function TechCard({ title, subtitle, description, link, image }: PromoCardProps) {
  return (
    <div className=''>
        <img src={image} alt="Paypal" className=''/>
      <section className='' >
      <h2 className=''></h2>
      <h3 className=''></h3>
      <p className=''></p>
      </section>
    </div>
  );
}
