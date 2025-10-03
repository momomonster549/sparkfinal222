export default function LogoWall({ logos }: { logos: { name: string; src?: string; }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
      {logos.map((logo, i) => (
        <div key={i} className="surface rounded-xl p-6 flex items-center justify-center opacity-80 hover:opacity-100 transition">
          <span className="font-label text-lg">{logo.name}</span>
        </div>
      ))}
    </div>
  );
}
