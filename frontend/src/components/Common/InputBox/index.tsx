import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  type?: string;
  placeholder?: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  rows?: number; 
  [key: string]: unknown; 
}

const Index: React.FC<Props> = ({
  type = "text", 
  placeholder = "",
  title = "",
  className = "",
  disabled = false,
  style,
  rows = 3, 
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="label">{title}</label>
      </div>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          className={`defaultStyles ${className}`}
          disabled={disabled}
          style={style}
          rows={rows}
          {...props}
        />
      ) : (
        <div className="relative">
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className={`defaultStyles ${className} w-full pr-10`} // Add padding to avoid overlapping icon
            disabled={disabled}
            style={style}
            {...props}
          />
          {type === "password" && (
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon style={{width:"16px",color:'#007bb3'}} icon={showPassword ? faEyeSlash : faEye} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
