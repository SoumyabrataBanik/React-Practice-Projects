import { useState } from "react";
import Star from "./Star";
import "./StarRating.css";


const StarRating = ({
    maxRating = 5 /*Default value given to the prop*/,
    color = "#fcc419",
    size = 24,
    className = "",
    message = [],
    defaultRating = 0,
    onSetTestRating,
}) => {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const handleRating = (index) => {
        setRating(index + 1);
        onSetTestRating && onSetTestRating(index + 1);
    };

    const handleTempRating = (index) => {
        setTempRating(index + 1);
    };

    const paraStyle = {
        lineHeight: "1",
        margin: "0",
        color: `${color}`,
        fontSize: `${size / 1.5}px`,
    };

    return (
        <div className={`container ${className}`}>
            <div className="star-container">
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        onRating={() => handleRating(i)}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onHoverIn={() => handleTempRating(i)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p style={paraStyle}>
                {message.length === maxRating
                    ? message[tempRating ? tempRating - 1 : rating - 1]
                    : tempRating || rating || ""}
            </p>
        </div>
    );
};

export default StarRating;
