import { useEffect, useState } from "react";
import { companyInfo, governmentInfo, otherOrgInfo, ownBusinessInfo } from "../../constants";

const useOrganization = (working_organization) => {
    const [organization, setOrganization] = useState([]);

    useEffect(() => {
        setOrganization(() => {
            switch (working_organization) {
                case 'Government Staff': return governmentInfo;
                case 'Company': return companyInfo;
                case 'Own Business': return ownBusinessInfo;
                case 'Other': return otherOrgInfo;
                default: return [];
            }
        })
    }, [working_organization]);

    return organization;
}

export default useOrganization;