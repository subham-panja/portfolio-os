"use client";

import { useState, useRef, useEffect } from "react";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function TerminalApp() {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div className="mb-2">
          <p>Welcome to Portfolio OS v1.0.0</p>
          <p>
            Type <span className="text-yellow-400">&apos;help&apos;</span> to
            see available commands.
          </p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode;

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-blue-300">
            <p>Available commands:</p>
            <p>
              {" "}
              <span className="text-yellow-400">about</span> - Who am I?
            </p>
            <p>
              {" "}
              <span className="text-yellow-400">experience</span> - My work
              history
            </p>
            <p>
              {" "}
              <span className="text-yellow-400">projects</span> - Cool stuff I
              built
            </p>
            <p>
              {" "}
              <span className="text-yellow-400">contact</span> - Get in touch
            </p>
            <p>
              {" "}
              <span className="text-yellow-400">clear</span> - Clear terminal
            </p>
            <p>
              {" "}
              <span className="text-yellow-400">whoami</span> - Current user
            </p>
          </div>
        );
        break;
      case "about":
        output = (
          <p>
            I&apos;m{" "}
            <span className="font-bold text-green-400">Subham Panja</span>, a
            Senior Software Engineer & Technical Lead. I build scalable,
            AI-powered applications.
          </p>
        );
        break;
      case "experience":
        output = (
          <div>
            <p className="font-bold text-purple-400">
              Spring Financial Inc. (2023 - Present)
            </p>
            <p className="text-sm">Senior Software Engineer & Tech Lead</p>
            <br />
            <p className="font-bold text-purple-400">
              AtlasX Inc. (2022 - 2023)
            </p>
            <p className="text-sm">Software Developer</p>
          </div>
        );
        break;
      case "projects":
        output = (
          <div>
            <p className="font-bold text-blue-400">Bloom</p>
            <p className="text-sm mb-2">
              AI-enhanced paywall system ($50K+ ARR)
            </p>
            <p className="font-bold text-blue-400">Real Estate AI Pipeline</p>
            <p className="text-sm">ML-based deal scoring & analytics</p>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="space-y-1">
            <p>📧 subhampanja28@gmail.com</p>
            <p>🔗 linkedin.com/in/subhampanja</p>
            <p>🐙 github.com/subham-panja</p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "whoami":
        output = <p className="text-green-400">guest@portfolio-os</p>;
        break;
      case "":
        output = null;
        break;
      default:
        output = (
          <p className="text-red-400">Command not found: {trimmedCmd}</p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="h-full bg-black/90 text-green-500 font-mono p-4 text-sm overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-blue-400">➜</span>
            <span className="text-pink-400">~</span>
            <span>{item.command}</span>
          </div>
          {item.output && (
            <div className="ml-4 mt-1 text-white/90">{item.output}</div>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-blue-400">➜</span>
        <span className="text-pink-400">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white/90 caret-white"
          autoFocus
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
