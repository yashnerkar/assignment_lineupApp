import './App.css';
import React, { useEffect, useState } from "react";
import Canvas from "./components/Canvas"
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

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

  useEffect(() => {
    localStorage.setItem('shapes', JSON.stringify(shapes));
  }, [shapes])
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('shapes'));
    setShapes(items);
  }, [])

  const handleClearCanvas = () => {
    setShapes({
      circle: [],
      square: []
    })
  }

  function handleDragEnd(e) {
    const name = e.target.attrs.title.split("-")[0];
    const idx = parseInt(e.target.attrs.title.split("-")[1]);
    console.log(idx);
    setShapes((prev) => {
      return {
        ...prev,
        [name]: prev[name].map((item, index) => {
          if (index === idx) {
            return {
              x: e.target.x(),
              y: e.target.y()
            }
          }
          return item;
        })
      }
    })
  }
  return (
    <div className="App" style={{ overflow: "hidden", height: "100vh", display: "flex", flexDirection: "column" }}>

      <Stack direction="row" spacing={2} sx={{ margin: "10px" }}>
        <Button variant="contained" color="success" id="circle" onClick={(e) => { handleObjects(e) }} endIcon={<CircleIcon />}>
          Circle
        </Button>
        <Button variant="contained" color="error" id="square" onClick={(e) => { handleObjects(e) }} endIcon={<SquareIcon />}>
          Square
        </Button>
        <Button variant="outlined" onClick={handleClearCanvas} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>
      <Canvas objects={objects} handleObjects={handleObjects} handleDragEnd={handleDragEnd} circles={shapes.circle} squares={shapes.square} />
    </div>
  );
}

export default App;
