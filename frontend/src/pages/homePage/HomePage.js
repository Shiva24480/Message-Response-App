import React, { useEffect, useState } from 'react'
import './HomePage.css'
import Navbar from '../../components/navbar/Navbar'
import { sendMessageResponse } from '../../api/api';
import AdminTable from '../../components/adminTable/AdminTable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../context/UserProvider';

function HomePage() {
  const navigate = useNavigate();
  const { user } = UserState();
  const [response, setResponse] = useState("");
  const [admin, setAdmin] = useState(false);

  const sendMessage = async () => {
    if (user) {
      if (!response) {
        toast.error("Enter a message to send", toastStyle);
        return;
      }
      const status = await sendMessageResponse(response, user._id);
      if (status) {
        localStorage.removeItem("task-app-user");
        localStorage.removeItem('timer');
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    if (user) {
      // console.log(user);
      if (user.name === "admin" && user.email === "admin@admin.com") {
        setAdmin(true);
      }
    }
  }, [user]);


  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  return (
    <>
      <Navbar />
      {
        !admin ?
          (<div className="home-container">
            <textarea onChange={(e) => setResponse(e.target.value)} value={response} className='textarea' placeholder='Enter Your Response Here'></textarea>
            <button onClick={sendMessage} className='home-submit-btn'>Submit Response</button>
          </div>) :
          (<AdminTable />)
      }
    </>
  )
}

export default HomePage