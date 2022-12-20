import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTitle } from "react-use";

// Constants
import { BREADCRUMBS } from "@/constants/Routes";

export default function usePageTitle(breadcrumbs = null) {
	const [Title, setTitle] = useState("StaffLab - Loading");
	const location = useLocation();
	const params = useParams();
	useTitle(Title);

	useEffect(() => {
		if (Object.keys(params).length === 0) {
			const { title } = BREADCRUMBS.filter((el) => el.path === location.pathname)[0];
			setTitle(`StaffLab - ${title}`);
		} else {
			const { title } = breadcrumbs.filter((el) => el.match.pathname === location.pathname)[0].match.route;
			setTitle(`StaffLab - ${title}`);
		}
	}, [location, params]);

	return null;
}
