import FriendItem from "./FriendItem";

import "../index.css";

const FriendList = ({ intialFriends, onSelectId }) => {
    return (
        <>
            <ul>
                {intialFriends.map((friend) => (
                    <FriendItem
                        name={friend.name}
                        image={friend.image}
                        id={friend.id}
                        balance={friend.balance}
                        key={friend.id}
                        onSelectId={onSelectId}
                    />
                ))}
            </ul>
        </>
    );
};

export default FriendList;
