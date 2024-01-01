import { useState } from "react";
import AccordianItem from "./AccordianItem";

const Accordian = ({ faqs }) => {

    const [openId, setOpenId] = useState(null);

    return (
        <div className="accordion">
            {faqs.map((faq) =>
                    <AccordianItem
                        num={faq.num}
                        title={faq.title}
                        text={faq.text}
                        key={Math.random()}
                        openId={openId}
                        onOpen={setOpenId}
                    />
            )}
        </div>
    );
};

export default Accordian;
