import React, { useRef, useEffect, useState } from 'react';
import { DARK_BLUE, LIGHT_BLUE } from '../const/colors';

interface Point {
  x: number;
  y: number;
}

const TriangleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([
    { x: 50, y: 250 },
    { x: 150, y: 50 },
    { x: 250, y: 250 },
  ]);
  const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(null);

  const drawTriangle = (ctx: CanvasRenderingContext2D, points: Point[]) => {
    ctx.strokeStyle = LIGHT_BLUE;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.stroke();
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, point: Point, radius = 5) => {
    ctx.fillStyle = DARK_BLUE;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTriangle(ctx, points);
    points.forEach((point) => drawPoint(ctx, point));
  }, [points]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pointIndex = points.findIndex((point) => Math.hypot(point.x - x, point.y - y) < 5);

    if (pointIndex > -1) {
      setDraggingPointIndex(pointIndex);
    }
  };

  const handleMouseUp = () => {
    setDraggingPointIndex(null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (draggingPointIndex !== null) {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const updatedPoints = [...points];
      updatedPoints[draggingPointIndex] = { x, y };
      setPoints(updatedPoints);
    }
  };

  const handleMouseLeave = () => {
    setDraggingPointIndex(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default TriangleCanvas;
