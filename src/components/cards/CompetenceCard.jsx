import React, { useEffect, useState } from 'react'
import './styles/Competencestyle.css'
import { Box, Card, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import LinearProgresswLabel from './Linearcomponent/LinearProgresswLabel';


function CompetenceCard() {
  const [loadingText, setLoadingText] = useState('');
  const [textGenerated, setTextGenerated] = useState(false);
  const data = useSelector((state) => state.data['Competence'])
  const textContent = 'Initializing...';
  let currentIndex = 0;
  const dividerStyle = {
    WebkitBoxShadow: '0px 32px 6px -30px rgba(0,0,0,0.41)',
    boxShadow: '0px 32px 6px -30px rgba(0,0,0,0.41)'
  }

  useEffect(() => {
    console.log('test Competence');
    const updateText = () => {
      setLoadingText(textContent.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex <= textContent.length) {
        setTimeout(updateText, 150);
      } else {
        setTextGenerated(true);
      }
    };

    updateText();
  }, []);


  return (
    <div className='container'>
      {textGenerated ?
        <Box className='boxCompetence'>
          <Card variant='outlined' className='cardCompetence' sx={{ overflow: 'auto' }}>
            <h3>Language / Framework / Base de donnée</h3>
            <Divider sx={dividerStyle} />

            <div className='dataCompetence'>
              {data && Object.entries(data.Language).map((v, i) => {
                return <LinearProgresswLabel text={v[0].toString()} maxProgress={v[1].value} key={`L${i}`} image={v[1].icon} />
              })}
            </div>
          </Card>
          <Card variant='outlined' className='cardCompetence' sx={{ overflow: 'auto' }}>
            <h3>Autres</h3>
            <Divider />
            {data && Object.entries(data.Autres).map((v, i) => {
              return <LinearProgresswLabel text={v[0].toString()} maxProgress={v[1].value} key={`A${i}`} image={v[1].icon} />
            })}
          </Card>
        </Box>
        :
        <div className='loadingText'>
          {loadingText}
        </div>
      }
    </div>
  )
}
export const MemoizedCompetenceCard = React.memo(CompetenceCard)