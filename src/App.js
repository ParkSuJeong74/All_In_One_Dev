import MainPageComponent from './main';
import "./App.css"
import {Switch, Route} from "react-router-dom";
import UploadPage from './upload';
import ProductPage from './product';

function App() {
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="/images/icons/logo.png"/>
        </div>
      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            <MainPageComponent/>
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage/>
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage/>
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  )
}

export default App;