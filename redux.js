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

export const store = configureStore({
    reducer: {
        icon: iconSlice.reducer
    }
})

export const {setCoordinates, setRandomCoordinates} = iconSlice.actions