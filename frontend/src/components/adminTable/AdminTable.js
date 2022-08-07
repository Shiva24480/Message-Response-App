import React, { useEffect, useState } from 'react'
import { getAllResponse } from '../../api/api';
import './AdminTable.css'

function AdminTable() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleList = (data) => {
        setList(data);
    }

    const handleLoading = (status) => {
        setLoading(status);
    }

    useEffect(() => {
        getAllResponse(handleList, handleLoading);
    }, [])

    // useEffect(()=>{
    //     console.log(list,"list");
    // },[list])
    
    return (
        <div className='table'>
            <div className='table-heading'>
                <div className="heading">S-no.</div>
                <div className="heading">Name</div>
                <div className="heading">Response</div>
                <div className="heading">Email</div>
                <div className="heading">Mobile no.</div>
            </div>
            {
                loading? (<>
                    {'loading...'}
                </>):
                (
                    list.map((to, index) => (
                        <div className={`all-user ${index % 2 === 0 ? "" : "odd"}`} key={to._id}>
                            <div className="map">{index+1}</div>
                            <div className="map">{to.postedBy?.name}</div>
                            <div className="map">{to.content}</div>
                            <div className="map">{to.postedBy?.email}</div>
                            <div className="map">{to.postedBy?.mobile}</div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default AdminTable
