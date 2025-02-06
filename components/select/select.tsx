// Select.tsx
import React, {useCallback, useMemo, useState} from 'react';
import styles from './select.module.css';
import useClose from '@/hooks/useClose';

export type Option = {
  label: string | React.ReactNode;
  value: string;
  disabled?: boolean;
  clickable?: boolean;
};

interface SelectProps {
  idx?: number;
  name: string;
  label?: string;
  options?: Option[];
  defaultValue?: Option;
  showWarning?: boolean;
  placement?: 'left' | 'right';
  isPassenger?: boolean;
  handleChange: (value: string, name: string, idx?: number) => void;
}

const Select = ({idx, label, name, options, defaultValue, showWarning, placement = 'left', handleChange}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | undefined>(defaultValue);
  const ref = useClose(() => setIsOpen(false));

  const toggleSelect = useCallback(() => setIsOpen(prev => !prev), []);

  const handleSelect = useCallback(
    (option: Option) => {
      if (option.disabled) return;

      const newValue = option.clickable === false ? {...option, label: option.value, value: option.value} : option;

      setSelectedValue(newValue);
      setIsOpen(false);
      handleChange(newValue.value, name, idx);
    },
    [handleChange, name, idx],
  );

  const dropdownStyle = useMemo(
    () => ({
      [placement]: '0%',
    }),
    [placement],
  );

  const displayValue = useMemo(() => {
    return selectedValue?.label || '';
  }, [selectedValue]);

  const truncatedLabel = useCallback((label: string) => {
    if (label.length <= 32) return label;
    return `${label.slice(0, 32)}...`;
  }, []);

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.selectWrapper}>
        <div
          className={`${styles.selectInput} ${showWarning ? styles.warning : ''}`}
          onClick={toggleSelect}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {label && <label className={styles.label}>{label}</label>}
          <div className={styles.valueContainer}>
            <span className={styles.value}>{typeof displayValue === 'string' ? truncatedLabel(displayValue) : displayValue}</span>
            <span className={`${styles.caret} ${isOpen ? styles.rotated : ''}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>

        {isOpen && (
          <div className={styles.dropdownContainer}>
            <ul className={styles.dropdownList} style={dropdownStyle} role="listbox">
              {options?.map((option, index) => (
                <li
                  key={`${name}-option-${index}`}
                  className={`${styles.option} ${option.disabled ? styles.disabled : ''}`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={selectedValue?.value === option.value}
                >
                  {typeof option.label === 'string' ? truncatedLabel(option.label) : option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
