import React from "react";


const DeathDetail = ({ death }) => {

    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={death?.patient?.profile?.image} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{death?.patient?.name}</h5>
                        <p class="card-text"> Date of Death {death?.desc}</p>
                        <p class="card-text"> Place of Death {death?.placeOfDeath}</p>
                        <p class="card-text"> Reason for Death: <br/>{death?.reason}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeathDetail
