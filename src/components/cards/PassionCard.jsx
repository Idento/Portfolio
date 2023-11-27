import { Card, Divider } from '@mui/material'
import './styles/PassionStyle.css'
import React from 'react'
import { useSelector } from 'react-redux'

function PassionCard() {
  const hobby = useSelector((state) => state.data['Passion'])
  return (
    <div className='hobbyContainer'>
      {hobby && Object.entries(hobby).map((v, i) => {
        return <Card sx={{ marginBottom: '2%' }} key={`hobby ${i}`}>
          <h3 className='hobbyTitle'>{v[0]}</h3>
          <Divider />
          <p className='hobbyPara'>{v[1]}</p>
        </Card>
      })}
    </div>
  )
}

export const MemoizedPassionCard = React.memo(PassionCard)
