import useDynamicPageTitle from "@/helpers/hooks/useDynamicPageTitle";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTitle } from "react-use";
import useClaims from "./useClaims";

// Constants
import { BREADCRUMBS } from "@/constants/Routes";

export default function usePageTitle(breadcrumbs = null) {
	const [Title, setTitle] = useState("StaffLab - Loading");
	const location = useLocation();
	const params = useParams();
	const dynamicTitle = useDynamicPageTitle();
	const claims = useClaims();
	useTitle(Title);

	const checkTitle = (paramsId) => {
		if (Object.keys(paramsId).length === 0) {
			const title = BREADCRUMBS(dynamicTitle, claims)?.filter((el) => el.path === location.pathname)[0]?.title;
			setTitle(`StaffLab - ${title}`);
		} else {
			const title = breadcrumbs?.filter((el) => el.match.pathname === location.pathname)[0]?.match?.route?.title;
			setTitle(`StaffLab - ${title}`);
		}
	};

	useEffect(() => {
		checkTitle(params);
	}, [location, params, dynamicTitle]);

	return null;
}
