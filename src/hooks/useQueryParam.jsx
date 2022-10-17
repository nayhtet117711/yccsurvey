import React from "react";
import { useLocation } from "react-router-dom";

const useQueryParam = () => {
    const { search } = useLocation();

    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    return [query];
}

export default useQueryParam;

