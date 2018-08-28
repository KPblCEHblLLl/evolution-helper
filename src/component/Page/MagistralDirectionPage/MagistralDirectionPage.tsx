import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import MagistralDirectionCard from "../../MagistralDirection/MagistralDirectionCard";
import MagistralDirectionsList from "../../MagistralDirection/MagistralDirectionsList";
import NewMagistralDirectionForm from "../../MagistralDirection/NewMagistralDirectionForm";
import StyledLink from "../../StyledLink";


export default class MagistralDirectionPage extends React.Component<RouteComponentProps<any>> {
    constructor(props : RouteComponentProps<any>) {
        super(props);

        this.renderCard = this.renderCard.bind(this);

        this.onCreate = this.onCreate.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.onItemDelete = this.onItemDelete.bind(this);
    }

    public render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/new`}>
                    <NewMagistralDirectionForm onCreate={this.onCreate}/>
                </Route>
                <Route path={`${this.props.match.path}/id/:id`} render={this.renderCard} />
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

    private renderCard(props: RouteComponentProps<{ id: string }>) {
        return <MagistralDirectionCard
            id={props.match.params.id}
            onItemDelete={this.onItemDelete}
            onItemEdit={this.onItemEdit}
        />
    }

    private onCreate() {
        this.props.history.push(this.props.match.path)
    }
    private onItemSelect(id: string) {
        this.props.history.push(`${this.props.match.path}/${id}`);
    }
    private onItemDelete() {
        this.props.history.push(this.props.match.path)
    }

    private onItemEdit = (id: string) => {
        this.props.history.push(this.props.match.path)
    }
}
