import { Card, Tabs, Tab, CardMedia, CardContent, Checkbox, Stack, Chip } from '@mui/material'
import TabPanel from './TabContentComponent/TabContentComponent'
import './styles/ProjetStyle.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ProjetsCard() {
  const data = useSelector((state) => state.data['Projets'])
  const [projects, setProjects] = useState()
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log('test projet');
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
                return <Card key={`card${id}`}>
                  <CardMedia image={va.imageURL} component='img' />
                  <CardContent>
                    <h4 className='title__card'>{va.Titre}</h4>
                    <p className='description__card'>{va.description} <br /> {va.date}</p>
                    <Stack direction={'row'} display={'flex'} gap={'2%'}>
                      {va.tags.map((val, ind) => {
                        return <Chip label={`${val}`} key={`chip${ind}`} sx={{ padding: "0 2%" }} />
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              })}
            </TabPanel>
          })}
        </div>

      </Card>
    </div>
  )
}

export const MemoizedProjectCard = React.memo(ProjetsCard)
