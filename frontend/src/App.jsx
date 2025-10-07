import { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { toast, ToastContainer } from "react-toastify";
import { fetchAccount } from "./services/api";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [stage, setStage] = useState("login");
  const [loading, setLoading] = useState(true);
  const { setAuthState, setIsAuthenticated } = useContext(AuthContext);
  const login_status = localStorage.getItem("login_status")
    ? JSON.parse(localStorage.getItem("login_status"))
    : 1;

  if (login_status == 1) {
    localStorage.setItem("login_status", JSON.stringify(1));
  }

  useEffect(() => {
    const handleFetchAccount = async () => {
      try {
        const res = await fetchAccount();
        if (!res.success) {
          return toast.error(res.msg);
        }
        setAuthState(res.data);
        setIsAuthenticated(true);
        setStage("dashboard");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (login_status == 0) {
      handleFetchAccount();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {!loading && login_status == 1 && (
        <>
          {stage == "login" && <Login setStage={setStage} />}
          {stage == "register" && <Register setStage={setStage} />}
        </>
      )}

      {!loading && login_status == 0 && stage == "dashboard" && (
        <Dashboard setStage={setStage} />
      )}

      {loading && (
        <>
          <span className="loading loading-dots loading-xs"></span>
          <span className="loading loading-dots loading-sm"></span>
          <span className="loading loading-dots loading-md"></span>
          <span className="loading loading-dots loading-lg"></span>
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
