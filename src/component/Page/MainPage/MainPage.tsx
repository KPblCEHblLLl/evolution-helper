import {RaisedButton} from "material-ui";
import * as React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import GlossaryPage from "../GlossaryPage/GlossaryPage";
import NotesPage from "../NotesPage/NotesPage";
import './MainPage.css';


export default class MainPage extends React.Component<any, any> {
    public render() {
        const block = 'main-page';
        const menuItems = [
            {path: '/notes', label: 'Записи'},
            {path: '/glossary', label: 'Словари'},
        ];
        const path = this.props.location.pathname;
        return (
            <div className={block}>
                <div className={`${block}__menu`}>
                    {menuItems.map((item, key) => {
                        return (
                            <Link to={item.path} className='main-page__menu-item' key={key}>
                                <RaisedButton label={item.label} className='main-page__menu-button' secondary={item.path === path} fullWidth={true}/>
                            </Link>
                        )
                    })}
                </div>
                <div className='main-page__body'>
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
