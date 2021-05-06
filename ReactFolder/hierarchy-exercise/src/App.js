import './App.css';
import IntroPage from './Intro-Page/Intro-Page';
import SkillsContainer from './Skill-Container/Skills-Container';


function App() {
  return (
    <div className="main-container">
      <IntroPage text="this it my intro"></IntroPage>
      <SkillsContainer></SkillsContainer>
    </div>
  );
}

export default App;
