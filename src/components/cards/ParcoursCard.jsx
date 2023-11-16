import { ExpandMoreOutlined } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Card, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import './styles/ParcoursStyle.css'
import React from 'react'
import { useSelector } from 'react-redux'

function ParcoursCard() {
  const data = useSelector((state) => state.data['Parcours'])
  console.log('test parcours');
  return (
    <div className='courseContainer'>

      <div className="timeline">
        {data && Object.entries(data).map((v, i) => {
          return <Accordion key={i} sx={{ width: '100%' }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              {v[0]}
            </AccordionSummary>
            <AccordionDetails>
              {console.log(v)}
              {Object.entries(v[1]).map((va, id) => {
                return <div className={`headContentCell`} key={id}>
                  <Divider>
                    <h3>{va[0]}</h3>
                  </Divider>
                  <h4>{va[1].Intitulé}</h4>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {Object.entries(va[1]).map((val, ind) => {
                            if (val[1] !== va[1].Intitulé) {
                              return <TableCell key={ind} sx={{ padding: "2% 10px", fontWeight: 'bold' }}>
                                {val[0]}
                              </TableCell>
                            }
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {Object.entries(va[1]).map((valu, inde) => {
                            if (valu[1] !== va[1].Intitulé) {
                              return <TableCell key={inde} sx={{ padding: "2% 10px" }}>
                                {valu[1]}
                              </TableCell>
                            }
                          })}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              })}
            </AccordionDetails>
          </Accordion>
        })}
      </div>

    </div>
  )
}

export const MemoizedParcoursCard = React.memo(ParcoursCard)