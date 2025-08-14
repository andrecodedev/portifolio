import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import FadeIn from "../components/FadeIn";

export default function Contato() {

  return (
    <div className="geral">
      <header>
        <Header />
      </header>

      <main className="flex-1 flex flex-col items-center px-4">
        <FadeIn duration={1000}>
        <Title title_6=" " />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full mt-6">
          <ContactInfo />
          <ContactForm />
        </div>
      </FadeIn>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
