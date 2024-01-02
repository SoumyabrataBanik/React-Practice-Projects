import { useState } from "react";
import "../index.css";
import AddFriendForm from "./AddFriendForm";

const AddFriend = ({ onAddFriend, friendList }) => {
    const [isOpen, setIsOpen] = useState(false);
    let id = (Math.random() * 90000) + 10000;

    friendList.map(friend => friend.id===id ? id+1 : id);

    return (
        <>
            {!isOpen ? (
                <button className="button" onClick={() => setIsOpen(true)}>
                        Add Friend
                    </button>
                ) : (
                <AddFriendForm id={id} onAddFriend={onAddFriend} onOpen={setIsOpen} />
                )
            }
        </>
    );
};

export default AddFriend;
