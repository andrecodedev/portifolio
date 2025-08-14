import { useTranslation } from "react-i18next";

interface TitleProps {
  title_1?: string;
  title_2?: string;
  title_3?: string;
  title_4?: string;
  title_5?: string;
  title_6?: string;
}

export default function Title({ 
  title_1,
  title_2,
  title_3,
  title_4,
  title_5,
  title_6

}: TitleProps) {
  const { t } = useTranslation();

  return (
    <>
    <div className="flex flex-1 flex-col justify-center items-center text-center px-4 py-6 sm:px-8 lg:px-16">
      {title_1 && (
        <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold leading-tight bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
          {title_1} {t('page_titles.about')}
        </h2>
      )}

      {title_2 && (
        <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold leading-tight bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
          {title_2} {t('page_titles.aboutExpPro')}
        </h2>
      )}

      {title_3 && (
        <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold leading-tight bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
          {title_3} {t('page_titles.education')}
        </h2>
      )}

      {title_4 && (
        <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold leading-tight bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
          {title_4} {t('page_titles.skills')}
        </h2>
      )}
            
      {title_5 && (
        <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold leading-tight bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
          {title_5} {t('page_titles.projects')}
        </h2>
      )}

      {title_6 && (
        <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold leading-tight bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
          {title_6} {t('page_titles.contact')}
        </h2>
      )}
    </div>
    
    </>
  );
}
