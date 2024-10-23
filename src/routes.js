import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/comprar" element={<Buy />}>
          {" "}
        </Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
