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
import { setCoordinates, setCoordinatesPages, setRandomCoordinates } from "../../../redux";
import { setCoord } from "../../utils/RandomCoordinates";
import CompetenceCard from "../cards/CompetenceCard";
import PortfolioCard from "../cards/PortfolioCard";


export const APPS = {
  'Compétence': <QueryStats/>,
  'Contact': <ContactPage/>,
  'Parcours': <School/>,
  "Centre d'intérêt" : <Games/>,
  'Présentation': <Portrait/>,
  'Projets': <ViewKanban/>
}

export default function SinglePageApp() {
  const page = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const myref = useRef()

const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const text = event.dataTransfer.getData('text');
    const transferredPage = event.dataTransfer.getData('page')
    
    const mouseX = event.clientX - 50;
    const mouseY = event.clientY - 50;

    transferredPage !== 'true' ?
      dispatch(setCoordinates({dragText: text, x: mouseX, y:mouseY}))
      :
      dispatch(setCoordinatesPages({dragText: text, x: mouseX, y:mouseY}))

  };


  useEffect(() =>{
    const [maxwidth, maxheight] = [myref.current.clientWidth, myref.current.clientHeight-100]
    dispatch(setRandomCoordinates({coordinates: setCoord()}))
  },[])

  
  return( 
  <div className="test" ref={myref} onDragOver={handleDragOver} onDrop={handleDrop}>
    {Object.entries(APPS).map((v, i) =>{
      console.log(v);
      return <File text={v[0]} key={i}>
        {v[1]}
      </File>
    })}
  </div>)
}
