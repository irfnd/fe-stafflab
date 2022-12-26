import useDynamicPageTitle from "@/helpers/hooks/useDynamicPageTitle";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTitle } from "react-use";

// Constants
import DynamicBreadcrumbs from "@/components/layouts/breadcrumbs/DynamicBreadcrumbs";
import { BREADCRUMBS } from "@/constants/Routes";

export default function usePageTitle(breadcrumbs = null) {
	const [Title, setTitle] = useState("StaffLab - Loading");
	const location = useLocation();
	const params = useParams();
	const dynamicTitle = useDynamicPageTitle();
	useTitle(Title);

	useEffect(() => {
		if (Object.keys(params).length === 0) {
			const { title } = BREADCRUMBS(DynamicBreadcrumbs, dynamicTitle).filter((el) => el.path === location.pathname)[0];
			setTitle(`StaffLab - ${title}`);
		} else {
			const { title } = breadcrumbs.filter((el) => el.match.pathname === location.pathname)[0].match.route;
			setTitle(`StaffLab - ${title}`);
		}
	}, [location, params, dynamicTitle]);

	return null;
}
