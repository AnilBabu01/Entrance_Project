import React from "react";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Index: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  isLoading = false,
  disabled = false,
  style,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`defaultBtn ${className}`}
      style={style}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Index;
