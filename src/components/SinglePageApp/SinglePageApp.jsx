import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import QueryStats from "@mui/icons-material/QueryStats";
import ContactPage  from "@mui/icons-material/ContactPage";
import School from "@mui/icons-material/School";
import Games from "@mui/icons-material/Games";
import Portrait from "@mui/icons-material/Portrait";
import ViewKanban from "@mui/icons-material/ViewKanban";
import File from "../File/File";
import './styles/SinglePageApp.css'
import { setOnTop, setRandomCoordinates } from "../../../redux";
import { setCoord } from "../../utils/RandomCoordinates";
import PortfolioCard from "../cards/PortfolioCard";
import { AppBar } from "@mui/material";
import DragItem from "../../utils/dragitems";


export const APPS = {
  'Compétence': <QueryStats sx={{fontSize:40}}/>,
  'Contact': <ContactPage sx={{fontSize:40}}/>,
  'Parcours': <School sx={{fontSize:40}}/>,
  "Centre d'intérêt" : <Games sx={{fontSize:40}}/>,
  'Présentation': <Portrait sx={{fontSize:40}}/>,
  'Projets': <ViewKanban sx={{fontSize:40}}/>
}

export default function SinglePageApp() {
  const page = useSelector((state) => state.card)
  const coord = useSelector((state)=> state.icon)
  const [maxCoord, setMaxCoord] =  useState()
  const dispatch = useDispatch()
  const myref = useRef()
  let [alignX, alignY] = []
  
  const handleMouseAlign = (x, y) => {
    return [alignX, alignY] = [x, y]
  }

const handleDragOver = (event) => {
    event.preventDefault();
    dispatch(setOnTop({Text: event.dataTransfer.getData('text')}))
    // DragItem(event, maxh, maxw,dispatch)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    DragItem(event, maxCoord.maxh, maxCoord.maxw, dispatch, alignX, alignY)
  };


  useEffect(() =>{
    const [maxwidth, maxheight] = [myref.current.clientWidth, myref.current.clientHeight-100]
    setMaxCoord({maxh: maxheight, maxw: maxwidth})
    dispatch(setRandomCoordinates({coordinates: setCoord(maxwidth, maxheight)}))
  },[])

  
  return( 
  <div className="test" ref={myref} onDragOver={handleDragOver} onDrop={handleDrop}>
    {Object.entries(APPS).map((v, i) =>{
      return <File text={v[0]} key={i} x={coord[v[0]].x} y={coord[v[0]].y}>
        {v[1]}
      </File>
    })}
    {Object.entries(page).map((v,i) => {
      if(v[1].openedWindow){
        return <PortfolioCard text={v[0]} key={i} onDragMouseAlign={handleMouseAlign}/>
      }
    })}

     <AppBar 
     position="fixed" 
     color="primary" 
     sx={{ top: 'auto', 
      display: 'flex',
      flexDirection: 'row',
      bottom: 0, 
      height:40, 
      width: 1000, 
      left: 0, 
      right: 0, 
      margin: 'auto', 
      borderTopLeftRadius:2, 
      borderTopRightRadius:2 }}>
      
        {page && Object.entries(page).map((v,i) => {
          if(v[1].openedWindow){
            const Icon = APPS[v[0]]
            return Icon
          }
        })}
     </AppBar>
  </div>)
}
