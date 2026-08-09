import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ==========================
// SUCCESS TOAST
// ==========================
export const notifySuccess = (message = "Success") => {
  // Remove existing toast first
  toast.dismiss();

  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// ==========================
// ERROR TOAST
// ==========================
export const notifyError = (message = "Something went wrong") => {
  toast.dismiss();

  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// ==========================
// TOAST CONTAINER
// ==========================
export const AppToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={1}
      theme="light"
    />
  );
};

export { ToastContainer };