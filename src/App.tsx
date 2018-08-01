import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import MainPage from "./component/Page/MainPage/MainPage";

class App extends React.Component {
    public render() {
        return (
            <div className="app">
                <Switch>
                    <Route path="/"
                           component={MainPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
