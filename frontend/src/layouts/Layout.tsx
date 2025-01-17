import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface props {
  children: React.ReactNode;
}

const Layout = ({children}: props) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <div className="p-5"><SearchBar /></div>
        <div className=" flex-1 md:py-10 p-3 ">{children}</div>
        <Footer />
    </div>
  )
}

export default Layout;