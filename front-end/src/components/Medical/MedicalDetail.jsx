import React from "react";


const MedicalDetail = ({ history }) => {

    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={history?.patient?.profile?.image} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{history?.patient?.name}</h5>
                        <p class="card-text"> Date Recorded {history?.diagnosisDate}</p>
                        <p class="card-text"> Condition: <br/> {history?.condition}</p>
                        <p class="card-text"> Treatment {history?.treatment}</p>
                        <p class="card-text"> Captured By: <br/>{history?.createdBy?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicalDetail
