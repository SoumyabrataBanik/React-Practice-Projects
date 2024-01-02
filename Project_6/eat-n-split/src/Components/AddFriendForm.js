import '../index.css';

const AddFriendForm = ({id, onAddFriend, onOpen}) => {
    return (
        <>
            <form
                className="form-add-friend"
                onSubmit={(e, id) => {
                    onAddFriend(e, id);
                    onOpen(false);
                }}
            >
                <label>Friend Name: </label>
                <input type="text" />
                <label>Image URL: </label>
                <input type="text" value={`https://i.pravatar.cc/48?u=${id}`} />
                <button className="button">ADD</button>
            </form>
            <button className="button" onClick={() => onOpen(false)}>
                CLOSE
            </button>
        </>
    );
};

export default AddFriendForm;