import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export const PerformanceChart = ({ data: chartData }) => {

    const data = {
        labels: chartData.chart.body.map(value => value[0]),
        datasets: [
            {
                data: chartData.chart.body.map(value => value[1]),
                label: chartData.chart.header[1],
                fill: false,
                borderColor: "#2F6CE9",
                pointBackgroundColor: "#2F6CE9",
                borderWidth: 2,
                borderCapStyle: "round",
                hoverBorderWidth: 2,
                // pointHoverBackgroundColor:"rgba(6, 102, 235, 1)",
                pointHoverBorderColor: "white",
                pointStyle: "rectRot"
            },
            {
                data: chartData.chart.body.map(value => value[2]),
                label: chartData.chart.header[2],
                fill: false,
                borderColor: "#000080",
                pointBackgroundColor: "#000080",
                borderWidth: 2,
                borderCapStyle: "round",
                hoverBorderWidth: 2,
                pointHoverBorderColor: "white",
                pointStyle: "rectRot"
            },
        ]
    };
    function getOrCreateTooltip(context) {
        const { tooltip, chart } = context;
        const tooltipEl = chart.canvas.parentNode.querySelector('.tooltip-item')

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.classList.add('tooltip-item');

        } else { tooltipEl.innerHTML = ''; }
        const label = document.createElement('div');
        label.classList.add('label-tooltip');
        label.innerHTML = chart.tooltip.dataPoints[0].label
        tooltipEl.append(label);
        const ulBody = document.createElement('ul');
        ulBody.classList.add('ul-tooltip');
        tooltipEl.append(ulBody)
        chart.tooltip.dataPoints.forEach(element => {
            const liEl = document.createElement('li');
            liEl.classList.add('data-item');
            const labelData = document.createElement('span');
            labelData.classList.add('data-label');
            labelData.innerHTML = element.dataset.label + ": ";
            labelData.style.color = element.dataset.borderColor;
            const valueData = document.createElement('span');
            valueData.classList.add('data-value');
            valueData.innerText = element.raw;

            liEl.append(labelData)
            liEl.append(valueData)
            ulBody.append(liEl)
        });

        const { x: positionX, y: positionY } = tooltip;

        // Display, position, and set styles for font


        chart.canvas.parentNode.append(tooltipEl)

        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.opacity = 1;


        tooltipEl.style.left = positionX + 'px';
        tooltipEl.style.top = positionY - 0 + 'px';



        return tooltipEl
    };
    function customToolTip(context) {
        const { tooltip } = context;
        const tooltipEl = getOrCreateTooltip(context);

        tooltipEl.style.transitionDuration = '2s';

        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return
        }

    }
    const option = {

        radius: 3,
        hitRadius: 30,
        hoverRadius: 10,
        maintainAspectRatio: false,
        responsive: true,
        hover: {
            // mode:"dataset",

        },
        plugins: {

            legend: {
                position: 'bottom',
                labels: {
                    color: "black",
                    font: {
                        size: 16,
                        family: "Roboto",
                        weight: 700
                    }
                }
            },
            tooltip: {
                enabled: false,

                position: 'nearest',
                external: customToolTip,


            }

        },
        scales: {
            y: {
                ticks: {

                    font: {
                        size: 16,
                        family: "Roboto"

                    },
                    color: 'black',
                    padding: 10



                },

                grid: {
                    borderWidth: 1,
                    color: "#B5B4A9",
                    drawBorder: false

                },


            },
            x: {

                grid: {
                    display: false,

                },
                ticks: {
                    //   display:false,
                    font: {
                        size: 14,
                        family: "Roboto"

                    },
                    color: 'black',
                    padding: 10

                }
            }
        }
    }
    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            data.datasets[1].barThickness = 2;
            data.datasets[0].barThickness = 2;
            option.scales.y.ticks.font.size = 7
            option.scales.x.ticks.font.size = 7
            option.scales.y.ticks.padding = 0
            option.scales.x.ticks.padding = 0
            option.plugins.legend.labels.font.size = 8



        }

    })

    return (
        <>

            <Line
                data={data}
                options={option}


            />
        </>

    )
}