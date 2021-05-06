import "./Intro-Page.css"
import { Component } from "react";

class IntroPage extends Component {
    render() {
        return (
            <div id="intro">
                <h1>Intro</h1>
                <p>{this.props.text}</p>
                <button>I am a button</button>
            </div>
        )
    }
}

export default IntroPage;
