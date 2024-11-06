import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/comprar/:paramscategoria" element={<Buy />}>
          {" "}
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/produto/:id" element={<Product />}></Route>
        <Route path="/carrinho/:produtocomprado" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
