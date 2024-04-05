import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';

const showSuccessNotification = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
    });
};

export{showSuccessNotification} 