import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastMessage() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    ></ToastContainer>
  );
}

export default ToastMessage;
