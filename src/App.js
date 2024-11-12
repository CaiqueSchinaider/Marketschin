import ParamsCodeProvider from "./contexts/ParamsCode";
import AppRoutes from "./routes";

function App() {
  return (
    <ParamsCodeProvider>
      <AppRoutes />
    </ParamsCodeProvider>
  );
}

export default App;
