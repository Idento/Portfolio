import React, { useState } from 'react'
import './styles/Contactstyle.css'
import { Box, Card, TextField, Button, Divider, useTheme, FormControl } from '@mui/material'
import { useSelector } from 'react-redux'
import { Send } from '@mui/icons-material'
import { FORMDATALINK } from '../../utils/formContactData'


function ContactCard() {
  const data = useSelector((state) => state.data['Reseau'])
  const [submit, setSubmit] = useState(false)
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
    margin: '3% 0% 0 0',
    boxSizing: 'border-box',
    borderRadius: '3px',
  }

  return (
    <div className='containerContact'>

      <div className='formContact'>
        <div className='topForm'><h1>Formulaire de contact</h1></div>
        <Box
          component="form"
          sx={boxstyle}
          className='contactBox'
          action={FORMDATALINK}
          method='POST'>
          <TextField label='Nom Complet' name='Full Name' required sx={textFieldStyle} />
          <TextField label='Adresse mail' name='Email' required type='email' sx={textFieldStyle} />
          <TextField label='Objet' name='Objet' required sx={textFieldStyle} />
          <TextField label='Message' name='Message' required multiline rows={5} sx={textFieldStyle} />
          <Button type="submit" className='buttonFormContact' variant="contained" endIcon={<Send />} >
            Envoyer
          </Button>
        </Box>
      </div>
      <Divider className='formContactDivider' variant='middle' sx={{
        color: 'white',
        width: '100%',
        margin: '3% 0% 3% 0',
        height: '20px',
        "&::before, &::after": {
          borderColor: "white"
        }
      }}>
        Retrouvez-moi sur les réseaux
      </Divider>
      <div className='social__container'>
        {data && Object.entries(data).map((v, i) => {
          return <Card sx={{ display: 'flex', height: "50px", width: '50px', borderRadius: '50%', position: 'relative' }} elevation={3} key={`c${i}`}>
            <a href={v[1].url} target='_blank' className='linkToSocial' rel='noopener noreferrer' />
            <img src={v[1].icon} alt={`icon ${v[0].toString()}`} className='iconContact' />
          </Card>
        })}
      </div>
    </div>
  )
}

export const MemoizedContactCard = React.memo(ContactCard)
