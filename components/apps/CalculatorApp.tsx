"use client";

import { useState } from "react";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputValue = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const percentage = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(display);
    } else if (operator) {
      const currentValue = prevValue ? parseFloat(prevValue) : 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setDisplay(String(newValue));
      setPrevValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev: number, next: number, op: string) => {
    switch (op) {
      case "+":
        return prev + next;
      case "-":
        return prev - next;
      case "×":
        return prev * next;
      case "÷":
        return prev / next;
      default:
        return next;
    }
  };

  const Button = ({
    label,
    onClick,
    type = "neutral",
    className = "",
  }: {
    label: string;
    onClick: () => void;
    type?: "neutral" | "operator" | "action";
    className?: string;
  }) => {
    let bg = "bg-[#333333] hover:bg-[#3f3f3f]";
    let text = "text-white";

    if (type === "operator") {
      bg = "bg-[#FF9F0A] hover:bg-[#ffb03b]";
      text = "text-white";
      // Highlight active operator
      if (operator === label && waitingForOperand) {
        bg = "bg-white text-[#FF9F0A]";
      }
    } else if (type === "action") {
      bg = "bg-[#A5A5A5] hover:bg-[#bfbfbf]";
      text = "text-black";
    }

    return (
      <button
        onClick={onClick}
        className={`w-16 h-16 rounded-full text-2xl font-medium flex items-center justify-center transition-colors active:scale-95 duration-100 ${bg} ${text} ${className}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[320px]">
        {/* Display */}
        <div className="text-right px-4 mb-4">
          <span className="text-6xl font-light text-white break-all">
            {parseFloat(display).toLocaleString("en-US", {
              maximumFractionDigits: 6,
            })}
          </span>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            label={display === "0" ? "AC" : "C"}
            onClick={clear}
            type="action"
          />
          <Button label="±" onClick={toggleSign} type="action" />
          <Button label="%" onClick={percentage} type="action" />
          <Button
            label="÷"
            onClick={() => performOperation("÷")}
            type="operator"
          />

          <Button label="7" onClick={() => inputValue("7")} />
          <Button label="8" onClick={() => inputValue("8")} />
          <Button label="9" onClick={() => inputValue("9")} />
          <Button
            label="×"
            onClick={() => performOperation("×")}
            type="operator"
          />

          <Button label="4" onClick={() => inputValue("4")} />
          <Button label="5" onClick={() => inputValue("5")} />
          <Button label="6" onClick={() => inputValue("6")} />
          <Button
            label="-"
            onClick={() => performOperation("-")}
            type="operator"
          />

          <Button label="1" onClick={() => inputValue("1")} />
          <Button label="2" onClick={() => inputValue("2")} />
          <Button label="3" onClick={() => inputValue("3")} />
          <Button
            label="+"
            onClick={() => performOperation("+")}
            type="operator"
          />

          <Button
            label="0"
            onClick={() => inputValue("0")}
            className="col-span-2 w-full !aspect-auto"
          />
          <Button label="." onClick={inputDot} />
          <Button
            label="="
            onClick={() => performOperation("=")}
            type="operator"
          />
        </div>
      </div>
    </div>
  );
}
