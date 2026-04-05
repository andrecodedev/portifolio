import FadeIn from '../FadeIn';
import CardEducation from './EducationItem';
import type { EducationData } from '../../data/educationData';

interface EducationSectionProps {
  educationData: EducationData[];
  baseDelay?: number;
}

export default function EducationSection({
  educationData,
  baseDelay = 0
}: EducationSectionProps) {
  const filteredData = educationData;

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-secondary)] font-jet">
        <p>Nenhum item encontrado para esta categoria.</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-screen-xl mx-auto box-border">
      <div
        className="
          pt-4
          grid grid-cols-1 gap-4 
          sm:grid-cols-2 sm:gap-3
          lg:grid-cols-3 lg:gap-8
        "
      >
        {filteredData.map((item, index) => (
          <FadeIn
            key={item.id}
            delay={baseDelay + Math.floor(index / 3) * 0.05}
            duration={650}
            y={24}
          >
            <CardEducation data={item} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}