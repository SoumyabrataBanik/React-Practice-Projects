import { useState } from "react";
import "../index.css";

const BillSplitForm = ({ friend, onSplitBill }) => {

    const [bill, setBill] = useState('');
    const [yourBill, setYourBill] = useState('');
    const [billPayer, setBillPayer] = useState('you');
    let balance = 0;

    if (billPayer==='you') {
        balance = (+bill - +yourBill);
    } else if (billPayer==='friend') {
        balance = -(+yourBill);
    }

    return (
        <form
            className="form-split-bill"
            onSubmit={(e) => {
                e.preventDefault();
                onSplitBill(friend.id, balance);
            }}
        >
            <h2>Split A Bill with {friend.name}</h2>
            <label>💰 Bill Value: </label>
            <input type="text" value={bill} onChange={e=>setBill(e.target.value)} />
            <label>🙍‍♂️ Your Expense: </label>
            <input type="text" value={yourBill} onChange={e=>setYourBill(e.target.value)} />
            <label>🙍‍♀️ {friend.name}'s Expense: </label>
            <input
                type="text"
                value={(+bill) - (+yourBill)}
                readOnly
                style={{ backgroundColor: "transparent", borderColor: "orange" }}
            />
            <label>Who will pay the bill?</label>
            <select value={billPayer} onChange={e=>setBillPayer(e.target.value)}>
                <option value='you'>You</option>
                <option value='friend'>{friend.name}</option>
            </select>
            <button className="button">Split Bill</button>
        </form>
    );
};

export default BillSplitForm;
