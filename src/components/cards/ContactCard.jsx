import React from 'react'
import './styles/Contactstyle.css'
import { Box, Card, TextField, Button, Divider, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { Send } from '@mui/icons-material'


export default function ContactCard() {
  const data = useSelector((state) => state.data['Reseau'])
  const theme = useTheme()
  const boxstyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    padding: '2% 2% 5% 2%',
    borderRadius: ' 0px 0px 10px 10px'
  }
  const textFieldStyle = {
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    position: 'relative',
    margin: '3% 0% 0 0',
    boxSizing: 'border-box',
    borderRadius: '3px',
  }
  return (
    <div className='containerContact'>

      <form >
        <span className='topForm'><h1>Formulaire de contact</h1></span>
        <Box sx={boxstyle}>
          <TextField label='Nom Complet' required sx={textFieldStyle} />
          <TextField label='Adresse mail' required type='email' sx={textFieldStyle} />
          <TextField label='Objet' required sx={textFieldStyle} />
          <TextField label='Message' required multiline rows={5} sx={textFieldStyle} />
          <Button variant="contained" endIcon={<Send />} sx={{ position: 'absolute', bottom: '-25px', width: '80%' }}>
            Send
          </Button>
        </Box>
      </form>
      <Divider variant='middle' sx={{
        color: 'white',
        width: '100%',
        margin: '5% 0% 3% 0',
        height: '10%',
        "&::before, &::after": {
          borderColor: "white"
        }
      }}>
        Retrouvez-moi sur les réseaux
      </Divider>
      <div className='social__container'>
        {data && Object.entries(data).map((v, i) => {
          return <Card sx={{ display: 'flex', height: "50px", width: '50px', borderRadius: '50%', position: 'relative' }} elevation={3} key={`c${i}`}>
            <a href={v[1].url} target='_blank' />
            <img src={v[1].icon} alt={`icon ${v[0].toString()}`} className='iconContact' />
          </Card>
        })}
      </div>
    </div>
  )
}
