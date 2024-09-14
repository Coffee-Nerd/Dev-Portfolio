// components/ParticleBackground.js
import React, { useEffect, useRef, useState } from "react";

const ParticleBackground = ({ theme }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let canvas, ctx, w, h, particles, mx, my, tog, man;
    let requestId; // For cleanup

    const SPACING = 8;
    const THICKNESS = Math.pow(80, 2);
    const COLOR = theme === "dark" ? 255 : 0; // Adjust color based on theme
    const DRAG = 0.95;
    const EASE = 0.25;
    const OPACITY = 0.3;

    const particle = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
    };

    // Function to detect if the user is on a mobile device
    function detectMobile() {
      const mobileCheck =
        window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      man = !mobileCheck; // If mobile, disable manual interaction
    }

    // Mousemove function (disabled on mobile)
    function mousemove(e) {
      if (isMobile) return; // Ignore mouse movement on mobile
      const bounds = canvas.getBoundingClientRect();
      mx = e.clientX - bounds.left;
      my = e.clientY - bounds.top;
      man = true; // Manual interaction detected
    }

    // Resize function
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      const COLS = Math.floor(w / SPACING);
      const ROWS = Math.floor(h / SPACING);
      const NUM_PARTICLES = COLS * ROWS;

      particles = [];

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = Object.create(particle);
        p.x = p.ox = (i % COLS) * SPACING;
        p.y = p.oy = Math.floor(i / COLS) * SPACING;
        particles[i] = p;
      }
    }

    function init() {
      const container = containerRef.current;
      canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");
      tog = true;
      man = true; // Enable manual interaction by default
      particles = [];

      resize(); // Initialize canvas size and particles
      detectMobile(); // Detect mobile on initialization

      container.appendChild(canvas);

      // Attach event listeners
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("resize", resize);
      window.addEventListener("resize", detectMobile); // Recheck mobile on resize
    }

    function step() {
      if ((tog = !tog)) {
        if (!man) {
          const t = +new Date() * 0.001;
          mx = w / 2 + Math.cos(t * 2.1) * Math.cos(t * 0.9) * (w / 2 - 100);
          my =
            h / 2 +
            Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * (h / 2 - 100);
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          let dx = mx - p.x;
          let dy = my - p.y;
          let d = dx * dx + dy * dy;
          let f = -THICKNESS / d;

          if (d < THICKNESS) {
            let t = Math.atan2(dy, dx);
            p.vx += f * Math.cos(t);
            p.vy += f * Math.sin(t);
          }

          p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
          p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
        }
      } else {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.fillStyle = `rgba(${COLOR}, ${COLOR}, ${COLOR}, ${OPACITY})`;
          ctx.fillRect(p.x, p.y, 1, 1);
        }
      }

      requestId = requestAnimationFrame(step);
    }

    init();
    step();

    // Cleanup on component unmount
    return () => {
      if (containerRef.current && canvas) {
        containerRef.current.removeChild(canvas);
      }
      // Remove event listeners
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", detectMobile);
      cancelAnimationFrame(requestId);
    };
  }, [theme, isMobile]); // Add 'isMobile' to dependency array

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
    />
  );
};

export default ParticleBackground;
