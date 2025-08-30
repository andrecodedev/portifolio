import ExperienceItem from './ExperienceItem';
import { useTranslation } from 'react-i18next';
import { experienceData } from '../../data/experienceData';

function ExperienceSection() {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  return (
    <div className="max-w-4xl mx-auto">
      {experienceData(t).map((item) => (
        <ExperienceItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default ExperienceSection;
