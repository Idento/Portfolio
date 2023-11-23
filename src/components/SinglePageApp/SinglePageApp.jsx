import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Alert, BottomNavigation, BottomNavigationAction, IconButton, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";



export const APPSICON = {
  'Compétence': <QueryStats sx={{ fontSize: 40 }} />,
  'Contact': <ContactPage sx={{ fontSize: 40 }} />,
  'Parcours': <School sx={{ fontSize: 40 }} />,
  "Centre d'intérêt": <Games sx={{ fontSize: 40 }} />,
  'Présentation': <Portrait sx={{ fontSize: 40 }} />,
  'Projets': <ViewKanban sx={{ fontSize: 40 }} />
}


export default function SinglePageApp() {
  const page = useSelector((state) => state.card)
  const coord = useSelector((state) => state.icon)
  const openedPage = useSelector((state) => state.allpage)
  const data = useSelector((state) => state.data)
  const [maxCoord, setMaxCoord] = useState()
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['page', 'text'],
    drop: (item, monitor) => {
      let { x, y } = monitor.getSourceClientOffset()
      const typ = monitor.getItemType()
      if (typ === 'page') {
        dispatch(setCoordinatesPages({ dragText: item.text, x: x, y: y }))
        dispatch(setOnTop({ Text: item.text }))
      } else if (typ === 'text') {

        dispatch(setCoordinates({ dragText: item.text, x: x, y: y }))
      }
    }
  }))

  const navigate = useNavigate()
  const theme = useTheme()
  let delay = 0


  const actionSnackBar = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        onClick={handleClose}
        onTouchStart={handleClose}>
      </IconButton>
    </>
  )

  function handleClose() {
    setOpen(false)
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
        dispatch(setRandomCoordinates({ coordinates: setCoord(maxwidth, maxheight) }))
      }
    }
    if (Object.keys(data).length === 0) {
      navigate('/')
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  }, [maxCoord])

  useEffect(() => {
    const sum = Object.values(openedPage).reduce((acc, currentValue) => acc + currentValue, 0);

    if (sum === 6) {
      setOpen(true);
    }
  }, [openedPage]);


  return (
    <div className="maindiv" ref={drop}>
      {Object.entries(APPSICON).map((v, i) => {
        delay += 500
        return <File text={v[0]} key={i} x={!isMobile ? coord[v[0]].x : 'auto'} y={!isMobile ? coord[v[0]].y : 'auto'} animdelay={delay}>
          {v[1]}
        </File>
      })
      }
      {Object.entries(page).map((v, i) => {
        if (v[1].openedWindow) {
          return <PortfolioCard text={v[0]} key={i + 10} mobile={isMobile} maxwidth={maxCoord && maxCoord.maxw} />
        }
      })}

      <BottomNavigation
        sx={{ backgroundColor: theme.palette.primary.main }}
        onChange={handleChangeBottomNav}
        showLabels={false}
        className="appbar">

        {isMobile ?
          <BottomNavigationAction
            showLabel={false}
            value={'home'}
            icon={<Home sx={{ fontSize: 35, color: 'white' }} />}
            sx={{ padding: 0, margin: 0, minHeight: '100%', minWidth: '50px', maxWidth: '50px' }} />
          : null}
        {page && Object.entries(page).map((v, i) => {
          if (v[1].openedWindow) {
            const Icon = APPSICON[v[0]]
            return <BottomNavigationAction
              className="navButton"
              showLabel={false}
              key={i}
              value={v[0]}
              icon={React.cloneElement(Icon, { sx: { color: 'white', fontSize: isMobile ? 30 : 40 } })}
              disableRipple
              sx={{ minWidth: isMobile ? "35px" : '70px', maxWidth: isMobile ? "35px" : '70px' }} />
          }
        })}
      </BottomNavigation>

      <Snackbar
        open={open}
        autoHideDuration={16000}
        onClose={handleClose}
        action={actionSnackBar}
      >
        <Alert onClose={handleClose} severity="success">
          "Merci d'avoir parcouru mon portfolio jusqu'au bout !"
        </Alert>
      </Snackbar>

    </div>)
}