import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    
    return [query];
}

export default useQuery;

