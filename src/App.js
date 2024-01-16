import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Customer from "./scenes/customer";
import Product from "./scenes/product";
import NewProduct from "./scenes/newProduct";
import EditProduct from "./scenes/editProduct/editProduct";
import Login from "./scenes/login/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // authenticate();
      setAuth(true);
    }
  }, [token, navigate]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {auth && (
            <>
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/customer" element={<Customer />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/product/new" element={<NewProduct />} />
                  <Route path="/product/edit/:id" element={<EditProduct />} />
                </Routes>
              </main>
            </>
          )}
          {!auth && (
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
