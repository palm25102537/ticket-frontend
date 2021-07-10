import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Homepage from './pages/Hompage'
import Homeworkpage from './pages/Homeworkpage';
import { useMyContext } from './context/myContext'
function App() {
  const { state } = useMyContext()

  const publicRoute = [
    {
      path: '/',
      component: Homepage
    }
  ]

  const privateRoute = [
    {
      path: '/homework',
      component: Homeworkpage
    }
  ]
  console.log(state)
  return (
    <BrowserRouter>
      <Switch>
        {state.authen &&
          privateRoute.map((element, index) => (
            <Route key={index} exact path={element.path} component={element.component} />
          ))
        }
        {!state.authen &&
          publicRoute.map((element, index) => (
            <Route key={index} exact path={element.path} component={element.component} />
          ))
        }
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
