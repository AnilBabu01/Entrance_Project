import { useState, useEffect } from "react";
import styles from "./CustomDropdown.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";



interface DropdownItem {
  id: string | number;
  label: string; // Define a specific key if possible
  coins?: number; // Example optional field
  [key: string]: string | number | undefined; // More constrained types
}


interface CustomDropdownProps {
  items: DropdownItem[];
  labelKey: string;
  valueKey: string;
  onSelect: (item: DropdownItem) => void;
  className?: string;
  title?: string;
  selectedOption?: DropdownItem | null;
  showAmount?: boolean;
  address?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  items,
  labelKey,
  valueKey,
  onSelect,
  className = "",
  title = "",
  selectedOption = null,
  showAmount = false,
  address = "",
}) => {
  const [selectedValue, setSelectedValue] = useState<DropdownItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(selectedOption ?? null);
  }, [selectedOption]);

  useEffect(() => {
    if (selectedValue && items.length > 0) {
      const result = items.find((item) => item.id === selectedValue.id);
      if (result && result.id !== selectedValue.id) {
        setSelectedValue(result);
      }
    }
  }, [items, selectedValue])
  

  const handleSelect = (item: DropdownItem) => {
    setSelectedValue(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className={`${styles.dropdown} ${className}`}>
      <p className="label">{title}</p>
      <div
        className={styles["dropdown-header"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? (
          <span>
            {selectedValue[labelKey] ?? selectedOption?.[labelKey]}
            {showAmount && ` (${selectedValue?.coins})`}
          </span>
        ) : (
          `Select a ${address ? address : "coin"}`
        )}
        <span className={styles.arrowIcon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isOpen && (
        <ul className={styles["dropdown-list"]}>
          {items.map((item) => (
            <li
              key={item[valueKey]}
              onClick={() => handleSelect(item)}
              className={styles["dropdown-item"]}
            >
              <p>
                {item[labelKey]} {showAmount && `(${item?.coins})`}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
