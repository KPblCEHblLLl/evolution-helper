import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import NewMagistralDirectionForm from "../../MagistralDirection/NewMagistralDirectionForm";
import StyledLink from "../../StyledLink";


export default function MagistralDirectionPage(props: RouteComponentProps<any>) {
    return (
        <Switch>
            <Route path={`${props.match.path}/new`}>
                <NewMagistralDirectionForm/>
            </Route>
            <Route path={`${props.match.path}`}>
                <div>
                    <StyledLink to={`${props.match.path}/new`}>
                        Создать новое направление
                    </StyledLink>
                </div>
            </Route>
        </Switch>
    );
}
