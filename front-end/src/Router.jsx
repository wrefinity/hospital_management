import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";
import Dashboard from "./views/Dashboard";
import Layout from "./components/Layout";
import LoginScreen from "./views/LoginScreen";
import SignupScreen from "./views/SignupScreen";
import NotFoundPage from "./views/NotFoundPage";
import Profile from "./views/Profile";
import Sales from "./views/Sales";
import ProductList from "./views/Products/ProductList";
import ProductAdd from "./views/Products/ProductAdd";
import ProductEdit from "./views/Products/ProductEdit";
import Category from "./views/Category/Category";
import Products from "./views/Products/Products";
import ProductInfo from "./views/Products/ProductInfo";
import DeathEdit from "./views/Deaths/DeathEdit";
import DeathAdd from "./views/Deaths/DeathAdd";
import DeathList from "./views/Deaths/DeathList";
import MedicalList from "./views/Medical/MedicalList";
import MedicalAdd from "./views/Medical/MedicalAdd";
import MedicalEdit from "./views/Medical/MedicalEdit";
import TestAdd from "./views/Test/TestAdd";
import TestEdit from "./views/Test/TestEdit";
import TestList from "./views/Test/TestList";
import UserAdd from "./views/Users/UserAdd";
import UserEdit from "./views/Users/UserEdit";
import UserList from "./views/Users/UserList";
import UserInfo from "./views/Users/UserInfo";


const Router = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LoginScreen/>} exact />
          <Route path="/dashboard" element={<Dashboard/>} exact />
          <Route
            path="/login"
            element={
              <PreventMultipleLogin>
                <LoginScreen />
              </PreventMultipleLogin>
            }
          />
          <Route path="/register" element={<SignupScreen />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sales" element={<Sales />} />
          {/* products routes  */}
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/products/product-detail/:id" element={<ProductInfo />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product-add" element={<ProductAdd />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />
          <Route path="/categories" element={<Category/>} />

          {/* deaths routes  */}
          <Route path="/death-add/:patientId" element={<DeathAdd />} />
          <Route path="/death-edit/:patientId/:id" element={<DeathEdit />} />
          <Route path="/death-list" element={<DeathList />} />
          {/* medical routes  */}
          <Route path="/history-add/:patientId" element={<MedicalAdd />} />
          <Route path="/history-edit/:patientId/:id" element={<MedicalEdit />} />
          <Route path="/history-list" element={<MedicalList />} />
          
          {/* test routes  */}
          <Route path="/test-add/:patientId" element={<TestAdd />} />
          <Route path="/test-edit/:patientId/:id" element={<TestEdit />} />
          <Route path="/test-list" element={<TestList />} />
          
          {/* user routes  */}
          <Route path="/user-add" element={<UserAdd />} />
          <Route path="/user-edit/:id" element={<UserEdit />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/user-info/:id" element={<UserInfo />} />

          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

// const ProtectUserRoute = ({ children }) => {
//   const [cookies] = useCookies();
//   const user = cookies.user;
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// const ProtectAdminRoute = ({ children }) => {
//   const [cookies] = useCookies();
//   const user = cookies.user;
//   if (!user) {
//     return <Navigate to="/" replace />;
//   } else if (!user.isAdmin) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

const PreventMultipleLogin = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return children;
  }
};

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};

export default Router;