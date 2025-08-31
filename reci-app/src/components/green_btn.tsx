import React from "react";

interface ReusableButtonProps {
  text: string;
  href: string;
  className?: string; 
  boxClassName?: string; 
  imgSrc?: string;
  imgAlt?: string;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  text,
  href,
  className = "",
  boxClassName = "",
  imgSrc,
  imgAlt,
}) => {
  return (
    <button
      onClick={() => (window.location.href = href)}
      className={className}
    >
      <div className={boxClassName}>
        <p>{text}</p>
        {imgSrc && (
          <img className="btn-arrow" src={imgSrc} alt={imgAlt || "arrow"} />
        )}
      </div>
    </button>
  );
};

export default ReusableButton;
