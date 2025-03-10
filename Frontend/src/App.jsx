import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import UserContext from "./context/UserContext";

function App() {
  return (
    <>
      <UserContext>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer autoClose={3000} position="bottom-right" />
      </UserContext>
    </>
  );
}

export default App;
