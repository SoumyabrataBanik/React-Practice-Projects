import './index.css';

const AccordianItem = ({num, title, text, openId, onOpen}) => {

    const isOpen = num === openId;

    return (
        <div className={`item ${isOpen ? 'open' : null}`} onClick={() => onOpen(num)}>
            <p className={`${isOpen ? 'number' : 'number'}`}>{num < 9 ? `0${num}` : num}</p>
            <p className={`title ${isOpen ? 'text' : ''}`}>{title}</p>
            <p className='icon'>{isOpen ? '-' : '+'}</p>
            {isOpen ? (<div className='content-box'>{text}</div>) : null}
        </div>
    );
}

export default AccordianItem;