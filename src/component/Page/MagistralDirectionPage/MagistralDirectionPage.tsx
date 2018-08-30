import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import MagistralDirectionCard from "../../MagistralDirection/MagistralDirectionCard";
import MagistralDirectionCreateForm from "../../MagistralDirection/MagistralDirectionCreateForm";
import MagistralDirectionEditForm from "../../MagistralDirection/MagistralDirectionEditForm";
import MagistralDirectionsList from "../../MagistralDirection/MagistralDirectionsList";
import StyledLink from "../../StyledLink";


export default class MagistralDirectionPage extends React.Component<RouteComponentProps<any>> {
    public render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/new`}>
                    <MagistralDirectionCreateForm onCreate={this.onCreate}/>
                </Route>
                <Route path={`${this.props.match.path}/view/:id`} render={this.renderViewCard}/>
                <Route path={`${this.props.match.path}/edit/:id`} render={this.renderEditForm}/>
                <Route path={`${this.props.match.path}`}>
                    <div>
                        <StyledLink to={`${this.props.match.path}/new`}>
                            Создать новое направление
                        </StyledLink>
                        <MagistralDirectionsList path={this.props.match.path}/>
                    </div>
                </Route>
            </Switch>
        );
    }

    private renderViewCard = (props: RouteComponentProps<{ id: string }>) => {
        return <MagistralDirectionCard
            path={this.props.match.path}
            id={props.match.params.id}
            onItemDelete={this.onItemDelete}
        />
    };

    private renderEditForm = (props: RouteComponentProps<{ id: string }>) => {
        return <MagistralDirectionEditForm
            id={props.match.params.id}
            onEdit={this.onItemEdit}
        />
    };

    private onCreate = () => {
        this.props.history.push(this.props.match.path)
    };
    private onItemDelete = () => {
        this.props.history.push(this.props.match.path)
    };
    private onItemEdit = (id: string) => {
        this.props.history.push(`${this.props.match.path}/view/${id}`)
    }
}
