import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import routes from "./routes/routes";

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost/evolution-helper';

    constructor() {
        this.app = express();
        this.config();
        routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        // serving static files
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl).catch((err) => {
            console.error('mongoose connection error', err.stack);
        });
    }

}

export default new App().app;
