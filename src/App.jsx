import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartContextProvider } from "./global_variables/CartContext";
import { QueryContextProvider } from "./global_variables/QueryContext";
import { AuthContextProvider } from "./global_variables/AuthContext";
import { Toaster } from "react-hot-toast";
import Menubar from "./components/Menubar/Menubar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import TermsConditions from "./pages/TermsConditions";
import Cart from "./pages/user_pages/Cart";
import Shipping from "./pages/Shipping";
import Products from "./pages/Products";
import IndividualProduct from "./pages/product_pages/IndividualProduct";
import RequireAuth from "./utils/RequireAuth";
import LoginPage from "./pages/user_pages/LoginPage";
import OrderFinished from "./pages/user_pages/OrderFinished";
import PersistLogin from "./utils/PersistLogin";
import Unauthorized from "./pages/Unauthorized";

const EditProfile = lazy(() => import("./pages/user_pages/EditProfile"));
const PrevOrders = lazy(() => import("./pages/user_pages/PrevOrders"));

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <QueryContextProvider>
          <Toaster
            containerStyle={{
              top: 100,
              left: 20,
              bottom: 0,
              // right: 20,
            }}
          />
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/product/:id" element={<IndividualProduct />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[2000]} />}>
                <Route
                  path="/accountSettings"
                  element={
                    <Suspense>
                      <EditProfile />
                    </Suspense>
                  }
                />
                <Route
                  path="/prevOrders"
                  element={
                    <Suspense>
                      <PrevOrders />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/orderFinished" element={<OrderFinished />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
          <Footer />
        </QueryContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
export default App;
