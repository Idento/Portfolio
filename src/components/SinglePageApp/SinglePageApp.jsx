import React, { useEffect, useRef, useState } from "react";
import QueryStats from "@mui/icons-material/QueryStats";
import ContactPage  from "@mui/icons-material/ContactPage";
import School from "@mui/icons-material/School";
import Games from "@mui/icons-material/Games";
import Portrait from "@mui/icons-material/Portrait";
import ViewKanban from "@mui/icons-material/ViewKanban";
import File from "../File/File";
import './styles/SinglePageApp.css'


export default function SinglePageApp() {
  const [coord, setCoord] = useState(null)
  const myref = useRef()

  const APPS = {
  'Compétence': <QueryStats/>,
  'Contact': <ContactPage/>,
  'Parcours': <School/>,
  "Centre d'intérêt" : <Games/>,
  'Présentation': <Portrait/>,
  'Projets': <ViewKanban/>
}

const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const text = event.dataTransfer.getData('text');
    // Faites quelque chose avec l'élément glissé (id et name)
    console.log(`Element dropped: text - ${text}`);
    const transferredId = event.dataTransfer.getData('id');
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  };


  useEffect(() =>{
    const [maxwidth, maxheight] = [myref.current.clientWidth, myref.current.clientHeight-100]
    let settingcoord = [];
    for (let i = 0; i < Object.keys(APPS).length; i++){
      const coordinates = {x: Math.floor(Math.random() * maxwidth), y: Math.floor(Math.random() * maxheight)}
      console.log(settingcoord);
      settingcoord.push(coordinates)
    }
    setCoord(settingcoord)
  },[])

  
  return( 
  <div className="test" ref={myref} onDragOver={handleDragOver} onDrop={handleDrop}>
    {coord && Object.entries(APPS).map((v, i) =>{
      // let coordx = coord[i].x
      // let coordy = coord[i].y
      return <File text={v[0]} key={i} x={coord ? coord[i].x : 500} y={coord ? coord[i].y : 500}>
        {v[1]}
      </File>
    })}
    <div className="testdrop">test</div>
  </div>)
}
