import React, { useState } from 'react'
import './styles/PresentationStyle.css'
import { useSelector } from 'react-redux'
import { Button, Card } from '@mui/material'


function PresentationCard() {
  const introduceData = useSelector((state) => state.data['Presentation'])
  const [show, setShow] = useState(false)
  console.log('test presentation');

  function handleShowMore(e) {
    setShow(true)
  }

  function handleShowLess(e) {
    setShow(false)
  }

  return (
    <div className='introduceContainer'>
      <Card className='introduceCard'>
        <div className='info'>
          <img alt={`${introduceData.Nom}`} src={`${introduceData.Photo}`} className='introduceImg' />
          <h3 id='introduceName'>{`${introduceData.Nom}`}</h3>
          <p>{`${introduceData.Age} ans`}</p>
        </div>
        <q className='quoteIntroduce'>{`${introduceData.Phrase}`}</q>
        <Button variant='outlined' sx={{
          padding: '2px 20px 0 20px',
          borderRadius: '5px 5px 0 0',
          borderBottom: '1px solid transparent',
          ":hover":
            { borderBottom: '1px solid transparent' }
        }}
          onClick={handleShowMore}
          onTouchStart={handleShowMore}
        >
          Plus d'information
        </Button>


        <Card className={`card ${show ? 'expanded' : ''}`}
          sx={{ overflow: 'auto', transition: 'top 1s ease-out' }}
        >

          <div className="extra_content">
            <Button variant='outlined'
              sx={{
                padding: '2px 20px 0 20px',
                borderRadius: '0px 0px 5px 5px',
                borderTop: '1px solid transparent',
                ":hover":
                  { borderTop: '1px solid transparent' }
              }}
              onClick={handleShowLess}
              onTouchStart={handleShowLess}
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

export const MemoizedPresentationCard = React.memo(PresentationCard)

