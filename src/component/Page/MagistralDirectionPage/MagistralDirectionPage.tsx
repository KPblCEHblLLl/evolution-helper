import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import MagistralDirectionPageState from "../../../state/MagistralDirectionPageState";
import MagistralDirectionsList from "../../MagistralDirection/MagistralDirectionsList";
import NewMagistralDirectionForm from "../../MagistralDirection/NewMagistralDirectionForm";
import StyledLink from "../../StyledLink";


const state = MagistralDirectionPageState.create();
state.loadList();

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
                    <MagistralDirectionsList state={state}/>
                </div>
            </Route>
        </Switch>
    );
}
