import { toast } from "react-toastify";
export const errorHandleToast = (error) => {
  if (error.response) {
    // Server responded with an error (e.g., 400 Bad Request)
    const serverMessage =
      error.response.data.message || "Something went wrong!";
    toast.error(serverMessage, {
      position: "top-right",
      autoClose: 3000,
    });
  } else {
    // Local error (e.g., no internet or validation error)
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
    });
  }
};
