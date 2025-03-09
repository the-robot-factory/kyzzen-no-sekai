import React, {PropsWithChildren, useState} from 'react';
import './tooltip.css';

interface TooltipProps {
  text: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start';
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({text, placement = 'bottom', children}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && (
        <div className={`tooltip tooltip-${placement}`}>
          <p className="w-full"> {text}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
