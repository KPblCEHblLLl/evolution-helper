import * as React from "react";
import {DotLoader} from "react-spinners";

export default (props: ({ loading: boolean, className?: string })) => (
    <div className={props.className}>
        <DotLoader
            margin={'0 auto'}
            color={'pink'}
            loading={props.loading}
            size={20}
        />
    </div>
)
