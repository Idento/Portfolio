import React, { useRef, useState } from "react";
import './styles/File.css'
import { useDispatch, useSelector } from "react-redux";
import { setToggleWindow, setTrue } from "../../../redux";
import { useDrag } from "react-dnd";

export default function File({ children, text, x, y, animdelay }) {
  const page = useSelector((state) => state.card)
  const openedOnce = useSelector((state) => state.allpage[text])
  const dispatch = useDispatch()
  const dragRef = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text',
    item: { text }
  }))
  const [animationEnded, setAnimationEnded] = useState(false)
  const [transitionEnded, setTransitionEnded] = useState(false)
  const firstwindows = ['Présentation', 'Projets', 'Compétence']



  function handleEndOfAnimation() {
    setAnimationEnded(true)
  }

  function handleTransitionEnded() {
    setTransitionEnded(true)
    if (firstwindows.includes(text) && !openedOnce) {
      dispatch(setToggleWindow({ Text: text }))
      dispatch(setTrue({ trueText: text }))
    }
  }

  function handleDblClick(e) {
    if (!page[text].openedWindow) {
      dispatch(setToggleWindow({ Text: text }))
      dispatch(setTrue({ trueText: text }))
    }
  }

  function handleTouch() {
    if (!page[text].openedWindow) {
      dispatch(setToggleWindow({ Text: text }))
      dispatch(setTrue({ trueText: text }))
    }
  }

  return (
    <div style={{
      top: animationEnded ? y : 500,
      left: animationEnded ? x : 500,
      animationDelay: `${animdelay}ms`,
      transition: transitionEnded ? 'none' : ""
    }}
      className='file'
      ref={drag}
      draggable='true'
      onDoubleClick={handleDblClick}
      onTouchStart={handleTouch}
      onAnimationEnd={handleEndOfAnimation}
      onTransitionEnd={handleTransitionEnded}
    >
      {!openedOnce ? <div className="dot"></div> : ''}

      {children && children}
      <span>{text}</span>
    </div>
  )
}

React.memo(File)
