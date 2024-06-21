import React from "react";


const UserDetail = ({ user }) => {

    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={user?.profile?.image} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Address: {user?.profile?.address}</h5>
                        <p class="card-text"> About User: <br /> {user?.profile?.about} </p>
                        <p class="card-text"> Date of Birth: {new Date(user?.profile?.dateOfBirth).toLocaleDateString()}</p>
                        <p class="card-text"> Gender: <br />{user?.profile?.gender}</p>

                        {user?.profile?.medicalHistory && user?.profile?.medicalHistory.length > 0 && (
                            <div className="mt-3">
                                <h5 className="card-title text-bold">Medical History</h5>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Condition</th>
                                            <th>Diagnosis Date</th>
                                            <th>Treatment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user?.profile?.medicalHistory.map((history, index) => (
                                            <tr key={index}>
                                                <td>{history.condition}</td>
                                                <td>{new Date(history.diagnosisDate).toLocaleDateString()}</td>
                                                <td>{history.treatment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserDetail
