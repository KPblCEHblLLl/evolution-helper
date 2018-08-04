import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import MagistralDirectionPageState from "../../../state/MagistralDirectionPageState";
import MagistralDirectionsList from "../../MagistralDirection/MagistralDirectionsList";
import NewMagistralDirectionForm from "../../MagistralDirection/NewMagistralDirectionForm";
import StyledLink from "../../StyledLink";


const state = MagistralDirectionPageState.create();

export default class MagistralDirectionPage extends React.Component<RouteComponentProps<any>> {
    constructor(props : RouteComponentProps<any>) {
        super(props);

        this.onCreate = this.onCreate.bind(this);
    }

    public render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/new`}>
                    <NewMagistralDirectionForm onCreate={this.onCreate}/>
                </Route>
                <Route path={`${this.props.match.path}`}>
                    <div>
                        <StyledLink to={`${this.props.match.path}/new`}>
                            Создать новое направление
                        </StyledLink>
                        <MagistralDirectionsList state={state}/>
                    </div>
                </Route>
            </Switch>
        );
    }

    private onCreate() {
        this.props.history.push(this.props.match.path)
    }
}
