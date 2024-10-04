import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface LineProps {
  points: number[];
  stroke: string;
  strokeWidth: number;
}

const WhiteboardPage: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [lines, setLines] = useState<LineProps[]>([]);
  const isDrawing = useRef(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    socketRef.current.emit('joinRoom', roomId);

    socketRef.current.on('lineDraw', (lineData: LineProps) => {
      setLines(prevLines => [...prevLines, lineData]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    const newLine: LineProps = { 
      points: [pos.x, pos.y],
      stroke: '#df4b26',
      strokeWidth: 5
    };
    setLines([...lines, newLine]);
    socketRef.current?.emit('drawLine', newLine, roomId);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
    socketRef.current?.emit('drawLine', lastLine, roomId);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Container fluid className="p-0">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 56}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
      <Button 
        onClick={() => setLines([])}
        style={{position: 'absolute', bottom: '20px', right: '20px'}}
      >
        Clear
      </Button>
    </Container>
  );
};

export default WhiteboardPage;