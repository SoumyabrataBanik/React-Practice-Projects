import { useState } from "react";
import '../styles.css';

const QuestionItem = ({ item }) => {

    const [selectedId, setSelectedId] = useState(null);

    const handleSelectedId = (id) => {
        setSelectedId(id);
    }

    return (
        <div className={item.id===selectedId ? 'selected' : ''} onClick={() => handleSelectedId(item.id)}>
            {item.id===selectedId ? `${item.answer}` : `${item.question}`}
        </div>
    );
}

export default QuestionItem;