import { useTranslation } from "react-i18next";
import CountUp from "../ui/CountUp";
import PixelCoffee from "../ui/PixelCoffee";
import PixelCode from "../ui/PixelCode";
import PixelClock from "../ui/PixelClock";
import PixelCalendar from "../ui/PixelCalendar";
import PixelRepo from "../ui/PixelRepo";

export default function AboutStartsGrid() {
  const { t } = useTranslation();

  const parseValue = (val: string) => {
    if (!val) return { num: 0, suffix: '', decimals: 0, useKFormatter: false };
    const match = val.match(/(\d+([.,]\d+)?)/);
    const numStr = match ? match[0] : '0';
    let num = parseFloat(numStr.replace(',', '.'));
    let suffix = val.split(numStr)[1] || '';
    
    let useKFormatter = false;
    let decimals = 0;

    if (suffix.toUpperCase().includes('K')) {
      num = num * 1000;
      suffix = suffix.replace(/k/i, '');
      useKFormatter = true;
      decimals = numStr.includes(',') || (numStr.includes('.') && !/^\d{1,3}(\.\d{3})*$/.test(numStr)) ? 1 : 0;
    }

    return { num, suffix, decimals, useKFormatter };
  };

  const stat1 = parseValue(t('AboutStartsGrid.number1'));
  const stat2 = parseValue(t('AboutStartsGrid.number2'));
  const stat3 = parseValue(t('AboutStartsGrid.number3'));
  const stat4 = parseValue(t('AboutStartsGrid.number4', '24+'));
  const stat5 = parseValue(t('AboutStartsGrid.number5', '1.2K+'));

  const statsData = [
    {
      num: stat1.num,
      decimals: stat1.decimals,
      suffix: stat1.suffix,
      useKFormatter: stat1.useKFormatter,
      labelKey: 'AboutStartsGrid.description1',
      labelDefault: 'Anos de Estudo Intensivo',
      isHighlight: true,
      highlightColor: 'text-[var(--text-primary)]',
      icon: <PixelCalendar className="w-6 h-6 md:w-8 md:h-8" />,
      tooltipKey: 'AboutStartsGrid.tooltip1',
      tooltipDefault: 'Base de conhecimento!'
    },
    {
      num: stat2.num,
      decimals: stat2.decimals,
      suffix: stat2.suffix,
      useKFormatter: stat2.useKFormatter,
      labelKey: 'AboutStartsGrid.description2',
      labelDefault: 'Horas de Codificação',
      isHighlight: true,
      highlightColor: 'text-[var(--text-primary)]',
      icon: <PixelClock className="w-6 h-6 md:w-8 md:h-8" />,
      tooltipKey: 'AboutStartsGrid.tooltip2',
      tooltipDefault: 'Foco e persistência!'
    },
    {
      num: stat3.num,
      decimals: stat3.decimals,
      suffix: stat3.suffix,
      useKFormatter: stat3.useKFormatter,
      labelKey: 'AboutStartsGrid.description3',
      labelDefault: 'Total de Commits',
      isHighlight: true,
      highlightColor: 'text-[var(--text-primary)]',
      icon: <PixelCode className="w-6 h-6 md:w-8 md:h-8" />,
      tooltipKey: 'AboutStartsGrid.tooltip3',
      tooltipDefault: 'Evolução constante!'
    },
    {
      num: stat4.num,
      decimals: stat4.decimals,
      suffix: stat4.suffix,
      useKFormatter: stat4.useKFormatter,
      labelKey: 'AboutStartsGrid.description4',
      labelDefault: 'Repositórios no GitHub',
      isHighlight: true,
      highlightColor: 'text-[var(--text-primary)]',
      icon: <PixelRepo className="w-6 h-6 md:w-8 md:h-8" />,
      tooltipKey: 'AboutStartsGrid.tooltip4',
      tooltipDefault: 'Código aberto!'
    },
    {
      num: stat5.num,
      decimals: stat5.decimals,
      suffix: stat5.suffix,
      useKFormatter: stat5.useKFormatter,
      labelKey: 'AboutStartsGrid.description5',
      labelDefault: 'Cafés Consumidos',
      isHighlight: true,
      highlightColor: 'text-[var(--text-primary)]',
      icon: <PixelCoffee className="w-6 h-6 md:w-8 md:h-8" />,
      tooltipKey: 'AboutStartsGrid.tooltip5',
      tooltipDefault: 'Energia para codar!'
    },
  ];

  return (
    <section className="w-full">
      <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-[1.5rem] text-center p-5 sm:px-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            tabIndex={0}
            className={`relative px-4 group outline-none after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block last:after:hidden ${index === statsData.length - 1 && statsData.length % 2 !== 0 ? 'col-span-2 lg:col-span-1' : ''}`}
          >
            <h5 className={`text-[1.875rem] md:text-3xl font-bold mb-2 transition-all duration-300 flex items-center justify-center gap-2 ${stat.isHighlight ? `${stat.highlightColor}` : 'text-[var(--text-primary)]'}`}>
              {stat.icon && (
                <span className="flex-shrink-0">
                  {stat.icon}
                </span>
              )}
              <CountUp end={stat.num} decimals={stat.decimals} suffix={stat.suffix} useKFormatter={stat.useKFormatter} />
            </h5>
            <p className={`text-[11px] md:text-xs leading-[1.4] transition-colors duration-300 text-[var(--text-terceiro)] ${stat.isHighlight ? 'font-bold opacity-100' : ''}`}>
              {t(stat.labelKey, stat.labelDefault)}
              {stat.isHighlight && stat.tooltipKey && (
                <span className={`block text-[10px] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity mt-1 italic text-[var(--text-terceiro)]`}>
                  {t(stat.tooltipKey, stat.tooltipDefault)}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
