import React, { useState, useEffect } from 'react'
import './LeaveStatus.css'

function LeaveStatus() {
    const token = localStorage.getItem('siteToken')
    const employeeId = localStorage.getItem('siteId')
    const [leaveStatus, setLeaveStatus] = useState({});

    const ShowPopup = localStorage.getItem("showStaffLvStatusPopup");
    const [showStaffLvStatusPopup, setShowStaffLvRqPopup] = useState(ShowPopup === "true");

    const handleClick = () => {
        setShowStaffLvRqPopup(true);
        localStorage.setItem("showStaffLvStatusPopup", "true");
    };

    const closePopup = () => {
        setShowStaffLvRqPopup(false);
        localStorage.setItem("showStaffLvStatusPopup", "false");
    }

    useEffect(() => {
        fetch(`https://hrbe.eadevs.com/auth/leaves/employee/${employeeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log('fetchedhistory', data)
                setLeaveStatus(data);
            })
            .catch(error => console.error('error fetching details', error));

    }, [token, employeeId]);

    return (
        <div className="staff-status">
            <div className="staffLvStatus-button">
                <button onClick={handleClick}>Status</button>
            </div>
            {showStaffLvStatusPopup ?
                <div className="staffstatus-popup-bg">
                    <div className="staffLvStatus-popup-container">
                        <div className="closepopup">
                            <h2 onClick={closePopup}>X</h2>
                        </div>
                        <h3>Requested Leaves Status</h3>
                        <div className="status-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='col-1'>No</th>
                                        <th className='col-2'>Requested On</th>
                                        <th className='col-3'>Type</th>
                                        <th className='col-4'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {leaveStatus && leaveStatus.length > 0 ? (
                                leaveStatus.map((item, index) => 
                         (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.employee_name}</td>
                                        <td>Annual</td>
                                        <td>Pending</td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr >
                                        <td colSpan='4' className='no-data'>
                                        No data
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : ''
            }
        </div >
    )
}

export default LeaveStatus