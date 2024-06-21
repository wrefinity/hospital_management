import React from "react";


const TestDetail = ({ test }) => {

    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={test?.patient?.profile?.image} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{test?.patient?.name}</h5>
                        <p class="card-text"> Test Date {test?.testDate}</p>
                        <p class="card-text"> Test Conducted: <br/> {test?.testName}</p>
                        <p class="card-text"> Test Result: <br/> {test?.result}</p>
                        <p class="card-text"> Notes: <br/> {test?.notes}</p>
                        <p class="card-text"> Captured By: <br/>{test?.createdBy?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestDetail
