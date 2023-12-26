import { Card, Tabs, Tab, CardMedia, CardContent, Stack, Chip, CardActionArea } from '@mui/material'
import TabPanel from './TabContentComponent/TabContentComponent'
import './styles/ProjetStyle.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MemoizedCarrousel } from './carrousel/carrousel'
import { Link } from '@mui/icons-material'

function ProjetsCard() {
  const data = useSelector((state) => state.data['Projets'])
  const [projects, setProjects] = useState()
  const [value, setValue] = useState();
  const [openDialog, setOpenDialog] = useState(null)

  function handleCardClick(va) {
    setOpenDialog(va)
  }

  function handleCardCloseClick() {
    setOpenDialog(null)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setProjects(data)
    const getfilter = {}
    const getProjects = {}
    Object.entries(data).map((v, i) => {
      getProjects['TOUS'] = getProjects['TOUS'] || []
      getProjects['TOUS'].push(v[1])
      getProjects[v[1].contexte] = getProjects[v[1].contexte] || []
      getProjects[v[1].contexte].push(v[1])
    })
    setProjects(getProjects)

    setTimeout(() => {
      setValue(0)
    }, 500)

  }, [])

  return (
    <div className='projectContainer'>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered sx={{ borderBottom: '1px solid grey' }}>
          {projects && Object.keys(projects).map((v, i) => {
            return <Tab label={v.toString()} key={`tab ${i}`} />
          })}
        </Tabs>

        <div className="projectTabsContainer">
          {projects && Object.entries(projects).map((v, i) => {
            return <TabPanel value={value} index={i} key={`Tab${i}`} >
              {v[1].map((va, id) => {
                return <Card key={`card${id}`} sx={{ position: 'relative' }}>
                  <CardActionArea onClick={() => handleCardClick(va)}>
                    <CardMedia image={va.imageURL} component='img' loading='lazy' />
                  </CardActionArea>
                  <CardContent>
                    <h4 className='title__card'>{va.Titre}</h4>
                    <p className='description__card'>{va.description}</p>
                    <span className='Date'> Date de creation: {va.date}</span>
                    <Stack direction={'row'} display={'flex'} gap={'2%'} justifyContent={'flex-start'}>
                      {va.tags.map((val, ind) => {
                        return <Chip label={`${val}`} key={`chip${ind}`} sx={{ padding: "0 2%" }} />
                      })}
                      {va.link ?
                        <Chip
                          component="a"
                          href={`${va.link}`}
                          variant='outlined'
                          label="Lien"
                          key={`chipLink ${id}`}
                          icon={<Link />}
                          sx={{ cursor: 'pointer', marginLeft: 'auto' }}
                          target='_blank'
                          rel='noopener noreferrer' />
                        : null}
                    </Stack>
                  </CardContent>
                </Card>
              })}

            </TabPanel>
          })}
        </div>

      </Card>
      {openDialog && <MemoizedCarrousel data={openDialog} close={handleCardCloseClick} openDialog={true} />}
    </div>
  )
}

export const MemoizedProjectCard = React.memo(ProjetsCard)
