import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import QueryStats from "@mui/icons-material/QueryStats";
import ContactPage  from "@mui/icons-material/ContactPage";
import School from "@mui/icons-material/School";
import Games from "@mui/icons-material/Games";
import Portrait from "@mui/icons-material/Portrait";
import ViewKanban from "@mui/icons-material/ViewKanban";
import Home  from "@mui/icons-material/Home";
import File from "../File/File";
import './styles/SinglePageApp.css'
import { setCoordinatesPages,setCoordinates,setOnTop, setRandomCoordinates, toggleMinimized } from "../../../redux";
import { setCoord } from "../../utils/RandomCoordinates";
import PortfolioCard from "../cards/PortfolioCard";
import { AppBar, Divider } from "@mui/material";
import DragItem from "../../utils/dragitems";
import { useTheme } from "@mui/material/styles";



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
  const [isMobile, setIsMobile] = useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()
  const appBarProperties = {
    mobile: {
      top: 'auto', 
      bottom: 0, 
      display: 'flex',
      flexDirection: 'row',
      height: '7%', 
      width: '100%',
    },
    other: { top: 'auto', 
      display: 'flex',
      flexDirection: 'row',
      bottom: 0, 
      height:45, 
      width: 1000, 
      left: 0, 
      right: 0, 
      margin: 'auto', 
      borderTopLeftRadius:2, 
      borderTopRightRadius:2,
      bckgroundColor: '#424242'}
  }
  const myref = useRef()
  let [alignX, alignY] = []

  
  const handleMouseAlign = (x, y) => {
    [alignX, alignY] = [x, y]
  }
  
  function handleHomeIcon(){
    for (const [key, value] of Object.entries(page)){
      if (value.openedWindow && !value.minimize){
        dispatch(toggleMinimized({Text:key}))
      }
    }
  }

const handleDragOver = (event) => {
    event.preventDefault();
    const severalOpenedWindowTest = Object.entries(page).filter((e) => e[1].openedWindow).length
    if (severalOpenedWindowTest > 1){
      dispatch(setOnTop({Text: event.dataTransfer.getData('text')}))
    }
    // DragItem(event, maxh, maxw,dispatch)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    DragItem(event, maxCoord.maxh, maxCoord.maxw, dispatch, alignX, alignY, setCoordinates, setCoordinatesPages)
  };


  useEffect(() =>{
    const [maxwidth, maxheight] = [myref.current.clientWidth, myref.current.clientHeight-100]
    setMaxCoord({maxh: maxheight, maxw: maxwidth})
    if (maxwidth <= 1280){
      setIsMobile(true)
    }else {
      dispatch(setRandomCoordinates({coordinates: setCoord(maxwidth, maxheight)}))
    }

  },[])

  
  return( 
  <div className="test" ref={myref} onDragOver={handleDragOver} onDrop={handleDrop}>
    {Object.entries(APPS).map((v, i) =>{
      return <File text={v[0]} key={i} x={!isMobile ? coord[v[0]].x : 'auto'} y={!isMobile ? coord[v[0]].y : 'auto'} >
        {v[1]}
      </File>
    })}
    {Object.entries(page).map((v,i) => {
      if(v[1].openedWindow){
        return <PortfolioCard text={v[0]} key={i+10} onDragMouseAlign={handleMouseAlign} mobile={isMobile}/>
      }
    })}

     <AppBar 
     position="fixed" 
     color="primary" 
     sx={isMobile ? appBarProperties.mobile : appBarProperties.other}>

        {isMobile ? 
        <div onTouchStart={handleHomeIcon} className="homebarMobile">
          <Home sx={{fontSize:35}}/>
          <Divider orientation="vertical" sx={{marginRight: '10px', bgcolor: theme.palette.primary.light, position:'absolute', right:0, left:'100%'}}/>
        </div> : null}

       <div className="iconPageOnBar">
         {page && Object.entries(page).map((v,i) => {
          if(v[1].openedWindow){
            const Icon = APPS[v[0]]
            return <div onClick={() => {dispatch(toggleMinimized({Text:v[0]}))}} 
                        key={i}
                        onTouchStart={() => {dispatch(setOnTop({Text:v[0]}))}}>
              {Icon}
            </div>
          }
        })}
       </div>
     </AppBar>
  </div>)
}
