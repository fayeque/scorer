import React from "react";
import { useEffect } from "react";

const MatchSummary = (props) => {

return(
    <div>
        {props.data.winner} won...congratulations.
    </div>
)
}

export default MatchSummary;