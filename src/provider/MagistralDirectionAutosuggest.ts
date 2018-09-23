import Axios from "axios";
import {IApiMagistralDirectionClassif} from "../api/model/ApiMagistralDirectionClassif";

export default class MagistralDirectionAutosuggest {
    public static findByName(name: string): Promise<IApiMagistralDirectionClassif[]> {
        return Axios.get("/api/magistral-direction/findByName/" + name).then((response) => {
            return response.data;
        });
    }
}

