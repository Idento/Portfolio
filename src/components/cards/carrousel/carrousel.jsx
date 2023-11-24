import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, Paper } from '@mui/material'
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import './styles/carrousel.css'


function reducer(state, action) {
    switch (action.type) {
        case 'next':
            if (state.actualCountImg === state.imgLength) {
                let [addValueCount, addValueTable] = [1, 0]
                return {
                    ...state,
                    actualCountImg: addValueCount,
                    actualTableImg: addValueTable
                }
            }
            let [addValueCount, addValueTable] = [state.actualCountImg + 1, state.actualTableImg + 1]
            return {
                ...state,
                actualCountImg: addValueCount,
                actualTableImg: addValueTable
            }

        case 'previous':
            if (state.actualCountImg === 1) {
                let [newValueCount, newValueTable] = [state.imgLength, state.imgLength - 1]
                return {
                    ...state,
                    actualCountImg: newValueCount,
                    actualTableImg: newValueTable
                }
            }
            let [rmvValueCount, rmvValueTable] = [state.actualCountImg - 1, state.actualTableImg - 1]
            return {
                ...state,
                actualCountImg: rmvValueCount,
                actualTableImg: rmvValueTable
            }
        default:
            return state
    }
}


function Carrousel({ data, close, openDialog }) {
    const [images, setImages] = useState(data.Images)
    const [state, dispatch] = useReducer(reducer, {
        imgLength: images.length,
        actualTableImg: 0,
        actualCountImg: 1
    })
    const [open, setOpen] = useState(openDialog)
    const myref = useRef(null)

    const handleNext = useCallback(() => {
        dispatch({ type: 'next' })
    })
    const handleprevious = useCallback(() => {
        dispatch({ type: 'previous' })
    })

    function handleClose(e) {
        setOpen(false)
        close()
    }

    useEffect(() => {
        const old = (state.actualTableImg - 1) === -1 ? images.length - 1 : (state.actualTableImg - 1)
        if (myref && myref.current) {
            if (myref.current && myref.current.children[old].classList.contains('actual')) {
                myref.current.children[old].classList.remove('actual')
            }
            myref.current.children[state.actualTableImg].classList.add('actual')
        }

    }, [state.actualTableImg, myref])


    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" >
            <DialogTitle sx={{ textAlign: 'center', borderBottom: "1px solid rgba(0, 0, 0, 0.514)" }} >Photos du projet "{data.Titre}"</DialogTitle>
            <DialogContent sx={{ padding: 0 }}>
                <div className="containerCarrousel">
                    <div onClick={handleprevious} className='arrow left'>
                        <ArrowBack sx={{ color: 'white' }} />
                    </div>
                    <img src={images[state.actualTableImg]} alt="" className='imageCarrousel' />
                    <div onClick={handleNext} className='arrow right'>
                        <ArrowForward sx={{ color: 'white' }} />
                    </div>
                    <div ref={myref} className='dotContainer'>
                        {images.map((v, i) => {
                            return i === 0 ? <div key={i} className='actual' style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid white' }} />
                                : <div key={i} style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid white' }} />
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const MemoizedCarrousel = React.memo(Carrousel)
