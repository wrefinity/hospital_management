import React from 'react'

const ProfileOverview = ({ user }) => {
    return (
        <div class="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 class="card-title">About</h5>
            <p class="small fst-italic">{user?.profile?.about}</p>

            <h5 class="card-title">Patient's Profile Details</h5>

            <div class="row">
                <div class="col-lg-3 col-md-4 label ">Full Name</div>
                <div class="col-lg-9 col-md-8">{user?.username}</div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-4 label">Email</div>
                <div class="col-lg-9 col-md-8">{user?.email}</div>
            </div>

            <div className='row'>

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
    )
}

export default ProfileOverview
