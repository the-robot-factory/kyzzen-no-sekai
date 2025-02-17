import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const GradientButton: React.FC<IButton> = ({ className = "", children, ...rest }) => {
  return (
    <button className={`${styles.btn_gradient} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default GradientButton;
