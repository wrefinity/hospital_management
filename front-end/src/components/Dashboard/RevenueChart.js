import React from 'react'
import Chart from "react-apexcharts";

const RevenueChart = ({ revenueData }) => {

    // Ensure revenueData is an array
    const safeRevenueData = Array.isArray(revenueData) ? revenueData : [];

    console.log(safeRevenueData);
    // Prepare data for the chart
    const categories = Array.from(safeRevenueData).map(item => `${item?._id?.year}-${String(item?._id?.month).padStart(2, '0')}`);
    const seriesData = Array.from(safeRevenueData).map(item => item.totalRevenue);


    const options = {
        chart: {
            id: "basic-bar",
            height: 500,
            type: 'line',
            zoom: {
                enabled: true
            },
            animations: {
                enabled: true
            }
        },
        stroke: {
            width: [5, 5, 4],
            curve: 'smooth'
        },
        title: {
            text: 'Total Revenue Over Time',
            align: 'center'
          },
        markers: {
            size: 1,
            hover: {
                sizeOffset: 6
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            },
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Year-Month'
            }
        },
        yaxis: {
            title: {
                text: 'Total Revenue'
            }
        },
    }
    const series = [
        {
            name: 'Total Revenue',
            data: seriesData
        }
    ]

    return (
      
            <section className="vh-auto my-2" style={{ backgroundColor: '#eff2f4 ' }}>

                <div className="row py-5 d-flex justify-content-center align-items-center ">
                    <div className=" col-md-6">
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="500"
                        />
                    </div>

                    <div className="col-md-6">
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="500"
                        />
                    </div>
                </div>

            </section>
        

    )
}

export default RevenueChart
