import "./App.css";
import About from "./pages/about/About";
import Contacts from "./pages/contact/Contacts";
import Faq from "./pages/faq/Faq";
import Features from "./pages/features/Features";
import HomeCarousel from "./components/common/HomeCarousel";
function App() {
  return (
    <>
      <HomeCarousel />
      <About />
      <Features />
      <Contacts />
      <Faq />
    </>
  );
}

export default App;
