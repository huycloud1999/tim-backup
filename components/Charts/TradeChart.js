import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export const TradeChart = ({ data: tradeChartData }) => {


    var labels = tradeChartData.body.map(value => value[0])
    const events = tradeChartData.body.map(value => value[3])

    const data = {
        labels: labels,
        datasets: [
            {
                data: tradeChartData.body.map(value => parseFloat(value[2])),
                type: "line",
                label: tradeChartData.header[2],
                borderColor: '#2F6CE9',
                pointBorderColor: "transparent",
                pointBackgroundColor: "#75D0C8",
                hoverTooltip: "#75D0C8",
                yAxisID: 'y1',

            },
            {
                data: tradeChartData.body.map(value => parseFloat(value[1])),
                type: "bar",
                label: tradeChartData.header[1],
                backgroundColor: "#000080",
                barThickness: 15,
                hoverTooltip: "#000080",
                yAxisID: 'y',
            }
        ]
    }

    const option = {
        radius: 0,
        hoverRadius: 6,
        hitRadius: 10,
        responsive: true,
        maintainAspectRatio: false,

        // interaction:{
        //     mode:"index"
        // },
        plugins: {
            legend: {
                position: "bottom",
                display: false,
                labels: {
                    generateLabels: function (chart) {
                        return chart.data.datasets.map((dataset, index) => {
                            return {
                                text: dataset.label,
                                fillStyle: dataset.borderColor || dataset.backgroundColor,
                                strokeStyle: 'transparent',
                            }
                        })
                    },


                    color: 'black',
                    font: {

                        family: "Roboto",
                        size: 16,
                    }
                }

            },
            tooltip: {
                backgroundColor: function (context) {
                    if (context.tooltipItems.length != 0) {
                        return context.tooltipItems[0].dataset.hoverTooltip
                    }
                },
                displayColors: false,
                callbacks: {
                    title: function (context) {
                        return ""
                    },
                    label: function (context) {

                        if (context.datasetIndex == 0) {

                            return events[context.dataIndex]
                        } else return context.raw
                    }
                },
                bodyFont: {
                    family: 'Roboto',
                    size: 12
                },
                titleFont: {
                    family: 'Roboto',
                },
                borderColor: "white",
                borderWidth: 1
            }
        },
        scales: {
            y: {
                grid: {
                    display: false

                },
                ticks: {
                    callback: function (val, index) {
                        if (index == 0) {
                            return '-'
                        } else return val
                    },
                    color: 'black',
                    font: {
                        size: 14,
                        family: "Roboto"
                    },
                    padding: 10
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                grid: {
                    display: false,

                },
                ticks: {
                    callback: function (val, index) {
                        if (index == 0) {
                            return '-'
                        } else return val
                    },
                    color: 'black',
                    font: {
                        size: 14,
                        family: "Roboto"
                    },
                },
            },
            x: {
                grid: {
                    display: false

                },
                ticks: {
                    callback: function (index) {
                        if (index % 4 == 0 || index == 0 || (index == labels.length - 1)) {

                            return labels[index]
                        } else {
                            return
                        }


                    },
                    color: 'black',

                    font: {
                        size: 14,
                        family: "Roboto"
                    },
                    padding: 10
                }
            }
        }
    }

    useLayoutEffect(() => {
        var mediaQuery = window.matchMedia('(max-width: 768px)')

        if (mediaQuery.matches) {

            data.datasets[1].barThickness = 2;
            data.datasets[0].borderWidth = 1.4;
            option.scales.y.ticks.font.size = 7
            option.scales.x.ticks.font.size = 7
            option.scales.y1.ticks.font.size = 7
            option.scales.y.ticks.padding = 0
            option.scales.x.ticks.padding = 0
            // option.radius = 2
            option.plugins.tooltip.bodyFont.size = 10
            option.plugins.legend.labels.font.size = 8


        }

    })


    return (
        <>
            <Bar
                data={data}
                options={option}

            />
        </>
    )
}