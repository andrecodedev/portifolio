interface ExperienceData {
  logo: string;
  company: string;
  position: string;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  description: string;
}

function ExperienceItem({ data }: { data: ExperienceData }) {
  return (
    <div className="flex gap-8 mb-2 p-5 font-jet">
      {/* Cartão de conteúdo */}
      <div className="bg-[var(--bg-secondary-transparent)] border border-[var(--border)] rounded-[12px] p-6 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={data.logo}
            alt={`Logo da ${data.company}`}
            className="w-[60px] h-[60px] object-contain rounded-lg p-1 select-none"
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] m-0">{data.title}</h3>
            <p className="text-base text-[var(--text-secondary)] m-0">{data.company} · {data.position}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-[var(--text-terceiro)] opacity-80 mb-4">
          <span>{data.startDate} - {data.endDate} · {data.time}</span>
          <span>{data.location}</span>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-justify">{data.description}</p>
      </div>
    </div>
  );
}

export default ExperienceItem;
