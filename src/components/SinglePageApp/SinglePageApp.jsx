import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import QueryStats from "@mui/icons-material/QueryStats";
import ContactPage from "@mui/icons-material/ContactPage";
import School from "@mui/icons-material/School";
import Games from "@mui/icons-material/Games";
import Portrait from "@mui/icons-material/Portrait";
import ViewKanban from "@mui/icons-material/ViewKanban";
import Home from "@mui/icons-material/Home";
import File from "../File/File";
import './styles/SinglePageApp.css'
import { setCoordinatesPages, setCoordinates, setOnTop, setRandomCoordinates, toggleMinimized } from "../../../redux";
import { setCoord } from "../../utils/RandomCoordinates";
import PortfolioCard from "../cards/PortfolioCard";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import DragItem from "../../utils/dragitems";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";



export const APPS = {
  'Compétence': <QueryStats sx={{ fontSize: 40 }} />,
  'Contact': <ContactPage sx={{ fontSize: 40 }} />,
  'Parcours': <School sx={{ fontSize: 40 }} />,
  "Centre d'intérêt": <Games sx={{ fontSize: 40 }} />,
  'Présentation': <Portrait sx={{ fontSize: 40 }} />,
  'Projets': <ViewKanban sx={{ fontSize: 40 }} />
}

const appBarProperties = {
  mobile: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    height: '7%',
    width: '100%',
    position: 'fixed',
    zIndex: 10
  },
  other: {
    top: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '2%',
    bottom: 0,
    height: 50,
    width: 1000,
    left: 0,
    right: 0,
    margin: 'auto',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    bckgroundColor: '#424242',
    position: 'fixed'
  }
}
const buttonBarProperties = {
  mobile: {
    padding: '0',
    margin: '0',
    minWidth: '40px',
    maxWidth: '40px',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default function SinglePageApp() {
  const page = useSelector((state) => state.card)
  const coord = useSelector((state) => state.icon)
  const [maxCoord, setMaxCoord] = useState()
  const [isMobile, setIsMobile] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const myref = useRef()
  let [alignX, alignY] = []


  const handleMouseAlign = (x, y) => {
    [alignX, alignY] = [x, y]
  }




  function handleChangeBottomNav(event, newValue) {
    if (newValue === 'home') {
      for (const [key, value] of Object.entries(page)) {
        if (value.openedWindow && !value.minimize) {
          dispatch(toggleMinimized({ Text: key }))
        }
      }
    }
    if (isMobile && newValue !== 'home') {
      if (page[newValue].minimize) {
        dispatch(toggleMinimized({ Text: newValue }))
      }
      dispatch(setOnTop({ Text: newValue }))
    } else if (!isMobile) {
      dispatch(toggleMinimized({ Text: newValue }))
      dispatch(setOnTop({ Text: newValue }))
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation()
    // DragItem(event, maxh, maxw, dispatch)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    DragItem(event, maxCoord.maxh, maxCoord.maxw, dispatch, alignX, alignY, setCoordinates, setCoordinatesPages)
    if (event.dataTransfer.getData('page')) {
      const severalOpenedWindowTest = Object.entries(page).filter((e) => e[1].openedWindow).length
      if (severalOpenedWindowTest > 1) {
        dispatch(setOnTop({ Text: event.dataTransfer.getData('text') }))
      }
    }
  };


  function handleResize() {
    console.log('resize');
    setMaxCoord({
      maxh: window.innerHeight,
      maxw: window.innerWidth
    })
  }


  useEffect(() => {
    const [maxwidth, maxheight] = [window.innerWidth, window.innerHeight - 100]
    if (!maxCoord || maxCoord.maxh !== maxheight || maxCoord.maxw !== maxwidth) {
      setMaxCoord({ maxw: maxwidth, maxh: maxheight })
    }
    if (maxwidth <= 1280) {
      setIsMobile(true)
      Object.entries(page).map((v, i) => {
        if (v[1].openedWindow && !(v[1].position.x === 0 || v[1].position.y === 0)) {
          dispatch(setCoordinatesPages({ dragText: v[0], x: 0, y: 0 }))
        }
      })
    } else {
      setIsMobile(false)
      if (!maxCoord || maxCoord.maxw >= maxwidth - 100 || maxCoord.maxw <= maxwidth + 100) {
        console.log("test");
        dispatch(setRandomCoordinates({ coordinates: setCoord(maxwidth, maxheight) }))
      }
    }


    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  }, [maxCoord])


  return (
    <div className="maindiv" ref={myref} onDragOver={handleDragOver} onDrop={handleDrop}>
      {Object.entries(APPS).map((v, i) => {
        return <File text={v[0]} key={i} x={!isMobile ? coord[v[0]].x : 'auto'} y={!isMobile ? coord[v[0]].y : 'auto'} >
          {v[1]}
        </File>
      })}
      {Object.entries(page).map((v, i) => {
        if (v[1].openedWindow) {
          return <PortfolioCard text={v[0]} key={i + 10} onDragMouseAlign={handleMouseAlign} mobile={isMobile} maxwidth={maxCoord.maxw} />
        }
      })}

      <BottomNavigation
        sx={isMobile ? appBarProperties.mobile : appBarProperties.other}
        onChange={handleChangeBottomNav}
        showLabels={false}
        className="appbar">

        {isMobile ?
          <BottomNavigationAction
            showLabel={false}
            value={'home'}
            icon={<Home sx={{ fontSize: 40 }} />}
            sx={{ padding: 0, margin: 0, minHeight: '100%', minWidth: '50px', maxWidth: '50px' }} />
          : null}
        {page && Object.entries(page).map((v, i) => {
          if (v[1].openedWindow) {
            const Icon = APPS[v[0]]
            return <BottomNavigationAction
              showLabel={false}
              key={i}
              value={v[0]}
              icon={Icon}
              disableRipple
              sx={isMobile ? buttonBarProperties.mobile : {}} />
          }
        })}
      </BottomNavigation>
    </div>)
}
