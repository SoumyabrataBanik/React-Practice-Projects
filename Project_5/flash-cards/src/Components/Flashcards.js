import "../styles.css";
import questions from "./questions";
import QuestionItem from "./QuestionItem";

const FlashCards = () => {

    return (
        <div className="flashcards">
            {questions.map(question => {
                return <QuestionItem key={question.id} item={question}></QuestionItem>
            })}
        </div>
    );
}

export default FlashCards;