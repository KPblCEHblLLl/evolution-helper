import * as React from "react";
import Provider from "../../provider/MagistralDirectionAutosuggest";
import Autosuggest = require("react-autosuggest");
import {ChangeEvent, SuggestionSelectedEventData} from "react-autosuggest";
import {IApiMagistralDirectionClassif} from "../../api/model/ApiMagistralDirectionClassif";
import {MagistralDirectionClassifStoreType} from "../../store/MagistralDirectionClassifStore";

interface IProps {
    target: MagistralDirectionClassifStoreType;
}

interface IState {
    suggestions: IApiMagistralDirectionClassif[];
    value: string;
}

class MagistralDirectionAutosuggest extends React.Component<IProps, IState> {
    public static getSuggestionValue(suggestion: IApiMagistralDirectionClassif) {
        return suggestion.name;
    }

    public static renderSuggestion(suggestion: IApiMagistralDirectionClassif) {
        return (
            <div>{suggestion.name}</div>
        );
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            value: props.target.name || "",
            suggestions: []
        };
    }

    public render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={MagistralDirectionAutosuggest.getSuggestionValue}
                    renderSuggestion={MagistralDirectionAutosuggest.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                />
            </div>
        )
    }

    private onChange = (event: React.FormEvent<any>, data: ChangeEvent) => {
        this.setState({
            value: data.newValue,
        });
        this.props.target.clear();
    };

    private onSuggestionSelected = (event: React.FormEvent<any>, data: SuggestionSelectedEventData<IApiMagistralDirectionClassif>) => {
        this.props.target.applySuggest(data.suggestion);
    };

    private onSuggestionsFetchRequested = ({value}: {value: string}) => {
        Provider.findByName(value).then((list) => {
            this.setState({
                suggestions: list,
            })
        })
    };

    private onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        })
    };
}

export default MagistralDirectionAutosuggest;
