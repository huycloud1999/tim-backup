import React, { useEffect, useLayoutEffect } from "react";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export const SecurityChart = ({ data: dataChart }) => {

    function numberWithCommas(x, sym) {

        return x.match(/\d{1,3}(?=(\d{3})*$)/g).join(sym);
    }



    const dataRaw = dataChart.body.map(value => {
        return {
            label: value[0],
            // MonthlyNewAccountsOpened:value[1],
            totalSecurityAccounts: value[1]

        }
    })


    const data = {
        labels: dataRaw.map(value => value.label),
        datasets: [
            {
                data: dataRaw.map(value => value.totalSecurityAccounts),
                barThickness: 40,
                backgroundColor: "#000080",
                label: dataChart.caption
            },

        ]
    }

    const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: "bottom",
                labels: {
                    color: 'black',
                    font: {

                        family: "Roboto",
                        size: 16,


                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,

                },
                ticks: {
                    color: 'black',
                    font: {
                        family: "Roboto",
                        size: 14
                    }
                }

            },
            y: {
                grid: {
                    drawBorder: true,
                    display: false
                },
                ticks: {
                    callback: function (val, index) {
                        if (index == 0) {
                            return '-'
                        } else return numberWithCommas(val.toString(), ',')
                    },
                    color: 'black',
                    padding: 10,
                    font: {
                        family: "Roboto",
                        size: 14
                    }
                }
            }
        }
    }

    useLayoutEffect(() => {
        var mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            // data.datasets[1].barThickness= 2;
            data.datasets[0].barThickness = 6;
            option.scales.y.ticks.font.size = 7
            option.scales.x.ticks.font.size = 7
            option.scales.y.ticks.padding = 0
            option.scales.x.ticks.padding = 0
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