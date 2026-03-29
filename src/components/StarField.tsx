import React, { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w: number;
    let h: number;
    let x: number;
    let y: number;
    let z: number;

    interface StarInstance {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
      update: () => void;
    }

    const stars: StarInstance[] = [];
    const numStars = 250; 
    const speed = 0.04; 

    class Star implements StarInstance {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;

      constructor() {
        this.x = Math.random() * w - x;
        this.y = Math.random() * h - y;
        this.z = Math.random() * w;
        this.px = 0;
        this.py = 0;
      }

      update() {
        this.z -= speed * 100;
        if (this.z <= 0) {
          this.z = w;
          this.x = Math.random() * w - x;
          this.y = Math.random() * h - y;
          this.px = 0;
          this.py = 0;
        }

        const sx = (this.x / this.z) * x + x;
        const sy = (this.y / this.z) * y + y;

        if (this.px !== 0) {
          ctx!.beginPath();
          // Subtle mint-cream color
          ctx!.strokeStyle = `rgba(238, 243, 239, ${Math.min(0.3, (w - this.z) / w * 0.3)})`;
          ctx!.lineWidth = 0.8;
          ctx!.moveTo(sx, sy);
          ctx!.lineTo(this.px, this.py);
          ctx!.stroke();
        }

        this.px = sx;
        this.py = sy;
      }
    }

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      x = w / 2;
      y = h / 2;
      z = w;
      
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
      ctx.lineCap = 'round';
    };

    const draw = () => {
      // Slight trail effect
      ctx.fillStyle = 'rgba(20, 24, 32, 0.2)';
      ctx.fillRect(0, 0, w, h);

      stars.forEach(star => star.update());
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
