import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthAction } from "./redux/auth/authAction";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/auth/authSlice";
// import "./App.css";
function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAuth);

  const fetchToken = async () => {
    try {
      await dispatch(AuthAction.validateAsyncThunk());
    } catch (e) {
      toast.error("Token expired, login again.");
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (isLoading) return null;

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <Outlet />
    </div>
  );
}

export default App;
