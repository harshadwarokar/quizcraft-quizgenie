
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FixedAdBoxes from "../FixedAdBoxes";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FixedAdBoxes />
      <main className="flex-grow pt-24"> {/* Added padding to accommodate the top fixed ad */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
