import './styles/CardStyle.css'
import React, { useCallback, useEffect, useState } from 'react'
import { MemoizedCompetenceCard } from './SkillCard'
import { MemoizedContactCard } from './ContactCard'
import { MemoizedParcoursCard } from './CourseCard'
import { MemoizedPassionCard } from './HobbyCard'
import { MemoizedPresentationCard } from './PresentationCard'
import { MemoizedProjectCard } from './ProjectsCard'
import { ButtonGroup, Card, IconButton } from '@mui/material'
import { APPSICON } from '../SinglePageApp/SinglePageApp'
import { Close, Minimize } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setOnTop, setToggleWindow, setZIndex, toggleMinimized, setCoordinatesPages } from "../../../redux";
import { useTheme } from '@emotion/react'
import { useDrag } from 'react-dnd'
import { MemoizedAboutCard } from './AboutCard'

export default function PortfolioCard({ text, mobile = false, maxwidth, onmoove }) {
  const nameCard = useSelector((state) => state.card)
  const [maxw, setMaxW] = useState({})
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
    'Projets': <MemoizedProjectCard />,
    'A Propos': <MemoizedAboutCard />
  }



  useEffect(() => {
    if (mobile) {
      if (maxwidth >= 600) {
        dispatch(setCoordinatesPages({ dragText: text, x: 150, y: 0 }))
      } else {
        dispatch(setCoordinatesPages({ dragText: text, x: 0, y: 0 }))
      }
    }
    dispatch(setZIndex({ Text: text }))
  }, [])

  const Minimized = useCallback(() => {
    dispatch(toggleMinimized({ Text: text }))
  })



  function handleCloseClick(e) {
    e.preventDefault()
    dispatch(setToggleWindow({ Text: text }))
  }

  function handleClick(e) {
    const severalOpenedWindowTest = Object.entries(nameCard).filter((e) => e[1].openedWindow).length
    if (severalOpenedWindowTest > 1) {
      dispatch(setOnTop({ Text: text }))
    }
  }

  return (
    <div className={`portfolioCard ${nameCard[text].minimize ? 'minimize' : 'up'}`}
      style={{
        top: nameCard[text].position.y,
        left: nameCard[text].position.x,
        zIndex: nameCard[text].zindex
      }}
      onClick={handleClick}>

      <Card elevation={mobile ? 0 : nameCard[text].zindex} sx={{ color: theme.palette.primary.light, minWidth: "100%", minHeight: '100%', borderRadius: mobile ? 0 : 1, height: '100%', width: '100%' }}>
        <div
          position='relative'
          className='pageBar'
          draggable='true'
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