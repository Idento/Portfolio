import * as React from "react"
import { LinearProgress, Box } from "@mui/material"
import "./styles/App.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setData } from "../redux"


function App() {
  const [progress, setProgress] = React.useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    fetch('/public/data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (jsondata) {
        dispatch(setData(jsondata))
      })
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

    const waitProgressBar = setTimeout(() => {
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
