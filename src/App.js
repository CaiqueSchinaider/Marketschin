import ParamsCodeProvider from './contexts/ParameterUtils';
import AppRoutes from './routes';

function App() {
  return (
    <ParamsCodeProvider>
      <AppRoutes />
    </ParamsCodeProvider>
  );
}

export default App;
