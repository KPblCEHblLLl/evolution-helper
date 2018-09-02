import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import MagistralDirectionPage from "../MagistralDirectionPage/MagistralDirectionPage";
import {StyledGlossaryPage, StyledHeader, StyledList, StyledListLink} from "./StyledGlossaryPage"
import PracticePage from "../PracticePage/PracticePage";

export default function GlossaryPage(props: RouteComponentProps<any>) {
    const list = [
        {path: `${props.match.path}/life-periods`, name: 'Периоды жизни'},
        {path: `${props.match.path}/practice`, name: 'Практики'},
        {path: `${props.match.path}/magistral-direction`, name: 'Магистральные направления'},
    ];
    return (
        <StyledGlossaryPage>
            <Switch>
                <Route path={`${props.match.path}/magistral-direction`}
                       component={MagistralDirectionPage}/>
                <Route path={`${props.match.path}/practice`}
                       component={PracticePage}/>
                <Route path={props.match.path}>
                    <div>
                        <StyledHeader>
                            Справочники и словари. Что-то, что редко меняется и к чему часто делаются отсылки
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
        </StyledGlossaryPage>
    );
}
