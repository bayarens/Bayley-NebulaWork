import "./Skills-Container.css"
import { Component } from "react"

class SkillsContainer extends Component {
    render() {
        return (
            <div id="skills-container">
                <h2>Skills</h2>
                <div id="skillitems">
                    <span className="skills">Skillitem</span>
                    <span className="skills">Skillitem</span>
                    <span className="skills">Skillitem</span>
                </div>
            </div>
        )
    }
}

export default SkillsContainer;