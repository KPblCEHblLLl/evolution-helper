import {Link} from "react-router-dom";
import styled from 'styled-components';

export default styled(Link)`
    display: block;
    text-decoration: none;
    color: inherit;
     
    :hover {
         background-color: rgba(0,0,0,0.05);     
    }
`;
