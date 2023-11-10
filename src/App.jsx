import * as React from "react"
import { LinearProgress, Box } from "@mui/material"
import "./styles/App.css"
import { useNavigate } from "react-router-dom"


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
    </>
  )
}

export default App
