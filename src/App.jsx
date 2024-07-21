import { Outlet } from "react-router-dom";
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
