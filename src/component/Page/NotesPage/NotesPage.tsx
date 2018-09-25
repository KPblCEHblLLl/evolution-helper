import * as React from 'react';
import MagistralDirectionPage from "../MagistralDirectionPage/MagistralDirectionPage";
import {Route, RouteComponentProps, Switch} from "react-router";
import PracticePage from "../PracticePage/PracticePage";
import {StyledHeader, StyledList, StyledListLink, StyledNotesPage} from "./StyledNotesPage";


export default function NotesPage(props: RouteComponentProps<any>) {
    const list = [
        {path: `${props.match.path}/fragment`, name: 'Фрагменты'},
        {path: `${props.match.path}/decomposition`, name: 'Разборы'},
        {path: `${props.match.path}/draft`, name: 'Черновики'},
        {path: `${props.match.path}/tagged-note`, name: 'Старый формат'},
    ];
    return (
        <StyledNotesPage>
            <Switch>
                <Route path={`${props.match.path}/magistral-direction`}
                       component={MagistralDirectionPage}/>
                <Route path={`${props.match.path}/practice`}
                       component={PracticePage}/>
                <Route path={props.match.path}>
                    <div>
                        <StyledHeader>
                            Записи. Маленькие и большие. Обычно привязаны к какому-то МН или относятся к конкретной практике
                        </StyledHeader>
                        <StyledList>
                            {list.map((glossary, key) => {
                                return (
                                    <StyledListLink to={glossary.path} key={key}>
                                        {glossary.name}
                                    </StyledListLink>
                                );
                            })}
                        </StyledList>
                    </div>
                </Route>
            </Switch>
        </StyledNotesPage>
    );
}
