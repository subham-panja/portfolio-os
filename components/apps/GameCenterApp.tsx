"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Trophy, ChevronLeft } from "lucide-react";

// --- Snake Game Component ---
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 100;

function SnakeGame({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize high score
  useEffect(() => {
    const saved = localStorage.getItem("snake-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setFood(generateFood());
  };

  const checkCollision = useCallback(
    (head: { x: number; y: number }) => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }
      // Self collision
      for (const segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
          return true;
        }
      }
      return false;
    },
    [snake],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        setSnake((prevSnake) => {
          const newHead = {
            x: prevSnake[0].x + direction.x,
            y: prevSnake[0].y + direction.y,
          };

          if (checkCollision(newHead)) {
            setGameOver(true);
            setIsPlaying(false);
            if (score > highScore) {
              setHighScore(score);
              localStorage.setItem("snake-highscore", score.toString());
            }
            return prevSnake;
          }

          const newSnake = [newHead, ...prevSnake];

          if (newHead.x === food.x && newHead.y === food.y) {
            setScore((s) => s + 1);
            setFood(generateFood());
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      }, GAME_SPEED);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [
    isPlaying,
    gameOver,
    direction,
    food,
    score,
    highScore,
    generateFood,
    checkCollision,
  ]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white h-full relative">
      {/* Header */}
      <div className="absolute top-4 left-4 flex gap-4">
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-sm bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20"
        >
          <ChevronLeft size={14} /> Back
        </button>
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-1">Snake</h2>
        <div className="flex gap-6 text-sm">
          <span>Score: {score}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            <Trophy size={14} /> High: {highScore}
          </span>
        </div>
      </div>

      <div
        className="bg-black border-2 border-gray-700 relative"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            className="absolute bg-green-500 rounded-sm"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            >
              <Play fill="currentColor" /> START GAME
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white gap-4">
            <h3 className="text-3xl font-bold text-red-500">GAME OVER</h3>
            <p className="text-xl">Score: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200"
            >
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-white/30 text-xs">Use Arrow Keys to Move</p>
    </div>
  );
}

// --- Main Game Center Component ---
export default function GameCenterApp() {
  const [activeGame, setActiveGame] = useState<"snake" | null>(null);

  if (activeGame === "snake") {
    return <SnakeGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span className="text-4xl">🎮</span> Game Center
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Snake Card */}
        <button
          onClick={() => setActiveGame("snake")}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 transition-all hover:scale-105 group border border-white/5"
        >
          <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-green-500/50 transition-shadow">
            🐍
          </div>
          <div>
            <h3 className="font-bold text-lg">Snake</h3>
            <p className="text-sm text-white/50">Classic Arcade</p>
          </div>
        </button>

        {/* Coming Soon Cards */}
        <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 opacity-50 border border-white/5 cursor-not-allowed">
          <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            🧱
          </div>
          <div>
            <h3 className="font-bold text-lg">Tetris</h3>
            <p className="text-sm text-white/50">Coming Soon</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 opacity-50 border border-white/5 cursor-not-allowed">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            🚀
          </div>
          <div>
            <h3 className="font-bold text-lg">Space Invaders</h3>
            <p className="text-sm text-white/50">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
