import {RaisedButton} from "material-ui";
import * as React from 'react';
import {Link} from "react-router-dom";
import './GlossaryPage.css'


export default function GlossaryPage() {
    const list = [
        {path: '/life-periods', name: 'Периоды жизни'},
        {path: '/practices', name: 'Практики'},
        {path: '/magistral-directions', name: 'Магистральные направления'},
    ];
    return (
        <div className="glossary-page">
            <div className="glossary-page__header">Справочники и словари. Что-то, что редко меняется и к чему часто делаются отсылки
            </div>
            <div className="glossary-page__list">
                {list.map((glossary, key) => {
                    return (
                        <Link to={glossary.path} key={key} className="glossary-page__link">
                            <RaisedButton buttonStyle={{height: "100%"}} className="glossary-page__glossary"
                                          label={glossary.name} primary={true}/>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
