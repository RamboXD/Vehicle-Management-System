import { Header, Sidebar } from "./components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header />
        <div className="w-full h-screen flex flex-row">
          <Sidebar />
          <div className="w-full p-5 h-[92vh] overflow-auto flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
