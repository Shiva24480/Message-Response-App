import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState(undefined);

    const toastStyle = {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name,email,mobile);
        if (!email || !name || !mobile) {
            toast.error("Please fill all the field", toastStyle);
            return;
        }

        if (!mobile.match(/^[0-9]+$/) || mobile.length !== 10) {
            toast.error("Enter a valid mobile number", toastStyle);
            return;
        }

        const data = await loginApi(email, name, mobile);
        if (data) {
            localStorage.setItem('task-app-user', JSON.stringify(data));
            navigate("/home")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("task-app-user")) {
            navigate("/home");
        }
    }, [])

    return (
        <div className='login'>
            <div className="login-container">
                <h1>LOGIN</h1>
                <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                {/* <div className='mobile-input-container'> */}
                {/* <PhoneIcon className='mobile-icon' /> */}
                <input type="text" placeholder='Mobile Number' onChange={(e) => setMobile(e.target.value)} />
                {/* </div> */}
                <button className='login-button' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default LoginPage
