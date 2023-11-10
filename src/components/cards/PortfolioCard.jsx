import React, { useRef, useState } from 'react'
import CompetenceCard from './CompetenceCard'
import ContactCard from './ContactCard'
import ParcoursCard from './ParcoursCard'
import PassionCard from './PassionCard'
import PresentationCard from './PresentationCard'
import ProjetsCard from './ProjetsCard'
import { AppBar, Card } from '@mui/material'
import { APPS } from '../SinglePageApp/SinglePageApp'
import { Close, Minimize } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import './styles/CardStyle.css'


export default function PortfolioCard({text}) {
  const [isDragging, setIsDragging] = useState(false);
  const nameCard = useSelector((state)=> state.card[text])
  const dragRef = useRef(null)

const APPSCARD = {
  'Compétence': <CompetenceCard/>,
  'Contact': <ContactCard/>,
  'Parcours': <ParcoursCard/>,
  "Centre d'intérêt" : <PassionCard/>,
  'Présentation': <PresentationCard/>,
  'Projets': <ProjetsCard/>
}

  const handleDragStart = (event) => {
    setIsDragging(true);
    event.dataTransfer.setData('text', text);
    event.dataTransfer.setData('page', true)
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className='portfolioCard'
    ref={dragRef}
    style={{top:nameCard.position.y, left:nameCard.position.x}}
    draggable='true'
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    >
        <Card elevation={6}>
            <AppBar
            position='relative'>
                <div>
                    {text && APPS[text]}
                    {text && text}
                </div>
                <div>
                  <Close/>
                  <Minimize />
                </div>
            </AppBar>
            {APPSCARD && APPSCARD[text]}
        </Card>
    </div>
  )
}
