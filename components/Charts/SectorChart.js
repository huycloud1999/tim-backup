import React, { useLayoutEffect, useRef } from "react";
import Chart from 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import gsap from "gsap";
import { useEffect, useState } from "react";

const SectorChart = ({data : chartData})=>{

    const [offset,setOffset] = useState(()=>{
        var mediaQuery = window.matchMedia('(max-width: 768px)')
       
        if (mediaQuery.matches) {
                    return {
                        top: 24,
                        left:16
                    }
        } else  return {
            top: 70,
           left:147
       }
       
        
    })
    
    function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}
    const dataRaw =chartData.chart.body.map(value =>{
        return {
            data: value[2],
            color: value[1],
            label: value[0]
        }
    })
    const data = {
        labels:dataRaw.map(value =>value.label),
        datasets:[
            {
                data:dataRaw.map(value => value.data),
                backgroundColor:dataRaw.map(value => value.color),
                borderColor:'transparent',
                hoverBorderColor:'white',
                hoverBorderWidth:4,
      
            }
           
           
        ]
    }
    const chartSector = useRef()


    const options = {
     
        radius:180,
        aspectRatio: 1,
        cutout:"58%",
        responsive:true,
        maintainAspectRatio:false,

    
            onHover:function(element){
                if (element.chart.tooltip.dataPoints != undefined && element.chart.tooltip.dataPoints.length > 0){

                    var chartEl = element.chart.tooltip.dataPoints[0]; 
                    var index = element.chart.tooltip.dataPoints[0].dataIndex;
                    var valueItem = chartEl.dataset.data[index]
                    var labelItem = dataRaw[index].label;
                 
                    
                    
                    document.querySelector('.dot .label-item').innerText = labelItem;
                    
                }

              
            },
       
       
        plugins:{
           
             
              legend:{
                display:false
                   
              },
              tooltip:{
                // enabled: false,
                    yAlign:"bottom",
                    borderColor:"white",
                    borderWidth:1,
                    xPadding:18,
                    yPadding:8,
                    display:false,
                    displayColors:false,
                    backgroundColor:function (context){
                        if (context.tooltipItems.length !=0){

                            var index= context.tooltipItems[0].dataIndex;
                            var returnColor= context.tooltipItems[0].dataset.backgroundColor[index] 
                            return returnColor
                        }
                },
                bodyFont:{
                
                    size:12,
                    weight:400,
                    spacing:0.3
                }
              }
            }
       

    }


    useLayoutEffect(()=>{
        var mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            
           options.radius=80
           
           
    
        }

       
        
    })
    function hover(idx) {
        var c= chartSector.current;
        var meta = c.getDatasetMeta(0),
        rect = c.canvas.getBoundingClientRect(),
        point = meta.data[idx].tooltipPosition()
        // evt = new MouseEvent('click', {
        //     clientX: rect.left + point.x ,
        //     clientY: rect.top + point.y
        // }),
        // node = c.canvas;
        
       
        // node.dispatchEvent(evt);
        
        gsap.to('.dot',{
            left: point.x + offset.left ,
            top:  point.y + offset.top,
            ease:"power2.out",
            opacity:1
        })
    
        document.querySelector('.dot .label-item').innerText= dataRaw[idx].label + ": ";
        document.querySelector('.dot .value-item').innerText= dataRaw[idx].data;
        document.querySelector('.dot').style.opacity= 1
    
        document.querySelector('.dot').style.background= dataRaw[idx].color
    }
    
    function offHover(idx) {
        var c= chartSector.current;
        var meta = c.getDatasetMeta(0),
        rect = c.canvas.getBoundingClientRect(),
        point = meta.data[idx].tooltipPosition()
        gsap.to('.dot',{
            left: rect.left + c.clientWidth/2,
            top: rect.top,
            ease:"power2.out",
            opacity:0
        })
       
        
         
      }


   
    return(
        <>

  
        <div className="dot">
            {/* <span className="box-color"></span> */}
            <span className="label-item"></span>
            <span className="value-item"></span>
        </div>
        <div className="sector-chart-container">
        <div className="sector-chart">
            <Doughnut
                data={data}
                options={options}
                className="sector-location-chart"
                ref={chartSector}

            />
        </div>


            <div className="legend-area-chart">
                {dataRaw.map((value,index)=>{
                    return (
                        <div style={{cursor:'pointer'}} className="legend-item" key={index} 
                        onMouseOver={()=> {hover(index)}}  onMouseOut={()=> {offHover(index)}} >
                            <div className="color" style={{background: value.color}}></div>
                            <div className="label">{value.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default SectorChart