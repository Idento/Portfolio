import { LinearProgress, Typography } from '@mui/material'
import React, { lazy, useEffect, useState } from 'react'
import './styles/LinearProgressStyles.css'

export default function LinearProgresswLabel({ text, maxProgress, image }) {
  const [advance, setAdvance] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setAdvance((prevadvance) => (prevadvance >= maxProgress ? maxProgress : prevadvance + 1));
      if (advance === maxProgress) {
        clearInterval(timer)
      }
    }, 150);
  }, [])

  return (
    <div className='data'>
      <div className='labelComp'>
        <img src={image} alt={`${text} logo`} className={`iconComp ${text}__logo`} loading='lazy' />
        <span>{text}</span>
      </div>
      <div className='linearContainer'>
        <div style={{ left: `${advance - 15}%` }} className='testcomp'>{advance}%</div>
        <LinearProgress variant='determinate' value={advance} sx={{ height: '18px', width: '100%' }} />
      </div>
    </div>
  )
}
