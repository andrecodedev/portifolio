import { useTranslation } from "react-i18next";
import CountUp from "../ui/CountUp";

export default function AboutStartsGrid() {
  const { t } = useTranslation();

  const parseValue = (val: string) => {
    if (!val) return { num: 0, suffix: '', decimals: 0 };
    // Extrai o número (aceita vírgula ou ponto decimal)
    const match = val.match(/(\d+([.,]\d+)?)/);
    const numStr = match ? match[0] : '0';
    const num = parseFloat(numStr.replace(',', '.'));
    const decimals = numStr.includes(',') || (numStr.includes('.') && !/^\d{1,3}(\.\d{3})*$/.test(numStr)) ? 1 : 0;

    // O sufixo é tudo o que vem depois do número
    const suffix = val.split(numStr)[1] || '';

    return { num, suffix, decimals };
  };

  const stat1 = parseValue(t('AboutStartsGrid.number1'));
  const stat2 = parseValue(t('AboutStartsGrid.number2'));
  const stat3 = parseValue(t('AboutStartsGrid.number3'));
  const stat4 = parseValue(t('AboutStartsGrid.number4', '24+'));
  const stat5 = parseValue(t('AboutStartsGrid.number5', '1.2K+'));

  const stats = [
    { num: stat1.num, decimals: stat1.decimals, suffix: stat1.suffix, label: t('AboutStartsGrid.description1', 'Anos de Estudo Intensivo') },
    { num: stat2.num, decimals: stat2.decimals, suffix: stat2.suffix, label: t('AboutStartsGrid.description2', 'Horas de Codificação') },
    { num: stat3.num, decimals: stat3.decimals, suffix: stat3.suffix, label: t('AboutStartsGrid.description3', 'Total de Commits') },
    { num: stat4.num, decimals: stat4.decimals, suffix: stat4.suffix, label: t('AboutStartsGrid.description4', 'Repositórios no GitHub') },
    { num: stat5.num, decimals: stat5.decimals, suffix: stat5.suffix, label: t('AboutStartsGrid.description5', 'Cafés Consumidos') },
  ];

  return (
    <section className="mb-8 lg:mb-12">
      <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-[1.5rem] text-center p-5 sm:px-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative px-4 after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block last:after:hidden ${index === 4 ? 'col-span-2 lg:col-span-1' : ''
              }`}
          >
            <h5 className="text-[1.875rem] md:text-4xl font-bold text-[var(--text-primary)] mb-2">
              <CountUp end={stat.num} decimals={stat.decimals} suffix={stat.suffix} />
            </h5>
            <p className="text-sm text-[var(--text-terceiro)] leading-[1.4]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
