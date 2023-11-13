import React, { useEffect, useState } from 'react'
import './styles/Competencestyle.css'
import { Box, Card, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import LinearProgresswLabel from './Linearcomponent/LinearProgresswLabel';


export default function CompetenceCard() {
  const [loadingText, setLoadingText] = useState('');
  const [textGenerated, setTextGenerated] = useState(false);
  const data = useSelector((state) => state.data['Competence'])
  const textContent = 'Initializing...';
  let currentIndex = 0;
  const cardStyle = {
    width:'100%',
    height:'auto',
    padding:'0% 4%',
    boxSizing:'border-box'
  }
  const dividerStyle = {
    WebkitBoxShadow: '0px 32px 6px -30px rgba(0,0,0,0.41)', 
    boxShadow:'0px 32px 6px -30px rgba(0,0,0,0.41)'
  }

  useEffect(() => {
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
      <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'5% 5%'} justifyContent={'center'} width={'100%'}>
        <Card variant='outlined' sx={cardStyle}>
          <h3>Language / Framework / Base de donnée</h3>
          <Divider sx={dividerStyle} />
          {data && Object.entries(data.Language).map((v, i)=>{
            return <LinearProgresswLabel text={v[0].toString()} maxProgress={v[1].value} key={`L${i}`} image={v[1].icon}/>
          })}
        </Card>
        <Card variant='outlined' sx={cardStyle}>
          <h3>Autres</h3>
          <Divider />
          {data && Object.entries(data.Autres).map((v, i)=>{
            return <LinearProgresswLabel text={v[0].toString()} maxProgress={v[1].value} key={`A${i}`}  image={v[1].icon}/>
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
React.memo(CompetenceCard)