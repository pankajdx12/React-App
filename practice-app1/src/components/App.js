import React, {Component} from 'react';
import img from '../assets/Photographer_Barnstar.png';
import '../styles/main.css'; 

class App extends Component {
    render() {
        return (
        <div>
            <h1>React App !!</h1>
            <img src={img} height="20" width="15" />
        </div>
        );
    }
}

export default App;