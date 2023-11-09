import React, { useRef, useState } from "react";
import './styles/File.css'

export default function File({minimized = false, children, text, x = 500, y = 500}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  const handleDragStart = (event) => {
    setIsDragging(true);
    event.dataTransfer.setData('text', text);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div style={{top:y, left:x}} 
    className='file'
    ref={dragRef}
    draggable='true'
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    >
      {children && children}
      <span>{text}</span>
    </div>
  )
}
