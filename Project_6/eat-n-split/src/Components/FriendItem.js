import "../index.css";

const FriendItem = ({ name, image, id, balance, onSelectId }) => {
    return (
        <li key={id}>
            <h3>{name}</h3>
            <p className={balance===0 ? '' : balance<0 ? 'red' : 'green'}>
                {balance < 0
                    ? `You owe ${name} $${-balance}`
                    : balance === 0
                        ? `You and ${name} are even`
                        : `${name} owes you $${balance}`}
            </p>
            <img src={image} alt={id}></img>
            <button className="button" onClick={() => onSelectId(id)}>Select</button>
        </li>
    );
};

export default FriendItem;
