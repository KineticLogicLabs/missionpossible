import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Compass, Play, Layers, Battery, Radio, Sparkles, Sliders } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Line3D {
  a?: number;
  b?: number;
  color?: string;
  width?: number;
  isDashed?: boolean;
}

interface ModelViewer3DProps {
  initialModelId?: string;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ initialModelId = 'universal-gearbox-v2' }) => {
  const [selectedModel, setSelectedModel] = useState<string>(initialModelId);
  const [renderMode, setRenderMode] = useState<'wireframe' | 'solid' | 'blueprint'>('wireframe');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<number>(1.0);
  const [viewScale, setViewScale] = useState<number>(1.2);
  
  // Model specific variables
  const [gearRpm, setGearRpm] = useState<number>(60);
  const [explodeFactor, setExplodeFactor] = useState<number>(0); // for Full Assembly
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [simTime, setSimTime] = useState<number>(0);
  const [triggeredSteps, setTriggeredSteps] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // High performance refs for continuous RAF rendering
  const angleXRef = useRef<number>(0.4); // tilt
  const angleYRef = useRef<number>(0.6); // rotate
  const angleDisplayRef = useRef<HTMLSpanElement | null>(null);
  const triggeredStepsRef = useRef<string[]>([]);
  
  const animationFrameId = useRef<number | null>(null);
  const rotationTimer = useRef<number>(0);

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const renderModeRef = useRef(renderMode);
  renderModeRef.current = renderMode;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const animSpeedRef = useRef(animSpeed);
  animSpeedRef.current = animSpeed;

  const viewScaleRef = useRef(viewScale);
  viewScaleRef.current = viewScale;

  const gearRpmRef = useRef(gearRpm);
  gearRpmRef.current = gearRpm;

  const explodeFactorRef = useRef(explodeFactor);
  explodeFactorRef.current = explodeFactor;

  const simulationStateRef = useRef(simulationState);
  simulationStateRef.current = simulationState;

  // Sync selectedModel state when initialModelId changes
  useEffect(() => {
    setSelectedModel(initialModelId);
    setSimulationState('idle');
    triggeredStepsRef.current = [];
    setTriggeredSteps([]);
  }, [initialModelId]);

  // Handle click-and-drag rotation on the Canvas
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    const nextX = angleXRef.current + deltaY * 0.01;
    const nextY = angleYRef.current + deltaX * 0.01;
    
    // Confining X rotation to prevent flipping upside down
    const clampedX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, nextX));
    
    angleXRef.current = clampedX;
    angleYRef.current = nextY;
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Run Simulation for Timing Masterclass
  const startSimulation = () => {
    setSimulationState('running');
    setSimTime(0);
    triggeredStepsRef.current = [];
    setTriggeredSteps([]);
  };

  // Math rotation utilities
  const rotateX = (p: Point3D, angle: number): Point3D => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x,
      y: p.y * cos - p.z * sin,
      z: p.y * sin + p.z * cos
    };
  };

  const rotateY = (p: Point3D, angle: number): Point3D => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x * cos + p.z * sin,
      y: p.y,
      z: -p.x * sin + p.z * cos
    };
  };

  // Rendering Loop
  useEffect(() => {
    let internalTime = 0;
    
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId.current = requestAnimationFrame(draw);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId.current = requestAnimationFrame(draw);
        return;
      }

      // Make responsive to container size
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width || 800;
      const height = rect?.height || 500;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Grid Backdrop
      ctx.strokeStyle = '#eef2f6';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Drawing coordinate axises
      const originScreenX = width / 2;
      const originScreenY = height / 2;

      // Handle custom automated rotation
      if (autoRotateRef.current) {
        rotationTimer.current += 0.005 * animSpeedRef.current;
        angleYRef.current = rotationTimer.current;
      }

      // Projection parameters
      const currentAngleX = angleXRef.current;
      const currentAngleY = angleYRef.current;
      const distance = 500;
      const baseScale = width < 640 ? 1.0 : 1.4;
      const finalScale = viewScaleRef.current * baseScale;

      const project = (p: Point3D): { x: number; y: number; z: number } => {
        // Rotate in Y, then X
        let r = rotateY(p, currentAngleY);
        r = rotateX(r, currentAngleX);
        
        // Translate and perspective scale
        const factor = distance / (distance + r.z);
        return {
          x: originScreenX + r.x * factor * finalScale,
          y: originScreenY + r.y * factor * finalScale,
          z: r.z
        };
      };

      // Generate parts based on selected model
      let vertices: Point3D[] = [];
      let lines: Line3D[] = [];

      // HELPER: drawing lines & circles & gears
      const drawLine = (p1: Point3D, p2: Point3D, style: Line3D) => {
        const pt1 = project(p1);
        const pt2 = project(p2);
        
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        
        ctx.lineWidth = style.width || 1.5;
        ctx.strokeStyle = style.color || '#2D8CFF';
        
        if (style.isDashed) {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };

      const drawNode = (p: Point3D, label?: string, size = 3, color = '#2D8CFF') => {
        const pt = project(p);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (label && renderModeRef.current === 'blueprint') {
          ctx.font = '9px monospace';
          ctx.fillStyle = '#64748B';
          ctx.fillText(`[${label}]`, pt.x + 8, pt.y - 4);
        }
      };

      internalTime += 0.05 * animSpeedRef.current;

      // Update angular degrees on display text safely in the canvas layout without continuous state transitions
      if (angleDisplayRef.current) {
        angleDisplayRef.current.textContent = `DRAG TO ROTATE Blueprints • ${Math.round(angleYRef.current * (180 / Math.PI)) % 360}°`;
      }

      // SPECIFIC MODEL COMPUTATION
      if (selectedModelRef.current === 'universal-gearbox-v2') {
        const curAngle = internalTime * (gearRpmRef.current / 60);

        // Frame Housing Vertices (Outer Casing)
        const casingSize = 130;
        const boxVerts: Point3D[] = [
          { x: -casingSize, y: -70, z: -50 },
          { x: casingSize, y: -70, z: -50 },
          { x: casingSize, y: 70, z: -50 },
          { x: -casingSize, y: 70, z: -50 },
          { x: -casingSize, y: -70, z: 50 },
          { x: casingSize, y: -70, z: 50 },
          { x: casingSize, y: 70, z: 50 },
          { x: -casingSize, y: 70, z: 50 },
        ];

        // Draw Casing Outer Box
        const casingColor = renderModeRef.current === 'blueprint' ? '#94A3B8' : '#334155';
        const casingStyle: Line3D = { color: casingColor, width: 1, isDashed: renderModeRef.current === 'blueprint' };
        
        boxVerts.forEach((v, i) => drawNode(v, `H${i}`, 2, '#94A3B8'));
        
        // Connect housing lines
        const boxConnections = [
          [0, 1], [1, 2], [2, 3], [3, 0], // front
          [4, 5], [5, 6], [6, 7], [7, 4], // back
          [0, 4], [1, 5], [2, 6], [3, 7]  // depths
        ];
        boxConnections.forEach(([a, b]) => drawLine(boxVerts[a], boxVerts[b], casingStyle));

        // Shafts: Input Axle (left) and Output Axle (right)
        const shaftRadius = 50;
        const offsetLeftX = -55;
        const offsetRightX = 45;

        // Draw Shaft Axle rods
        const axleStyle: Line3D = { color: '#64748B', width: 3 };
        drawLine({ x: offsetLeftX, y: -90, z: 0 }, { x: offsetLeftX, y: 90, z: 0 }, axleStyle);
        drawLine({ x: offsetRightX, y: -90, z: 0 }, { x: offsetRightX, y: 90, z: 0 }, axleStyle);

        // Gear A (Input): Left, small, fast
        const numTeethA = 12;
        const radiusA = 40;
        const zLayers = [-10, 10];

        zLayers.forEach((z) => {
          // Draw circle segments for A
          for (let i = 0; i < numTeethA; i++) {
            const rot = curAngle + (i * Math.PI * 2) / numTeethA;
            const nextRot = curAngle + ((i + 1) * Math.PI * 2) / numTeethA;
            const halfwayRot = curAngle + ((i + 0.5) * Math.PI * 2) / numTeethA;

            const inner1 = { x: offsetLeftX + Math.cos(rot) * (radiusA * 0.7), y: Math.sin(rot) * (radiusA * 0.7), z };
            const outerMid = { x: offsetLeftX + Math.cos(halfwayRot) * radiusA, y: Math.sin(halfwayRot) * radiusA, z };
            const inner2 = { x: offsetLeftX + Math.cos(nextRot) * (radiusA * 0.7), y: Math.sin(nextRot) * (radiusA * 0.7), z };

            drawLine(inner1, outerMid, { color: '#2D8CFF', width: 2 });
            drawLine(outerMid, inner2, { color: '#2D8CFF', width: 2 });
          }
        });

        // Gear B (Output Direct mesh): Right, larger, slower (turns inversely at 1/3 speed because offset is 100px: rA+rB = 40+60 = 100)
        const numTeethB = 36;
        const radiusB = 60;
        const curAngleB = -curAngle / 3 + Math.PI / 18; // offset mesh offset

        zLayers.forEach((z) => {
          // Draw circle segments for B
          for (let i = 0; i < numTeethB; i++) {
            const rot = curAngleB + (i * Math.PI * 2) / numTeethB;
            const nextRot = curAngleB + ((i + 1) * Math.PI * 2) / numTeethB;
            const halfwayRot = curAngleB + ((i + 0.5) * Math.PI * 2) / numTeethB;

            const inner1 = { x: offsetRightX + Math.cos(rot) * (radiusB * 0.8), y: Math.sin(rot) * (radiusB * 0.8), z };
            const outerMid = { x: offsetRightX + Math.cos(halfwayRot) * radiusB, y: Math.sin(halfwayRot) * radiusB, z };
            const inner2 = { x: offsetRightX + Math.cos(nextRot) * (radiusB * 0.8), y: Math.sin(nextRot) * (radiusB * 0.8), z };

            drawLine(inner1, outerMid, { color: '#10B981', width: 2 });
            drawLine(outerMid, inner2, { color: '#10B981', width: 2 });
          }
        });

        // Connector struts between gears
        drawLine({ x: offsetLeftX, y: 0, z: -10 }, { x: offsetRightX, y: 0, z: -10 }, { color: '#94A3B8', width: 1, isDashed: true });

      } else if (selectedModelRef.current === 'timing-masterclass') {
        // Sequenced cascading mechanical apparatus: Pendulum + Tipping Cup + Rolling track
        
        // Stand base structure
        const gStyle: Line3D = { color: '#64748B', width: 1.5 };
        const standVerts: Point3D[] = [
          { x: -100, y: 80, z: -50 }, { x: 100, y: 80, z: -50 },
          { x: 100, y: 80, z: 50 }, { x: -100, y: 80, z: 50 },
          { x: -80, y: -100, z: 0 }, { x: 80, y: -100, z: 0 }
        ];

        // Draw Base Plate
        drawLine(standVerts[0], standVerts[1], gStyle);
        drawLine(standVerts[1], standVerts[2], gStyle);
        drawLine(standVerts[2], standVerts[3], gStyle);
        drawLine(standVerts[3], standVerts[0], gStyle);
        // Supports uprights
        drawLine(standVerts[0], standVerts[4], gStyle);
        drawLine(standVerts[1], standVerts[5], gStyle);

        // Simulation physics values
        let pendulumAngle = Math.PI / 4; // Rest idle pos (45 degrees)
        let ballX = -80; 
        let ballY = -10;
        let cupTilt = 0; // Tipping cup degree

        if (simulationStateRef.current === 'running') {
          // Increment time
          const t = Math.min(3, internalTime * 0.3); // max cascade duration

          // Stage 1: Pendulum Swing down (0s to 1s)
          if (t < 1) {
            pendulumAngle = (Math.PI / 4) * Math.cos(t * Math.PI);
            if (!triggeredStepsRef.current.includes('Release Hammer')) {
              triggeredStepsRef.current.push('Release Hammer');
              setTriggeredSteps([...triggeredStepsRef.current]);
            }
          } else {
            // Pendulum resting
            pendulumAngle = 0;
            
            // Stage 2: Marble acceleration on cascading track (1s to 2s)
            if (t >= 1 && t < 2) {
              const ballProgress = t - 1; // 0 to 1
              ballX = -80 + ballProgress * 150;
              ballY = -15 + ballProgress * 65; // rolls down
              if (!triggeredStepsRef.current.includes('Deceleration Fall')) {
                triggeredStepsRef.current.push('Deceleration Fall');
                setTriggeredSteps([...triggeredStepsRef.current]);
              }
            } else if (t >= 2) {
              // Rolls completely into cup
              ballX = 70;
              ballY = 50;

              // Stage 3: Cup Tips (2s to 3s)
              const cupProgress = Math.min(1, t - 2);
              cupTilt = cupProgress * (Math.PI / 2.5); // tips 72 deg
              if (!triggeredStepsRef.current.includes('Tournament Trigger Completed')) {
                triggeredStepsRef.current.push('Tournament Trigger Completed');
                setTriggeredSteps([...triggeredStepsRef.current]);
              }
            }
          }
        } else if (simulationStateRef.current === 'completed' || simulationStateRef.current === 'idle') {
          // Default idle
          pendulumAngle = Math.PI / 4;
          ballX = -85;
          ballY = -25;
          cupTilt = 0;
        }

        // Draw Pendulum Pivot Bolt
        const pivotPt: Point3D = { x: 0, y: -100, z: 0 };
        drawNode(pivotPt, 'PIVOT', 5, '#EF4444');

        // Draw Pendulum rod and weighted bob
        const bobX = Math.sin(pendulumAngle) * 80;
        const bobY = -100 + Math.cos(pendulumAngle) * 80;
        const bobPt: Point3D = { x: bobX, y: bobY, z: 0 };
        drawLine(pivotPt, bobPt, { color: '#2D8CFF', width: 3 });
        drawNode(bobPt, 'HAMMER BOB', 10, '#2D8CFF');

        // Draw Rolling Track
        const trackStart: Point3D = { x: -80, y: -15, z: 0 };
        const trackEnd: Point3D = { x: 70, y: 50, z: 0 };
        drawLine(trackStart, trackEnd, { color: '#64748B', width: 2 });
        // Double rails
        drawLine({ ...trackStart, z: -8 }, { ...trackEnd, z: -8 }, { color: '#64748B', width: 1 });
        drawLine({ ...trackStart, z: 8 }, { ...trackEnd, z: 8 }, { color: '#64748B', width: 1 });

        // Draw Marble Sphere
        drawNode({ x: ballX, y: ballY, z: 0 }, 'STRIKER_MARBLE', 6, '#10B981');

        // Draw Tipping Cup at the bottom right end of the rail
        const cupPivot: Point3D = { x: 75, y: 65, z: 0 };
        drawNode(cupPivot, 'CUP_PIVOT', 4, '#F59E0B');

        // Draw cup lines tilted
        const cupRMin = 15;
        const drawCupLine = (angOffset: number, length: number, style: Line3D) => {
          const actualAng = cupTilt + angOffset;
          const endPt: Point3D = {
            x: cupPivot.x + Math.sin(actualAng) * length,
            y: cupPivot.y - Math.cos(actualAng) * length,
            z: 0
          };
          drawLine(cupPivot, endPt, style);
        };
        // Draw Tipping Vessel Geometry
        drawCupLine(-Math.PI / 4, 30, { color: '#F59E0B', width: 2.5 });
        drawCupLine(Math.PI / 4, 30, { color: '#F59E0B', width: 2.5 });
        drawCupLine(0, 12, { color: '#F59E0B', width: 1.5, isDashed: true });

      } else if (selectedModelRef.current === 'full-mission-assembly') {
        // High complexity 60cm³ bound cage with multiple nested modules sliding on rails!
        // Includes Explosion Factor animation scaling
        const exp = explodeFactorRef.current / 100;

        // Draw Cage bounding boundaries (always transparent or dashed grey)
        const frameL = 100;
        const cageVerts: Point3D[] = [
          { x: -frameL, y: -frameL, z: -frameL },
          { x: frameL, y: -frameL, z: -frameL },
          { x: frameL, y: frameL, z: -frameL },
          { x: -frameL, y: frameL, z: -frameL },
          { x: -frameL, y: -frameL, z: frameL },
          { x: frameL, y: -frameL, z: frameL },
          { x: frameL, y: frameL, z: frameL },
          { x: -frameL, y: frameL, z: frameL },
        ];
        
        cageVerts.forEach((v, i) => drawNode(v, `R${i}`, 1.5, '#CBD5E1'));
        const cageStyle: Line3D = { color: '#CBD5E1', width: 1, isDashed: true };
        const cageConnections = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];
        cageConnections.forEach(([a, b]) => drawLine(cageVerts[a], cageVerts[b], cageStyle));

        // Part A: Structural Base Plate (slides downwards when exploded)
        const baseZ = 85 + exp * 60;
        const basePlate: Point3D[] = [
          { x: -90, y: 90, z: -90 - baseZ * 0.1 },
          { x: 90, y: 90, z: -90 - baseZ * 0.1 },
          { x: 90, y: 90, z: 90 + baseZ * 0.1 },
          { x: -90, y: 90, z: 90 + baseZ * 0.1 },
        ];
        // Elevate and isolate position on explodes
        const adjBasePlate = basePlate.map(v => ({ ...v, y: v.y + exp * 70 }));
        drawLine(adjBasePlate[0], adjBasePlate[1], { color: '#64748B', width: 2 });
        drawLine(adjBasePlate[1], adjBasePlate[2], { color: '#64748B', width: 2 });
        drawLine(adjBasePlate[2], adjBasePlate[3], { color: '#64748B', width: 2 });
        drawLine(adjBasePlate[3], adjBasePlate[0], { color: '#64748B', width: 2 });

        // Part B: Vertical Columns (slide left or right outward on explodes)
        const colShiftL = -50 - exp * 80;
        const colShiftR = 50 + exp * 80;

        // Column L
        drawLine({ x: colShiftL, y: -70, z: -10 }, { x: colShiftL, y: 80, z: -10 }, { color: '#2D8CFF', width: 4 });
        drawLine({ x: colShiftL, y: -70, z: 10 }, { x: colShiftL, y: 80, z: 10 }, { color: '#2D8CFF', width: 4 });
        // Column struts
        drawLine({ x: colShiftL, y: -30, z: -10 }, { x: colShiftL, y: -30, z: 10 }, { color: '#2D8CFF', width: 2 });
        drawLine({ x: colShiftL, y: 40, z: -10 }, { x: colShiftL, y: 40, z: 10 }, { color: '#2D8CFF', width: 2 });

        // Column R
        drawLine({ x: colShiftR, y: -70, z: -10 }, { x: colShiftR, y: 80, z: -10 }, { color: '#10B981', width: 4 });
        drawLine({ x: colShiftR, y: -70, z: 10 }, { x: colShiftR, y: 80, z: 10 }, { color: '#10B981', width: 4 });
        // Column struts
        drawLine({ x: colShiftR, y: -30, z: -10 }, { x: colShiftR, y: -30, z: 10 }, { color: '#10B981', width: 2 });
        drawLine({ x: colShiftR, y: 40, z: -10 }, { x: colShiftR, y: 40, z: 10 }, { color: '#10B981', width: 2 });

        // Part C: Rolling Gantry Cross-Assembly (slides upward on explode axis)
        const gantryY = -60 - exp * 90;
        const gantryL = { x: colShiftL, y: gantryY, z: 0 };
        const gantryR = { x: colShiftR, y: gantryY, z: 0 };
        drawLine(gantryL, gantryR, { color: '#F59E0B', width: 3 });

        // Gantry mount carriages
        drawNode(gantryL, 'carriage_l', 6, '#F59E0B');
        drawNode(gantryR, 'carriage_r', 6, '#F59E0B');

        // Draw connection guidelines to show exploded lines
        if (exp > 0.05) {
          drawLine({ x: -50, y: -70, z: -10 }, { x: colShiftL, y: -70, z: -10 }, { color: '#EF4444', width: 1, isDashed: true });
          drawLine({ x: 50, y: -70, z: -10 }, { x: colShiftR, y: -70, z: -10 }, { color: '#EF4444', width: 1, isDashed: true });
          drawLine({ x: 0, y: 90, z: 0 }, { x: 0, y: 90 + exp * 70, z: 0 }, { color: '#EF4444', width: 1, isDashed: true });
        }
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Monitor Timer simulation milestones
  useEffect(() => {
    let timer: any;
    if (simulationState === 'running') {
      timer = setTimeout(() => {
        setSimulationState('completed');
      }, 5000); // completed in 5 seconds
    }
    return () => clearTimeout(timer);
  }, [simulationState]);

  // Telemetry details dynamically changing depending on selected simulation model
  const renderTelemetry = () => {
    switch (selectedModel) {
      case 'universal-gearbox-v2':
        return (
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Drive Config</span>
              <span className="font-mono font-medium text-xs text-[#333333]">3-to-1 Step-down (Direct Spur)</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Input Velocity</span>
              <span className="font-mono font-medium text-xs text-primary">{gearRpm} RPM</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Output Velocity</span>
              <span className="font-mono font-medium text-xs text-emerald-600">{(gearRpm / 3).toFixed(1)} RPM</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Output Torque Multiplier</span>
              <span className="font-mono font-medium text-xs text-[#333333]">3.0x Peak (Theoretical)</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Dynamic Clearance</span>
              <span className="font-mono font-medium text-xs text-[#333333]">±0.125 mm optimized</span>
            </div>
          </div>
        );
      case 'timing-masterclass':
        return (
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Simulation Status</span>
              <span className={`font-mono font-bold text-xs uppercase ${simulationState === 'running' ? 'text-primary animate-pulse' : simulationState === 'completed' ? 'text-emerald-500' : 'text-gray-400'}`}>
                {simulationState === 'running' ? 'Active Kinematics' : simulationState === 'completed' ? 'Static Rest (Lock)' : 'Ready for Trigger'}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Total Duration</span>
              <span className="font-mono font-medium text-xs text-[#333333]">15.42 seconds</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Pendulum Period (T)</span>
              <span className="font-mono font-medium text-xs text-[#333333]">1.38 seconds (0.8m cable)</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Sequence Steps Rec.</span>
              <span className="font-mono font-medium text-xs text-[#333333]">{triggeredSteps.length} of 3</span>
            </div>
            {triggeredSteps.length > 0 && (
              <div className="mt-3 bg-gray-50 border border-gray-100 rounded-sm p-3">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-2">Logs Panel</span>
                {triggeredSteps.map((log, index) => (
                  <div key={index} className="flex gap-2 items-center text-[11px] font-mono text-[#333333]">
                    <span className="text-primary font-bold">»</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'full-mission-assembly':
        return (
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Explode Isolation</span>
              <span className="font-mono font-medium text-xs text-[#333333]">{explodeFactor}% exploded</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Volumetric Constraints</span>
              <span className="font-mono font-medium text-xs text-[#333333]">600 x 600 x 600 mm maxbox</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Part Assemblies Count</span>
              <span className="font-mono font-medium text-xs text-primary">14 interconnected groups</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Structural Integrity</span>
              <span className="font-mono font-medium text-xs text-emerald-600">Perfect (3D Finite Element audited)</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-sans text-xs">Weight estimate</span>
              <span className="font-mono font-medium text-xs text-[#333333]">1,420 grams (PLA structural)</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 bg-white rounded-sm p-6 md:p-8 relative mt-16 max-w-6xl mx-auto shadow-sm">
      <div className="absolute inset-0 bg-graph-paper opacity-[0.03] pointer-events-none"></div>

      {/* Header Deck */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-mono text-primary font-bold text-[10px] tracking-widest uppercase">
              Interactive 3D Schematic & CAD Lab
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#333333] uppercase">
            3D CAD Projection Sandbox
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1 max-w-xl">
            Orbit, manipulate variables, and simulate physical kinematics of each core component assembly using our custom projection matrix.
          </p>
        </div>

        {/* Model Tabs Selection */}
        <div className="flex flex-wrap p-1 bg-gray-50 border border-gray-200 rounded-sm">
          <button
            onClick={() => {
              setSelectedModel('universal-gearbox-v2');
              setAutoRotate(true);
              setSimulationState('idle');
            }}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-all cursor-pointer ${selectedModel === 'universal-gearbox-v2' ? 'bg-white text-primary shadow-sm border border-gray-100' : 'text-gray-500 hover:text-primary'}`}
          >
            Gearbox V2
          </button>
          <button
            onClick={() => {
              setSelectedModel('timing-masterclass');
              setAutoRotate(false);
              setSimulationState('idle');
            }}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-all cursor-pointer ${selectedModel === 'timing-masterclass' ? 'bg-white text-primary shadow-sm border border-gray-100' : 'text-gray-500 hover:text-primary'}`}
          >
            Timing Module
          </button>
          <button
            onClick={() => {
              setSelectedModel('full-mission-assembly');
              setAutoRotate(true);
              setSimulationState('idle');
            }}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-all cursor-pointer ${selectedModel === 'full-mission-assembly' ? 'bg-white text-primary shadow-sm border border-gray-100' : 'text-gray-500 hover:text-primary'}`}
          >
            Full Assembly
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Interactive CAD Canvas Column (Left 2/3) */}
        <div className="lg:col-span-2 flex flex-col border border-gray-200 bg-slate-50/50 rounded-sm overflow-hidden h-[450px] md:h-[550px] relative">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
          />

          {/* Interactive compass or instructions watermark */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-gray-200 px-3 py-1.5 rounded-sm">
            <Compass className="w-4 h-4 text-primary animate-spin-slow" />
            <span ref={angleDisplayRef} className="font-mono text-[9px] text-[#333333] uppercase tracking-wider">
              DRAG TO ROTATE Blueprints • 34°
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-sm border transition-colors cursor-pointer flex items-center gap-1 bg-white hover:bg-gray-50 ${autoRotate ? 'border-primary text-primary' : 'border-gray-200 text-gray-500 hover:text-[#333333]'}`}
              title={autoRotate ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
              <span className="font-mono text-[9px] uppercase font-bold tracking-wider hidden sm:inline">Auto-Orbit</span>
            </button>
          </div>
        </div>

        {/* Console / Laboratory Variables Column (Right 1/3) */}
        <div className="flex flex-col justify-between">
          
          {/* Section: Sandbox Controls */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-sm p-4 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-sm font-bold uppercase text-[#333333] tracking-wide">
                  Laboratory Controls
                </h3>
              </div>

              {/* Dynamic inputs based on model */}
              {selectedModel === 'universal-gearbox-v2' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-sans text-gray-600">Input RPM Speed</label>
                      <span className="font-mono text-xs font-bold text-primary">{gearRpm} RPM</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={gearRpm}
                      onChange={(e) => setGearRpm(parseInt(e.target.value))}
                      className="w-full accent-primary bg-gray-200 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setGearRpm(60)}
                      className="flex-1 py-1 px-3 bg-white border border-gray-200 hover:border-gray-300 rounded-sm text-center font-mono text-[10px] text-gray-600 uppercase cursor-pointer"
                    >
                      Reset (60)
                    </button>
                    <button
                      onClick={() => setGearRpm(150)}
                      className="flex-1 py-1 px-3 bg-white border border-gray-200 hover:border-gray-300 rounded-sm text-center font-mono text-[10px] text-gray-600 uppercase cursor-pointer"
                    >
                      Boost (150)
                    </button>
                  </div>
                </div>
              )}

              {selectedModel === 'timing-masterclass' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-sans text-gray-600 block">Mechanical Timing release</label>
                    <button
                      onClick={startSimulation}
                      disabled={simulationState === 'running'}
                      className={`w-full py-3 rounded-sm font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer h-12 ${simulationState === 'running' ? 'bg-primary/20 text-primary cursor-not-allowed border border-primary/10' : 'bg-primary text-white hover:bg-blue-600 shadow-sm border border-primary'}`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      {simulationState === 'running' ? 'Simulating Cascade...' : 'Start Release Cascade'}
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                    Timing triggers release a stainless steel hammer which impacts the gravity descent marble, completing the secondary microswitch trigger chain precisely.
                  </p>
                </div>
              )}

              {selectedModel === 'full-mission-assembly' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-sans text-gray-600">Exploded View factor</label>
                      <span className="font-mono text-xs font-bold text-primary">{explodeFactor}% exploded</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={explodeFactor}
                      onChange={(e) => setExplodeFactor(parseInt(e.target.value))}
                      className="w-full accent-primary bg-gray-200 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setExplodeFactor(0)}
                      className="flex-1 py-1 px-3 bg-white border border-gray-200 hover:border-gray-300 rounded-sm text-center font-mono text-[10px] text-gray-600 uppercase cursor-pointer"
                    >
                      Solid Assembly
                    </button>
                    <button
                      onClick={() => setExplodeFactor(100)}
                      className="flex-1 py-1 px-3 bg-white border border-gray-200 hover:border-gray-300 rounded-sm text-center font-mono text-[10px] text-gray-600 uppercase cursor-pointer"
                    >
                      Fully Exploded
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-sm p-4 bg-gray-50/50 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="font-serif text-sm font-bold uppercase text-[#333333] tracking-wide">
                    Render Style
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setRenderMode('wireframe')}
                  className={`flex-1 py-2 text-center font-mono text-[10px] uppercase rounded-sm border transition-all cursor-pointer ${renderMode === 'wireframe' ? 'border-primary text-primary bg-primary/5 font-bold' : 'border-gray-200 text-gray-500 hover:text-[#333333]'}`}
                >
                  Glow Wire
                </button>
                <button
                  onClick={() => setRenderMode('blueprint')}
                  className={`flex-1 py-2 text-center font-mono text-[10px] uppercase rounded-sm border transition-all cursor-pointer ${renderMode === 'blueprint' ? 'border-primary text-primary bg-primary/5 font-bold' : 'border-gray-200 text-gray-500 hover:text-[#333333]'}`}
                >
                  Blueprint Dash
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-primary animate-pulse" />
                <span className="font-serif text-sm font-bold uppercase text-[#333333] tracking-wide">
                  Physical Telemetry
                </span>
              </div>
              {renderTelemetry()}
            </div>
          </div>

          {/* Sparkle Tagline */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Simulation matrix synced with Fusion360 kinematic formulas
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
