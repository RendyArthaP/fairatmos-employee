import React, { type FC, type PropsWithChildren } from "react";
import { capitalizeFirstLetter } from "../../../utils/stringUtils";

type HobbyPillProps = React.HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  onRemove?: () => void;
};

const Pill: FC<PropsWithChildren<HobbyPillProps>> = ({
  label,
  className = "",
  onRemove,
  ...props
}) => {
  const base =
    "inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700";

  return (
    <span {...props} className={base + (className ? " " + className : "")}>
      <span className="text-[10px] md:text-xs">
        {capitalizeFirstLetter(label ?? "")}
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-muted-foreground/20 transition-colors"
          aria-label="Remove"
        >
          <img src="/src/assets/close-icon.svg" alt="Remove" />
        </button>
      )}
    </span>
  );
};

export default Pill;
