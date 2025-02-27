import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const TooltipContext = React.createContext();

function useTooltipContext() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip must be used within a Tooltip Context");
  }
  return context;
}

const Tooltip = ({ children }) => {
  const [tooltip, setTooltip] = React.useState();

  return (
    <TooltipContext.Provider value={{ tooltip, setTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
};

const TooltipTrigger = React.forwardRef(({ children }, forwardedRef) => {
  const context = useTooltipContext();
  const triggerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        context.setTooltip(undefined);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [context]);

  return (
    <g
      ref={(node) => {
        triggerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") {
          context.setTooltip({ x: event.clientX, y: event.clientY });
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          context.setTooltip(undefined);
        }
      }}
      onTouchStart={(event) => {
        context.setTooltip({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
        setTimeout(() => {
          context.setTooltip(undefined);
        }, 2000);
      }}
    >
      {children}
    </g>
  );
});

TooltipTrigger.displayName = "TooltipTrigger";

TooltipTrigger.propTypes = {
  children: PropTypes.node.isRequired,
};

const TooltipContent = React.forwardRef(({ children }, ref) => {
  const context = useTooltipContext();
  const runningOnClient = typeof document !== "undefined";
  const tooltipRef = React.useRef(null);

  const getTooltipPosition = () => {
    if (!tooltipRef.current || !context.tooltip) return {};

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;
    const willOverflowRight = context.tooltip.x + tooltipWidth + 10 > viewportWidth;

    return {
      top: context.tooltip.y - 20,
      left: willOverflowRight ? context.tooltip.x - tooltipWidth - 10 : context.tooltip.x + 10,
    };
  };

  if (!context.tooltip || !runningOnClient) {
    return null;
  }

  const isMobile = window.innerWidth < 768;

  return createPortal(
    isMobile ? (
      <div
        className="fixed h-fit z-60 w-fit rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3"
        style={{
          top: context.tooltip.y,
          left: context.tooltip.x + 20,
        }}
      >
        {children}
      </div>
    ) : (
      <div
        ref={tooltipRef}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-sm fixed z-50"
        style={getTooltipPosition()}
      >
        {children}
      </div>
    ),
    document.body
  );
});

TooltipContent.displayName = "TooltipContent";

TooltipContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Tooltip as ClientTooltip, TooltipTrigger, TooltipContent };