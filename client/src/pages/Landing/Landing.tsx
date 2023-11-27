import { NextSeo } from "next-seo";
import { Footer, Header, Main } from "./components";
const Vehicles: React.FC = () => {
  return (
    <div className="text-black bg-black">
      <NextSeo title="Home: VMS" description="Welcome to VMS homepage." />
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Vehicles;
