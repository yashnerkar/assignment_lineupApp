import './App.css';
import React, { useState } from "react";
import Canvas from "./components/Canvas"
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';
function App() {
  const [objects, setObjects] = useState({
    circle: false,
    square: false,
  });

  const [shapes, setShapes] = useState({
    circle: [],
    square: []
  })

  const handleObjects = (e) => {
    console.log(e.target.id);
    const name = e.target.id;
    setObjects((prev) => {
      return {
        ...prev,
        [name]: true
      }
    })
    setShapes((prev) => {
      return {
        ...prev,
        [name]: [...prev[name], { x: 100, y: 100 }]
      }
    })
  }
  console.log(shapes);



  function handleDragEnd(e) {
    const name = e.target.attrs.title.split("-")[0];
    const idx = parseInt(e.target.attrs.title.split("-")[1])
    console.log(idx);
    setShapes((prev) => {
      console.log({ prev, idx })
      prev[name][idx].x = e.target.x();
      prev[name][idx].y = e.target.y();
      return prev;
    })
  }
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", margin: "20px", fontSize: "2rem" }}>
        <div style={{ marginRight: "10px" }} id="circle" onClick={(e) => { handleObjects(e) }}>
          Circle <span>
            <CircleIcon />
          </span>
        </div>
        <div style={{ marginRight: "10px" }} id="square" onClick={(e) => { handleObjects(e) }}>
          Square <span>
            <SquareIcon />
          </span>
        </div>
      </div>
      <Canvas objects={objects} handleObjects={handleObjects} handleDragEnd={handleDragEnd} circles={shapes.circle} squares={shapes.square} />
    </div >
  );
}

export default App;
