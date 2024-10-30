import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Product from "./components/Product";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/comprar/:paramscategoria" element={<Buy />}>
          {" "}
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/produto/:id" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
