import './App.css';
import Chat from './components/chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Chat username='Test' server='http://localhost:3001'/>
      </header>
    </div>
  );
}

export default App;
