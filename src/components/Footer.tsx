import { useTranslation } from 'react-i18next';

// Importe suas imagens aqui
import LinkedinIcon from '../img/redes/linkedin.svg';
import GithubIcon from '../img/redes/github.svg';
import EmailIcon from '../img/redes/email.svg';
import LogoIcon from '../img/logo.svg';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="      
        flex flex-col items-center justify-around gap-4 p-4 text-center 
        text-xs text-primary select-none flex-shrink-0 font-jet leading-snug tracking-tight
        sm:text-xs 
        md:py-6 md:px-0 md:flex-row">

      <div className="md:text-left flex items-center px-6">
        <p className="m-0 leading-snug px-6">
          {t('footer.copyright')} {currentYear} <a href="https://andrecode.dev.br" className="text-primary no-underline pointer-events-auto hover:underline">
            andrecode.dev.br</a><br />
          {t('footer.rights')}
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <a
          href="https://linkedin.com/in/andrecodedev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
        </a>

        <a
          href="https://github.com/andrecodedev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src={GithubIcon} alt="GitHub" className="w-5 h-5" />
        </a>

        <a
          href="mailto:contato.andrecodedev@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src={EmailIcon} alt="E-mail" className="w-5 h-5" />
        </a>
      </div>

      <div className="flex items-center gap-[6px] md:gap-2">
        <p className="flex items-center justify-center gap-[6px] m-0 text-primary md:justify-start">
          {t('footer.built_with')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#444444ff"
            stroke="#444444ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block align-middle"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          {t('footer.built_with_2')}
        </p>
        <img
          src={LogoIcon}
          alt="Avatar André Vitor"
          className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px]"
        />
      </div>
    </footer>
  );
};

export default Footer;
