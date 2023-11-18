import React, { useRef, useState } from "react";
import './styles/File.css'
import { useDispatch, useSelector } from "react-redux";
import { setToggleWindow, setTrue } from "../../../redux";
import { useDrag } from "react-dnd";

export default function File({ children, text, x, y, animdelay }) {
  const page = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const dragRef = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text',
    item: { text }
  }))
  const [animationEnded, setAnimationEnded] = useState(false)
  const [transitionEnded, setTransitionEnded] = useState(false)



  function handleEndOfAnimation() {
    setAnimationEnded(true)
  }

  function handleTransitionEnded() {
    setTransitionEnded(true)
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
      {children && children}
      <span>{text}</span>
    </div>
  )
}

React.memo(File)
