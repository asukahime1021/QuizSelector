import './App.css';
import React from 'react';
import Container from '@material-ui/core/Container';
import QuizArea from './components/organisms/QuizArea';
import ControlArea from './components/organisms/ControlArea';
import { ContextProvider } from './components/atoms/Context'

type ComponentProps = {
}

// Context で全体を囲うことでApp内のグローバルな変数として利用できる
const App: React.FC<ComponentProps> = () => {

  return (
    <Container>
      <ContextProvider>
        <QuizArea />
        <ControlArea />
      </ContextProvider>
    </Container>
  );
}

export default App;
