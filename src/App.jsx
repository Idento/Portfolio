import * as React from "react"
import { LinearProgress, createTheme, Box } from "@mui/material"
import "./styles/App.css"
import { grey } from "@mui/material/colors"
import { ThemeProvider } from "@emotion/react"
import { useNavigate } from "react-router-dom"

export const theme = createTheme({
  palette: {
    primary: {
      light: grey[50],
      main: grey[600],
      dark: grey[900],
    },
  },
})

function App() {
  const [progress, setProgress] = React.useState(0)
  const navigate = useNavigate()

  React.useEffect(() => {
    const progressBarProgression = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress < 100) {
          return oldProgress + 10
        } else {
          clearInterval(progressBarProgression)
          return 100
        }
      })
    }, 150)

    const waitProgressBar= setTimeout(() =>{
      navigate('/main')
    }, 2200)

    return () => {
      clearInterval(progressBarProgression)
      clearTimeout(waitProgressBar)
    }
  }, [])

  


  return (
    <>
      <ThemeProvider theme={theme}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              minHeight={"50vh"}
              width={"50%"}
              margin={"auto"}>

              <p className="bonjour">Bonjour</p>

              <LinearProgress
                variant="determinate"
                className="loadingbar"
                value={progress}
                sx={{
                  width: "20em",
                  paddingTop: "10px",
                  opacity: "0",
                }}
              />
            </Box>

      </ThemeProvider>
    </>
  )
}

export default App
