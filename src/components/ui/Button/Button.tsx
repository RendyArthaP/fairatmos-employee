import { type FC, type PropsWithChildren } from "react";
import Spinner from "../Spinnner/Spinner";

interface ButtonProps {
  label: string;
  bgColor?: string;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  label,
  bgColor,
  disabled = false,
  loading = false,
  onClick,
  className,
}) => {
  const baseClass =
    "px-5 py-2 rounded-md font-semibold transition-all duration-150 flex items-center justify-center";

  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${bgColor} ${disabledClass} ${className}`}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : <span className="text-xs">{label}</span>}
    </button>
  );
};

export default Button;
