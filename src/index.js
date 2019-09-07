import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js';
import Dialog from './Dialog.js';
import Calculator from './Calculator.js';
import FilterableProductTable from './FilterableProductTable.js';
import {PRODUCTS} from './FilterableProductTable.js';
// Not used locally, used in index.html
import Clock from './Clock.js';

function WelcomeDialog() {
    return (
      <Dialog title='Welcome'
        message='Thank you for visiting our spacecraft!'/>
    );
}
class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSignUp=this.handleSignUp.bind(this);
        this.state={login: ''};
    }
    handleChange(e) {
        this.setState({login: e.target.value});
    }
    handleSignUp() {
        alert(`Welcome board, ${this.state.login}!`);
    }
    render() {
        return (
        <Dialog title="Mars Exploration Program"
                message="How should we refer to you?">
            <input value={this.state.login}
                    onChange={this.handleChange}/>
            <button onClick={this.handleSignUp}>
            Sign Me Up!
            </button>        
        </Dialog>
        );
    }
}
function App() {
    return (
        [   
        
        <FilterableProductTable products={PRODUCTS} />,
        <hr/>,
        <WelcomeDialog />,
        <hr/>,
        <Game />,
        <hr/>,
        <SignUpDialog />,
        <hr/>,
        <Calculator/>,
        ]
    );
}

  
// ================== ReactDOM Render ======================

ReactDOM.render(
    <App />,
    document.getElementById('calculator')
);