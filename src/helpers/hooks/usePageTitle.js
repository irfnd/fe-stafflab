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

	useEffect(() => {
		const { title } = params
			? breadcrumbs.filter((el) => el.match.pathname === location.pathname)[0].match.route
			: BREADCRUMBS.filter((el) => el.path === location.pathname)[0];
		setTitle(`StaffLab - ${title}`);
	}, [location]);

	return null;
}
