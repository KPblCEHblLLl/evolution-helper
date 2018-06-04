import {RaisedButton} from "material-ui";
import * as React from 'react';
import "./MagistralDirectionPage.css"


export default function MagistralDirectionPage() {
    const className = "magistral-direction-page";
    return (
       <div className={className}>
           <RaisedButton className={`${className}__add`} label="Создать новое направление" secondary={true}/>
       </div>
    );
}
