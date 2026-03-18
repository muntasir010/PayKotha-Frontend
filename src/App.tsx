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
      <div className="max-w-7xl mx-2 md:mx-4 lg:mx-auto">
        <About />
        <Features />
        <Contacts />
        <Faq />
      </div>
    </>
  );
}

export default App;
