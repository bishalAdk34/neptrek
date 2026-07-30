export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-primary-900 py-14 text-center">
      <div className="container">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-primary-200">{subtitle}</p>}
      </div>
    </section>
  );
}
