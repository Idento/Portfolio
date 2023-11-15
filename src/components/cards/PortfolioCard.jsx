import React, { useEffect, useRef, useState } from 'react'
import CompetenceCard from './CompetenceCard'
import ContactCard from './ContactCard'
import ParcoursCard from './ParcoursCard'
import PassionCard from './PassionCard'
import PresentationCard from './PresentationCard'
import ProjetsCard from './ProjetsCard'
import { ButtonGroup, Card, IconButton } from '@mui/material'
import { APPS } from '../SinglePageApp/SinglePageApp'
import { Close, Minimize } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setOnTop, setToggleWindow, setZIndex, toggleMinimized, setCoordinatesPages } from "../../../redux";
import './styles/CardStyle.css'
import { useTheme } from '@emotion/react'

export default function PortfolioCard({ text, onDragMouseAlign, mobile = false }) {
  const [isDragging, setIsDragging] = useState(false);
  const nameCard = useSelector((state) => state.card)
  const theme = useTheme()
  const dispatch = useDispatch()
  const dragRef = useRef(null)

  const APPSCARD = {
    'Compétence': <CompetenceCard />,
    'Contact': <ContactCard />,
    'Parcours': <ParcoursCard />,
    "Centre d'intérêt": <PassionCard />,
    'Présentation': <PresentationCard />,
    'Projets': <ProjetsCard />
  }

  useEffect(() => {
    if (mobile) {
      dispatch(setCoordinatesPages({ dragText: text, x: 0, y: 0 }))
    }
    dispatch(setZIndex({ Text: text }))
  }, [])

  const handleDragStart = (event) => {
    setIsDragging(true);
    const { top, left } = event.target.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;
    onDragMouseAlign(mouseX, mouseY)
    event.dataTransfer.setData('text', text);
    event.dataTransfer.setData('page', true);
    const severalOpenedWindowTest = Object.entries(nameCard).filter((e) => e.openedWindow).length
    if (severalOpenedWindowTest > 1) {
      dispatch(setOnTop({ Text: text }))
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  function handleCloseClick(e) {
    e.preventDefault()
    dispatch(setToggleWindow({ Text: text }))
  }

  function handleClick(e) {
    e.preventDefault()
    const severalOpenedWindowTest = Object.entries(nameCard).filter((e) => e[1].openedWindow).length
    if (severalOpenedWindowTest > 1) {
      dispatch(setOnTop({ Text: text }))
    }
  }

  return (
    <div className={`portfolioCard ${nameCard[text].minimize ? 'minimize' : 'up'}`}
      ref={dragRef}
      style={{ top: nameCard[text].position.y, left: nameCard[text].position.x, zIndex: nameCard[text].zindex }}
    >
      <Card elevation={nameCard[text].zindex} sx={{ color: theme.palette.primary.light }}>
        <div
          position='relative'
          className='pageBar'
          draggable='true'
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleClick}>
          <div className='pageTitle'>
            {text && React.cloneElement(APPS[text], { sx: { fontsize: 20 } })}
            {text && text}
          </div>
          <ButtonGroup variant='text' aria-label="text button group" >
            <IconButton aria-label='minimize' onClick={() => { dispatch(toggleMinimized({ Text: text })) }}>
              <Minimize sx={{ color: 'white' }} />
            </IconButton>
            <IconButton aria-label='close' onClick={handleCloseClick}>
              <Close sx={{ color: 'white' }} />
            </IconButton>
          </ButtonGroup>
        </div>
        {APPSCARD && (APPSCARD[text])}
      </Card>
    </div>
  )
}
