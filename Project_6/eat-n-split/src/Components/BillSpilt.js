import BillSplitForm from "./BillSplitForm";
import "../index.css";

const BillSplit = ({ selectId, friendList, onSplitBill }) => {
    return (
        <>
            {selectId === 0 ? null : (
                <BillSplitForm
                    friend={friendList.find((friend) => friend.id === selectId)}
                    onSplitBill={onSplitBill}
                />
            )}
        </>
    );
};

export default BillSplit;
