import './styles/CardStyle.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MemoizedCompetenceCard } from './CompetenceCard'
import { MemoizedContactCard } from './ContactCard'
import { MemoizedParcoursCard } from './ParcoursCard'
import { MemoizedPassionCard } from './PassionCard'
import { MemoizedPresentationCard } from './PresentationCard'
import { MemoizedProjectCard } from './ProjetsCard'
import { ButtonGroup, Card, IconButton } from '@mui/material'
import { APPSICON } from '../SinglePageApp/SinglePageApp'
import { Close, Minimize } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setOnTop, setToggleWindow, setZIndex, toggleMinimized, setCoordinatesPages } from "../../../redux";
import { useTheme } from '@emotion/react'
import { useDrag } from 'react-dnd'

export default function PortfolioCard({ text, onDragMouseAlign, mobile = false, maxwidth, onmoove }) {
  // const [isDragging, setIsDragging] = useState(false);
  const nameCard = useSelector((state) => state.card)
  const [maxw, setMaxW] = useState({})
  const { x, y } = onmoove ? onmoove : { x: nameCard[text].position.x, y: nameCard[text].position.y }
  const theme = useTheme()
  const dispatch = useDispatch()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'page',
    item: { text },
    options: { dropEffect: 'move' }
  }))


  const APPSCARD = {
    'Compétence': <MemoizedCompetenceCard />,
    'Contact': <MemoizedContactCard />,
    'Parcours': <MemoizedParcoursCard />,
    "Centre d'intérêt": <MemoizedPassionCard />,
    'Présentation': <MemoizedPresentationCard />,
    'Projets': <MemoizedProjectCard />
  }

  useEffect(() => {
    if (mobile) {
      dispatch(setCoordinatesPages({ dragText: text, x: 0, y: 0 }))
      setMaxW(maxwidth)
    }
    dispatch(setZIndex({ Text: text }))
  }, [])

  // const handleDragStart = (event) => {
  //   const { top, left } = event.target.getBoundingClientRect();
  //   const mouseX = event.clientX - left;
  //   const mouseY = event.clientY - top;
  //   setIsDragging(true);
  //   onDragMouseAlign(mouseX, mouseY)
  //   event.dataTransfer.setData('text', text);
  //   event.dataTransfer.setData('page', true);
  //   const severalOpenedWindowTest = Object.entries(nameCard).filter((e) => e.openedWindow).length
  //   if (severalOpenedWindowTest > 1) {
  //     dispatch(setOnTop({ Text: text }))
  //   }
  // };

  const Minimized = useCallback(() => {
    dispatch(toggleMinimized({ Text: text }))
  })

  // const handleDragEnd = () => {
  //   setIsDragging(false);
  // };

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
      style={{
        top: !isDragging ? nameCard[text].position.y : y,
        left: !isDragging ? nameCard[text].position.x : x,
        zIndex: nameCard[text].zindex
      }}
    >
      {!isDragging ? console.log('moving') : null}
      <Card elevation={mobile ? 0 : nameCard[text].zindex} sx={{ color: theme.palette.primary.light, minWidth: "100%", minHeight: '100%', borderRadius: mobile ? 0 : 4 }}>
        <div
          position='relative'
          className='pageBar'
          draggable='true'
          onClick={handleClick}
          ref={drag}>
          <div className='pageTitle'>
            {text && React.cloneElement(APPSICON[text], { sx: { fontsize: 20 } })}
            {text && text}
          </div>
          <ButtonGroup variant='text' aria-label="text button group" >
            <IconButton aria-label='minimize' onClick={Minimized}>
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

// onDragStart = { handleDragStart }
// onDragEnd = { handleDragEnd }