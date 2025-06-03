import Navbar from '../../../components/Navbar';
import FAQAccordion from '../../../components/FAQAccordion';
export default function Content() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Our Services</h1>
        <p>
          Services that NDTV provides are accurate and upto date news, ext.
        </p>
        <FAQAccordion />
      </main>
    </>
  );
}
