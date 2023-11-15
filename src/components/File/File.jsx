import React, { useRef, useState } from "react";
import './styles/File.css'
import { useDispatch, useSelector } from "react-redux";
import { setToggleWindow } from "../../../redux";

export default function File({ children, text, x, y }) {
  const [isDragging, setIsDragging] = useState(false);
  const page = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const dragRef = useRef(null);

  const handleDragStart = (event) => {
    setIsDragging(true);
    event.dataTransfer.setData('text', text);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  function handleDblClick(e) {
    if (!page[text].openedWindow) {
      dispatch(setToggleWindow({ Text: text }))
    }
  }

  function handleTouch() {
    if (!page[text].openedWindow) {
      dispatch(setToggleWindow({ Text: text }))
    }
  }

  return (
    <div style={{ top: y, left: x }}
      className='file'
      ref={dragRef}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDblClick}
      onTouchStart={handleTouch}
    >
      {children && children}
      <span>{text}</span>
    </div>
  )
}

React.memo(File)
