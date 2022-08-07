import React, { useState, useEffect } from 'react';
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
import { UserState } from '../../context/UserProvider';

function Navbar() {
    const navigate = useNavigate();
    const [time, setTime] = useState(600);
    const [min, setMin] = useState(10);
    const [sec, setSec] = useState(0);

    const { user } = UserState();


    const handleLogout = () => {
        if (user) {
            localStorage.removeItem("task-app-user");
            localStorage.removeItem('timer');
            navigate('/login');
        }
    }

    const handleRemainingTime = (time) => {
        let totalTime = time;
        setTime(totalTime);
    }

    const addTimerValue = () => {
        if (localStorage.getItem('timer')) {
            let timer = parseInt(localStorage.getItem('timer'));
            if (timer <= 0) {
                localStorage.removeItem('timer');
                localStorage.removeItem('task-app-user');
                navigate("/login");
            } else {
                timer -= 5;
                localStorage.setItem('timer', timer);
                handleRemainingTime(timer);
                setMin(Math.floor(timer/60))
                setSec( timer%60)
            }
        } else {
            localStorage.setItem('timer', 600);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            addTimerValue();
        }, 5000);

        return () => { clearInterval(interval) }
    },[])


    return (
        <nav className='show'>
            <div className="container">
                <div className="nav-logo">{user ? user.name : "guest"}</div>
                <div className='nav-timer'>Logout In : {min < 10 ? `0${min}`: min}:{sec < 10 ? `0${sec}`: sec} min</div>
                <div className='nav-logout' onClick={handleLogout}>Logout</div>
            </div>
        </nav>
    );
}


export default Navbar