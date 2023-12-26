import { Card, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import './styles/AboutStyle.css'
import React from 'react'
import { Launch } from '@mui/icons-material'

function aboutCard() {
    return (
        <div className='aboutContainer'>
            <Card className='AboutData' sx={{ overflow: 'auto' }}>
                <h3>Ce portfolio a été créer avec</h3>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <img src="/assets/react.svg" alt="react logo" className='about_logo' />
                        </ListItemIcon>
                        <ListItemText primary="React" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <img src="/assets/css3.svg" alt="css logo" className='about_logo' />
                        </ListItemIcon>
                        <ListItemText primary="CSS" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <img src="/assets/redux-icon.svg" alt="redux logo" className='about_logo' />
                        </ListItemIcon>
                        <ListItemText primary="Redux" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <img src="/assets/js.svg" alt="javascript logo" className='about_logo' />
                        </ListItemIcon>
                        <ListItemText primary="javascript" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <img src="/assets/material-ui.svg" alt="javascript logo" className='about_logo' />
                        </ListItemIcon>
                        <ListItemText primary="Material ui" />
                    </ListItem>
                    <Divider />
                    <h3>Pour les icones</h3>
                    <ListItemButton
                        className='button_about_links'
                        href='https://fontawesome.com/'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <ListItemText primary="FontAwesome" />
                        <Launch />
                    </ListItemButton>
                    <ListItemButton
                        className='button_about_links'
                        href='https://icons8.com/'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <ListItemText primary="Icons8" />
                        <Launch />
                    </ListItemButton>
                    <Divider />
                    <h3>Pour le fond d'ecran</h3>
                    <ListItemButton
                        className='button_about_links'
                        href='https://fr.freepik.com/photos-gratuite/fond-noir-blanc_47996955.htm#page=2&query=fond%20ecran%20blanc%204k&position=28&from_view=keyword&track=ais&uuid=01f92d49-4537-4e34-b8a2-13e3ebbfcbcc'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <ListItemText primary="Freepik" />
                        <Launch />
                    </ListItemButton>

                </List>
            </Card>
        </div>
    )
}

export const MemoizedAboutCard = React.memo(aboutCard)

