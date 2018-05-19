import * as React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import './App.css';
import GlossaryPage from "./component/Page/GlossaryPage/GlossaryPage";
import NotesPage from "./component/Page/NotesPage/NotesPage";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ul>
                        <li>
                            <Link to="/notes">Записи</Link>
                        </li>
                        <li>
                            <Link to="/glossary">Словари</Link>
                        </li>
                    </ul>
                </header>
                <div>
                    <Switch>
                        <Route path="/notes"
                                       component={NotesPage}/>
                        <Route path="/glossary"
                                       component={GlossaryPage}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
