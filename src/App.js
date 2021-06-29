import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import { FirebaseProvider } from './context/FirebaseContext';

function App() {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <Switch>
          <Route path='/' exact render={() => <Login />} />
          <Route path='/chat' exact render={() => <Chat />} />
          <Route render={() => <h1>NO CONTENT HERE</h1>} />
        </Switch>
      </FirebaseProvider>
    </BrowserRouter>
  );
}

export default App;
