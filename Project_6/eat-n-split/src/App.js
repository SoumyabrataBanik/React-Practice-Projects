import initialFriends from "./Components/InitialFriends";
import FriendList from "./Components/FriendList";

import './index.css'; 
import AddFriend from "./Components/AddFriend";
import { useState } from "react";
import BillSplit from "./Components/BillSpilt";

const App = () => {

  const [addedFriend, setAddedFriend] = useState(initialFriends);
  const [selectId, setSelectId] = useState(0);

  const handleAddedFriend = (e, id) => {
    e.preventDefault();

    const friend = {
      id: id,
      name: e.target[0].value,
      image: e.target[1].value,
      balance: 0,
    }
    setAddedFriend([...addedFriend, friend]);
  }

  const handleSelectId = (id) => {
    setSelectId(id);
  }

  const handleOnBillSplit = (id, bal) => {
    addedFriend.map(friend=>friend.id===id ? friend.balance+=bal : friend.balance+=0);
    setSelectId(0);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList intialFriends={addedFriend} onSelectId={handleSelectId} />
        <AddFriend onAddFriend={handleAddedFriend} friendList={addedFriend} />
      </div>
      <div>
        <BillSplit selectId={selectId} friendList={addedFriend} onSplitBill={handleOnBillSplit} />
      </div>
    </div>
  );
};

export default App;