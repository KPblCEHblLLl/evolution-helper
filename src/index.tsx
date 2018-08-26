import {Provider} from "mobx-react";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {appStores} from "./store/AppStore";

ReactDOM.render(
    <BrowserRouter>
        <Provider {...appStores}>
            <App/>
        </Provider>
    </BrowserRouter>,

    document.getElementById('root') as HTMLElement
);
registerServiceWorker();


