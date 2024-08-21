import toast, { Toaster } from "react-hot-toast";

export const notifysuccess = () =>
  toast.success("Successfully Sign In!", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
export const NotifyEroorServer = () => {
  toast.error("This didn't work.", {
    style: {
      borderRadius: "20px",
      background: "#333",
      color: "#fff",
    },
  });
};
export const NotifyEroorEmail = () => {
  toast.error("This Email Is Existing Before", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
export const NotifyEroorEmailSignIn = () => {
  toast.error("This Email Is Not Existing ", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
export const NotifyEroorPasswordSignIn = () => {
  toast.error("This Password Is Not Correct ", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
export const toastId = () => {
  toast.loading("Loading...", {});
};

// export const toastId = toast.loading("Loading...");
export const dismis = () => {
  toast.dismiss();
};

export const Toster: JSX.Element = (
  <Toaster position="top-center" reverseOrder={false} />
);
