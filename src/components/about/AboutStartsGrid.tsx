import { useTranslation } from "react-i18next";

interface AboutStartsGridProps {
  number1: string;
  description1: string;
  number2: string;
  description2: string;
  number3: string;
  description3: string;
  number4: string;
  description4: string;
}

export default function AboutStartsGrid({
  number1, description1,
  number2, description2,
  number3, description3,
  number4, description4,
}: AboutStartsGridProps) {
  const { t } = useTranslation();

  return (
    <section>
      <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] text-center p-5 sm:px-6">
        
        {/* Item 1 */}
        <div className="relative px-4 after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block lg:last:after:hidden
">
          <h5 className="text-[2.5rem] font-bold text-[var(--text-primary)] mb-2">
            {number1}{t('AboutStartsGrid.number1')}
          </h5>
          <p className="text-[0.9rem] text-[var(--text-terceiro)] leading-[1.4]">
            {description1}{t('AboutStartsGrid.description1')}
          </p>
        </div>

        {/* Item 2 */}
        <div className="relative px-4 after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block lg:last:after:hidden">
          <h5 className="text-[2.5rem] font-bold text-[var(--text-primary)] mb-2">
            {number2}{t('AboutStartsGrid.number2')}
          </h5>
          <p className="text-[0.9rem] text-[var(--text-terceiro)] leading-[1.4]">
            {description2}{t('AboutStartsGrid.description2')}
          </p>
        </div>

        {/* Item 3 */}
        <div className="relative px-4 after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block lg:last:after:hidden
">
          <h5 className="text-[2.5rem] font-bold text-[var(--text-primary)] mb-2">
            {number3}{t('AboutStartsGrid.number3')}
          </h5>
          <p className="text-[0.9rem] text-[var(--text-terceiro)] leading-[1.4]">
            {description3}{t('AboutStartsGrid.description3')}
          </p>
        </div>

        {/* Item 4 */}
        <div className="relative px-4">
          <h5 className="text-[2.5rem] font-bold text-[var(--text-primary)] mb-2">
            {number4}{t('AboutStartsGrid.number4')}
          </h5>
          <p className="text-[0.9rem] text-[var(--text-terceiro)] leading-[1.4]">
            {description4}{t('AboutStartsGrid.description4')}
          </p>
        </div>

      </div>
    </section>
  );
}
