import { useEffect, useState } from "react";
import { companyInfo, governmentInfo } from "../../constants";

const useOrganization = (working_organization) => {
    const [organization, setOrganization] = useState([]);

    useEffect(() => {
        setOrganization(() => {
            switch (working_organization) {
                case 'Government Staff': return governmentInfo;
                case 'Company': return companyInfo;
                default: return [];
            }
        })
    }, [working_organization]);

    return organization;
}

export default useOrganization;