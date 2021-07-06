import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Homepage from './pages/Hompage'
import Homeworkpage from './pages/Homeworkpage';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exaxt path='/homework' component={Homeworkpage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
