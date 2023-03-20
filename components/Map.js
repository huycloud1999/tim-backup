import { useRef, useEffect, useState,useLayoutEffect } from "react";
import L from 'leaflet';

import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import marker from "../public/imgs/iconTIM.png"



const Map = ({data}) => {
  const locationMap = useRef(null);
  const [center,setCenter]=useState(()=>{
    var mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
        
         
          return [15, 105.804817]

        } else return [11, 105.804817]
  })
  const [zoom, setZoom] = useState(()=>{
    var mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
        
         
          return 5

        } else return 6
  })

  

const dataArr=data.vietnam.map(value => value.population)
const maxValue = Math.max(...dataArr)



  return (
    <MapContainer  center={center} zoom={zoom} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  />
  {
    data.sweden && data.sweden.map((value,index)=>{
    
        const indIcon = L.icon({
            iconUrl: data.swedenLocationIcon.mediaItemUrl,
            iconSize: [24,64],
            
        });
      return (
        <Marker key={index} position={[value.lattitude, value.longtitude]} icon={indIcon}>
            <Popup>
            {value.name}
            </Popup>
        </Marker>
      )  
    })
  }
  {
    data.vietnam && data.vietnam.map((value,index)=>{
     
        const indIcon = L.icon({
            iconUrl: data.vietnamLocationIcon.mediaItemUrl,
            iconSize: [value.population/maxValue*34,64],
            
        });
        
      return (
        <Marker key={index} position={[value.lattitude, value.longtitude]} icon={indIcon}>
            <Popup>
            {value.name}
            </Popup>
        </Marker>
      )  
    })
  }
  
    </MapContainer>
  )
};

export default Map;