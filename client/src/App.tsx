import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import { SidebarProvider } from "./contexts/sidebarContext";

import { Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/member/jobs" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <Routes>
          {routes.map((route) => {
            const RouteComponent = route.isPublic
              ? PublicRoute
              : ProtectedRoute;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteComponent>{route.component}</RouteComponent>}
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;
