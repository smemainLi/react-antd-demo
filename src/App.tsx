import React from 'react';
import logo from './logo.svg';
import { Button as AntdButton, Alert } from 'antd';
import './App.css';
import { Frame } from './components';

const onClose = (e: any) => {
  console.log(e, 'I was closed.');
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <AntdButton type="primary">nihao</AntdButton>
        <Alert
          message="Error Text"
          description="Error Description Error Description Error Description Error Description Error Description Error Description"
          type="error"
          closable
          onClose={onClose}
        />
        <Frame width={1200} height={200}></Frame>
      </header>
    </div>
  );
};

export default App;
