import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import LoginsProvider from "./contexts/Logins";
import Code from "./pages/Code";
import ConfimCodeProvider from "./contexts/ConfirmCode";
import ParamsCodeProvider, { ParamsCodeContext } from "./contexts/ParamsCode";
import User from "./pages/User";
import Addcard from "./pages/Addcard";
import Redefinir from "./pages/Relembrar";
import Relembrar from "./pages/Relembrar";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ParamsCodeProvider>
        <ConfimCodeProvider>
          <LoginsProvider>
            <Routes>
              <Route path="/comprar/:paramscategoria" element={<Buy />}>
                {" "}
              </Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/produto/:id" element={<Product />}></Route>
              <Route
                path="/carrinho/:produtocomprado"
                element={<Cart />}
              ></Route>
              <Route path="/" element={<Login />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
              <Route path="/code" element={<Code />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/addcard" element={<Addcard />}></Route>
              <Route path="/relembrar" element={<Relembrar />}></Route>
            </Routes>
          </LoginsProvider>
        </ConfimCodeProvider>
      </ParamsCodeProvider>
    </BrowserRouter>
  );
}
export default AppRoutes;
