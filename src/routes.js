import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

import LoginsProvider from './contexts/SignalLogins';
import Code from './pages/Code';
import ConfimCodeProvider from './contexts/ConfirmCode';
import ParamsCodeProvider from './contexts/ParameterUtils';
import User from './pages/User';
import Addcard from './pages/Addcard';

import PassCodeVerification from './pages/PassCodeVerification';
import SendEmailVerification from './pages/SendEmailVerification';
import Redefinir from './pages/Redefinir';

import SegurityPasswordProvider from './contexts/SegurityPassword';
import ListProductsProvider from './contexts/MockProdutos';
import ParameterUtilsProvider from './contexts/ParameterUtils';

function AppRoutes() {
  return (
    <BrowserRouter>
      <SegurityPasswordProvider>
        <ListProductsProvider>
          <ParameterUtilsProvider>
            <ConfimCodeProvider>
              <LoginsProvider>
                <Routes>
                  <Route path="/comprar/:paramscategoria" element={<Buy />}>
                    {' '}
                  </Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/produto/:id" element={<Product />}></Route>
                  <Route
                    path="/carrinho/:productPurchased"
                    element={<Cart />}
                  ></Route>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="*" element={<PageNotFound />}></Route>
                  <Route path="/code" element={<Code />}></Route>
                  <Route path="/user" element={<User />}></Route>
                  <Route path="/addcard" element={<Addcard />}></Route>
                  <Route
                    path="/codeverification/:status"
                    element={<PassCodeVerification />}
                  ></Route>
                  <Route
                    path="/emailverification"
                    element={<SendEmailVerification />}
                  ></Route>
                  <Route path="/redefinirpass" element={<Redefinir />}></Route>
                </Routes>
              </LoginsProvider>
            </ConfimCodeProvider>
          </ParameterUtilsProvider>
        </ListProductsProvider>
      </SegurityPasswordProvider>
    </BrowserRouter>
  );
}
export default AppRoutes;
