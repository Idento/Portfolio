import React, { useState } from 'react'
import './styles/PresentationStyle.css'
import { useSelector } from 'react-redux'
import { Button, Card } from '@mui/material'


export default function PresentationCard() {
  const introduceData = useSelector((state) => state.data['Presentation'])
  const [show, setShow] = useState(false)

  function handleShowMore(e) {
    setShow(true)
  }

  function handleShowLess(e) {
    setShow(false)
  }

  return (
    <div className='introduceContainer'>
      <Card sx={{ padding: '0 2%', width: "70%", overflow: 'hidden', height: '424px', position: 'relative' }}>
        <div className='info'>
          <img alt={`${introduceData.Nom}`} src={`${introduceData.Photo}`} />
          <h3>{`${introduceData.Nom}`}</h3>
          <p>{`${introduceData.Age} ans`}</p>
        </div>
        <q>{`${introduceData.Phrase}`}</q>
        <Button variant='outlined' sx={{
          padding: '2px 20px 0 20px',
          borderRadius: '5px 5px 0 0',
          borderBottom: '1px solid transparent',
          ":hover":
            { borderBottom: '1px solid transparent' }
        }} onClick={handleShowMore}>
          Plus d'information
        </Button>


        <Card sx={{
          width: '100%',
          height: '100%',
          zIndex: 10,
          margin: 0,
          position: 'absolute',
          left: 0,
          boxSizing: 'border-box',
          padding: '0% 5%',
          transition: 'top 1s ease-out'
        }}
          className={`card ${show ? 'expanded' : ''}`}
        >

          <div className="extra-content">
            <Button variant='outlined'
              sx={{
                padding: '2px 20px 0 20px',
                borderRadius: '0px 0px 5px 5px',
                borderTop: '1px solid transparent',
                ":hover":
                  { borderTop: '1px solid transparent' }
              }}
              onClick={handleShowLess}
            >
              Retour
            </Button>
            <div className='introducingText'>
              {`${introduceData.Courte_presentation}`}
            </div>
          </div>
        </Card>
      </Card>
    </div>
  )
}

