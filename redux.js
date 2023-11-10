// to do : une slice icone et une slice card
import { configureStore, createSlice } from '@reduxjs/toolkit'

const iconSlice = createSlice({
    name: 'icon',
    initialState:{
        'Compétence':{x:500, y:500},
        'Contact': { x: 500, y: 500 },
        'Parcours': { x: 500, y: 500 },
        "Centre d'intérêt": { x: 500, y: 500 },
        'Présentation': { x: 500, y: 500 },
        'Projets': { x: 500, y: 500 }
    },
    reducers:{
        setCoordinates: (state, action) => {
            state[action.payload.dragText] = {x: action.payload.x, y: action.payload.y}
        },
        setRandomCoordinates: (state, action) => {
            Object.keys(state).map((v, i) => {
                state[v] = action.payload.coordinates[i]
            })
        }
    }
})

const cardSlice = createSlice({
    name: 'card',
    initialState:{
        'Compétence': {position :{ x: 500, y: 500 }, openedWindow: false},
        'Contact': { position: { x: 500, y: 500 }, openedWindow: false },
        'Parcours': { position: { x: 500, y: 500 }, openedWindow: false},
        "Centre d'intérêt": { position: { x: 500, y: 500 }, openedWindow:false},
        'Présentation': { position: { x: 500, y: 500 }, openedWindow: false},
        'Projets': { position: { x: 500, y: 500 }, openedWindow: false}
    },
    reducers:{
        setCoordinatesPages: (state, action) => {
            state[action.payload.dragText].position = { x: action.payload.x, y: action.payload.y }
        },
        setToggleWindow: (state, action) => {
            state[action.payload.Text].openedWindow = !state[action.payload.Text].openedWindow
        }
    }
})

export const store = configureStore({
    reducer: {
        icon: iconSlice.reducer,
        card: cardSlice.reducer
    }
})

export const {setCoordinates, setRandomCoordinates} = iconSlice.actions
export const {setCoordinatesPages, setToggleWindow} = cardSlice.actions