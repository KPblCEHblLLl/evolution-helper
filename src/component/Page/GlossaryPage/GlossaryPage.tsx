import * as React from 'react';
import {Link} from "react-router-dom";


export default function GlossaryPage() {
    const list = [
        {path: '/life-periods', name: 'Периоды жизни'},
        {path: '/practices', name: 'Практики'},
        {path: '/magistral-directions', name: 'Магистральные направления'},
    ];
    return (
        <div>
            <div>Справочники и словари. Что-то, что редко меняется и к чему часто делаются отсылки
            </div>
            {list.map((glossary, key) => {
                return (
                    <Link to={glossary.path} key={key}>
                        <div className="glossary-page__glossary">{glossary.name}</div>
                    </Link>
                );
            })}
        </div>
    );
}