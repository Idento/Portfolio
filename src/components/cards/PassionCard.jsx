import { Card, Divider } from '@mui/material'
import './styles/PassionStyle.css'
import React from 'react'
import { useSelector } from 'react-redux'

export default function PassionCard() {
  const hobby = useSelector((state) => state.data['Passion'])
  return (
    <div className='hobbyContainer'>
      {hobby && Object.entries(hobby).map((v, i) => {
        console.log(v);
        return <Card sx={{ marginBottom: '2%' }}>
          <h3>{v[0]}</h3>
          <Divider />
          <p>{v[1]}</p>
        </Card>
      })}

    </div>
  )
}
