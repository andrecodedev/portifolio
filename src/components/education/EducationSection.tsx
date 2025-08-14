// src/components/education/EducationSection.tsx

import CardEducation from './EducationItem';
import type { EducationData } from '../../data/educationData';

interface EducationSectionProps {
  educationData: EducationData[];
  activeCategory: string;
}

export default function EducationSection({ educationData, activeCategory }: EducationSectionProps) {
  const filteredData = educationData.filter(
    (item) => activeCategory === "all" || item.categoria === activeCategory
  );

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-secondary)] font-jet">
        <p>Nenhum item encontrado para esta categoria.</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-screen-xl mx-auto px-8 box-border">
      <div
        className="
          pt-4 16px de padding no topo */
          grid grid-cols-1 gap-4 
          sm:grid-cols-2 sm:gap-3
          lg:grid-cols-3 lg:gap-8
        "
      >
        {filteredData.map((item) => (
          <CardEducation key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
}