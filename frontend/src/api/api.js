import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const apiRoutes = require('../api/apiRoutes');

const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

export const loginApi = async (email, name, mobile) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data } = await axios.post("http://localhost:5050/api/login", {
            email,
            mobile,
            name
        }, config
        );
        return data;
    } catch (error) {
        toast.error('Invalid details', toastStyle);
        return null;
    }
}

export const sendMessageResponse = async (newMessage, userId) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };
        const { data } = await axios.post(
            "http://localhost:5050/api/messages",
            {
                content: newMessage,
                userId: userId,
            },
            config
        );
        // console.log(data);
        return true
    } catch (error) {
        toast.error("Error Occured!", toastStyle);
        return false
    }
}

export const getAllResponse = async (handleList, handleLoading) => {
    try {
        handleLoading(true);
        const { data } = await axios.get("http://localhost:5050/api/messages");
        // console.log(data);
        handleList(data)
        handleLoading(false);
    } catch (error) {
        handleLoading(false);
        toast.error("Error Occured!", toastStyle);
    }
}