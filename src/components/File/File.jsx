import React, { useRef, useState } from "react";
import './styles/File.css'
import { useDispatch, useSelector } from "react-redux";
import { setToggleWindow } from "../../../redux";

export default function File({minimized = false, children, text}) {
  const [isDragging, setIsDragging] = useState(false);
  const coord = useSelector((state)=> state.icon)
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
    e.preventdefault()
    dispatch(setToggleWindow(text))
  }

  return (
    <div style={{top:coord[text].y, left:coord[text].x}} 
    className='file'
    ref={dragRef}
    draggable='true'
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    onDoubleClick={handleDblClick}
    >
      {children && children}
      <span>{text}</span>
    </div>
  )
}
