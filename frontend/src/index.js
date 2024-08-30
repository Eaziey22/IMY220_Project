import React from "react";
import ReactDom from "react-dom";

class Greetings extends React.Component{
    render(){
        return (
            <div>
                <h2>Hello Eaziey</h2>
            </div>
        )
    }
}

const root = ReactDom.createRoot (document.getElementById("root"));
root.render(<Greetings/>);