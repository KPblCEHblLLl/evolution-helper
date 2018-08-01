import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import GlossaryPage from "../GlossaryPage/GlossaryPage";
import NotesPage from "../NotesPage/NotesPage";
import {StyledPage, StyledPageBody} from "../StyledPage"
import {MainMenu, MainMenuLink} from "./StyledMainPage";


export default function MainPage() {
    const menuItems = [
        {path: '/notes', label: 'Записи'},
        {path: '/glossary', label: 'Словари'},
    ];
    return (
        <StyledPage>
            <MainMenu>
                {menuItems.map((item, key) => {
                    return (
                        <MainMenuLink to={item.path} key={key}>
                            {item.label}
                        </MainMenuLink>
                    )
                })}
            </MainMenu>
            <StyledPageBody>
                <Switch>
                    <Route path="/notes"
                           component={NotesPage}/>
                    <Route path="/glossary"
                           component={GlossaryPage}/>
                </Switch>
            </StyledPageBody>
        </StyledPage>
    );
}
