import * as React from "react";
import {PracticeMetricStoreType} from "../../store/PracticeStore";
import MetricType from "../../enum/MetricType";
import getEnumKeys from "../../enum/getEnumKeys";
import MetricDimension from "../../enum/MetricDimension";
import {observer} from "mobx-react";

interface IProps {
    metric: PracticeMetricStoreType
}

class PracticeMetricEditForm extends React.Component<IProps> {
    private static renderTypeOption(name: keyof MetricType, key: number) {
        return <option key={key} value={name}>{name}</option>
    }
    private static renderDimensionOption(name: keyof MetricDimension, key: number) {
        return <option key={key} value={name}>{name}</option>
    }

    public render() {
        const metric = this.props.metric;
        return (
            <div>
                <div>
                    Name: <input value={metric.name} onChange={this.onChangeName}/>
                </div>
                <div>
                    Description:
                    <textarea value={metric.description} onChange={this.onChangeDescription}/>
                </div>
                <div>
                    Type:
                    <select value={metric.type} onChange={this.onTypeChange}>
                        {getEnumKeys(MetricType).map(PracticeMetricEditForm.renderTypeOption)}
                    </select>
                </div>
                <div>
                    Dimension:
                    <select value={metric.dimension} onChange={this.onDimensionChange}>
                        {getEnumKeys(MetricDimension).concat("").map(PracticeMetricEditForm.renderDimensionOption)}
                    </select>
                </div>
            </div>
        );
    }

    private onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.metric.setName(e.target.value);
    };
    private onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.metric.setDescription(e.target.value);
    };
    private onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.metric.setType(e.target.value as keyof typeof MetricType);
    };
    private onDimensionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.metric.setDimension(e.target.value as keyof typeof MetricDimension);
    };

}

export default observer(PracticeMetricEditForm);
