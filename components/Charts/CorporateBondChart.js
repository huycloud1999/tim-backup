import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export const CorporateBondChart=({data:chartData})=>{
   

    const dataRaw=chartData.body.map((value,index)=>{
        return (
            {
                label:value[0],
                publicIssuance: value[2],
                privatePlacement:value[1]
            }
        )
    })

    const data={
        labels: dataRaw.map(value => value.label),
        datasets:[
            {
                data: dataRaw.map(value => value.privatePlacement),
                backgroundColor:"#0B2577",
                barThickness:35,
                label:chartData.header[1],
                type: 'bar',
                order:2,
                yAxisID: 'y',
            },
            {
                data: dataRaw.map(value => value.publicIssuance),
               
                // categoryPercentage:50,
                yAxisID: 'y3',
                label:chartData.header[2],
                type:'line',
                pointBackgroundColor:'#2F6CE9',
                borderColor:'transparent',
                pointRadius:6,
                order:1,
                
            },
           
        ]
    }
    const option={
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                position:'bottom',
                backgroundColor:'red',
                display:false,
                labels:{
             
                    generateLabels:(chart)=>{
                       
                        return chart.data.datasets.map((dataset, index)=>{
                  
                                return {
                                    text: dataset.label,
                                    fillStyle: dataset.pointBackgroundColor || dataset.backgroundColor,
                                    strokeStyle:'transparent',
                                }
                        })

                       
                    },
                 
                    color:'black',
                    font:{
                        
                        family:"Roboto",
                        size:16,
                        
                        
                    }
                }
            }
        },
        scales:{
            y3:{
                type:'linear',
                position:'right',
                grid:{
                    display:false
                },
                ticks:{
                    callback:function(val,index){
                       
                        if (index==0){
                            return '-'
                        } else return val.toFixed(1)
                    },
                    color:'black',
                    font:{
                        family:"Roboto",
                        size:14
                    }
                },
            },
            x:{
                stacked: true,
                grid:{
                    display:false
                },
                ticks:{
                    color:'black',
                    font:{
                        family:"Roboto",
                        size:14
                    }
                }
            },
            y:{
                grid:{
                    display:false
                },
                stacked: true,
                ticks:{
                    callback:function(val,index){
                       
                        if (index==0){
                            return '-'
                        } else return val
                    },
                    color:'black',
                    font:{
                        family:"Roboto",
                        size:14
                    }
                }
            }
        }
    }

    // const mediaQuery = window.matchMedia('(max-width: 768px)')
    
       
       

    // }
    useLayoutEffect(()=>{
        var mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            data.datasets[1].pointRadius= 3;
            data.datasets[0].barThickness= 6;
            option.scales.y.ticks.font.size=7
            option.scales.x.ticks.font.size=7
            option.scales.y.ticks.padding=0
            option.scales.x.ticks.padding=0
            option.scales.y3.ticks.font.size=7
            option.plugins.legend.labels.font.size=8
            
        
    }})

    return (
        <>
            <Bar

                data={data}
                options={option}
            />
        </>
    )
}
