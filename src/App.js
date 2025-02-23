import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.min.css";
import AppRouters from "./routers/AppRouters";
function App() {
  return (
    <>
      <div style={{ backgroundColor: "#f2f4f7", minHeight: "100vh" }}>
        <Router>
          {/* <marquee>Welcome to my personal project (❁´◡`❁)</marquee> */}
          <AppRouters />
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
