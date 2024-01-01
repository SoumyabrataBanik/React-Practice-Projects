import faqs from './faqs';
import Accordian from './Accordian';
import './index.css';

const App = () => {

    return (
        <div>
            <Accordian faqs={faqs} />
        </div>
    );
}

export default App;