import {Paper} from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import MagistralDirectionPage from "./component/Page/MagistralDirectionPage/MagistralDirectionPage";
import MainPage from "./component/Page/MainPage/MainPage";

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider>
                <div className="app">
                    <Paper zDepth={3} className='app__background' />
                    <Switch>
                        <Route path="/magistral-directions"
                               component={MagistralDirectionPage}/>
                        <Route path="/"
                               component={MainPage}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
