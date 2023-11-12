import React, { useLayoutEffect, useState } from 'react'
import './styles/Competencestyle.css'

export default function CompetenceCard() {
  const [loadingText, setLoadingText] = useState('');
  const [textGenerated, setTextGenerated] = useState(false);
  const textContent = 'Initializing...';
  let currentIndex = 0;

  useLayoutEffect(() => {
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
      <div className='radar__container'>
          <div className='first'> </div>
          <div className='second'> </div>
          <div className='search'> </div>
          <div className='competence'> </div>
      </div>
      :
      <div className='loadingText'>
      {loadingText}
      </div>
      }
    </div>
  )
}
