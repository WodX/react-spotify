import './App.css';
import Login from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  const code = new URLSearchParams(window.location.search).get('code');


  return (
    <div className="App App-header">
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;

