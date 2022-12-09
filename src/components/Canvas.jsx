import React, { useState } from 'react';
import { Stage, Layer, Circle, Rect, Text } from 'react-konva';




const Canvas = ({ objects, handleObjects, circles, handleDragEnd, squares }) => {

    return (

        <Stage height={500} width={window.innerWidth} style={{ border: "1px solid black", overflow: "hidden" }}>
            <Layer>
                {/* <Text text="Choose A Shape" /> */}
                {
                    objects.circle ? circles.map((item, idx) => {
                        console.log(idx)
                        return <Circle
                            x={item.x}
                            y={item.y}
                            title={"circle-" + idx}
                            radius={50}
                            fill="green"
                            draggable
                            onDragEnd={(e) => handleDragEnd(e)}
                        />
                    }) : null}
                {objects.square ? squares.map((item, idx) => {
                    return <Rect
                        x={item.x}
                        y={item.y}
                        title={"square-" + idx}
                        width={100}
                        height={100}
                        fill="red"
                        shadowBlur={10}
                        draggable
                        onDragEnd={(e) => handleDragEnd(e)}
                    />
                }) : null
                }

            </Layer>
        </Stage >
        // </div>
    );
};
export default Canvas;