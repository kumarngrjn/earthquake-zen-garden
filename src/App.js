import React from 'react';
import Header from './components/Header';
import './styles/index.css';
import {Switch,Route} from "react-router-dom";
import Profile from './containers/Profile';
import Detail from './containers/Detail';
import List from './containers/List';


const App = () => {
  /** defines the header and different pages to switch based on url */
  return(
    <>
      <Header></Header>
      <main className='content'>
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/detail/:id">
            <Detail/>
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </main>
    </>
  )
}
  
export default App;