import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTitle } from "react-use";

// Constants
import { BREADCRUMBS } from "@/constants/Routes";

export default function usePageTitle(breadcrumbs) {
	const [Title, setTitle] = useState("StaffLab - Loading");
	const location = useLocation();
	const params = useParams();
	useTitle(Title);

	const getTitle = (routeParams) => {
		if (Object.keys(routeParams).length < 0) return BREADCRUMBS.filter((el) => el.path === location.pathname)[0];
		return breadcrumbs.filter((el) => el.match.pathname === location.pathname)[0].match.route;
	};

	useEffect(() => {
		const { title } = getTitle(params);
		setTitle(`StaffLab - ${title}`);
	}, [location, params]);

	return null;
}
