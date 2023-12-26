// to do : une slice icone et une slice card
import { configureStore, createSlice } from '@reduxjs/toolkit'

const iconSlice = createSlice({
    name: 'icon',
    initialState: {
        'Compétence': { x: 500, y: 500 },
        'Contact': { x: 500, y: 500 },
        'Parcours': { x: 500, y: 500 },
        "Centre d'intérêt": { x: 500, y: 500 },
        'Présentation': { x: 500, y: 500 },
        'Projets': { x: 500, y: 500 },
        'A Propos': { x: 500, y: 500 }
    },
    reducers: {
        setCoordinates: (state, action) => {
            state[action.payload.dragText] = { x: action.payload.x, y: action.payload.y }
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
    initialState: {
        'Compétence': { position: { x: 100, y: 100 }, openedWindow: false, zindex: 0, minimize: false },
        'Contact': { position: { x: 200, y: 100 }, openedWindow: false, zindex: 0, minimize: false },
        'Parcours': { position: { x: 300, y: 100 }, openedWindow: false, zindex: 0, minimize: false },
        "Centre d'intérêt": { position: { x: 400, y: 100 }, openedWindow: false, zindex: 0, minimize: false },
        'Présentation': { position: { x: 500, y: 100 }, openedWindow: false, zindex: 0, minimize: false },
        'Projets': { position: { x: 800, y: 100 }, openedWindow: false, zindex: 0, minimize: false },
        'A Propos': { position: { x: 500, y: 100 }, openedWindow: false, zindex: 0, minimize: false }
    },
    reducers: {
        setCoordinatesPages: (state, action) => {
            state[action.payload.dragText].position = { x: action.payload.x, y: action.payload.y }
        },
        setToggleWindow: (state, action) => {
            state[action.payload.Text].openedWindow = !state[action.payload.Text].openedWindow
        },
        setZIndex: (state, action) => {
            let opened = [];
            for (const [key, value] of Object.entries(state)) {
                if (value.openedWindow) {
                    opened.push(value.openedWindow)
                }
            }
            state[action.payload.Text].zindex = opened.length + 1
        },
        setOnTop: (state, action) => {
            const actualStateIndex = state[action.payload.Text].zindex
            let maxIndex = []
            for (const [key, value] of Object.entries(state)) {
                maxIndex.push(value.zindex)
                if (value.zindex > actualStateIndex) {
                    state[key].zindex -= 1;
                }
            }
            state[action.payload.Text].zindex = Math.max(...maxIndex)
        },
        toggleMinimized: (state, action) => {
            state[action.payload.Text].minimize = !state[action.payload.Text].minimize
        }
    }
})

const dataSlice = createSlice({
    name: 'data',
    initialState: {},
    reducers: {
        setData: (state, action) => {
            return action.payload
        }
    }
})

const allPageSlice = createSlice({
    name: 'allpage',
    initialState: {
        'Compétence': false,
        'Contact': false,
        'Parcours': false,
        "Centre d'intérêt": false,
        'Présentation': false,
        'Projets': false,
        'A Propos': false
    },
    reducers: {
        setTrue: (state, action) => {
            state[action.payload.trueText] = true
        }
    }
})

export const store = configureStore({
    reducer: {
        icon: iconSlice.reducer,
        card: cardSlice.reducer,
        data: dataSlice.reducer,
        allpage: allPageSlice.reducer
    }
})

export const { setCoordinates, setRandomCoordinates } = iconSlice.actions
export const { setCoordinatesPages, setToggleWindow, setZIndex, setOnTop, toggleMinimized } = cardSlice.actions
export const { setData } = dataSlice.actions
export const { setTrue } = allPageSlice.actions