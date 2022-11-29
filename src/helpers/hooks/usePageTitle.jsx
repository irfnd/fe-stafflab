import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "react-use";

// Constants
import { BREADCRUMBS } from "@/constants/Routes";

export default function usePageTitle() {
	const [Title, setTitle] = useState("StaffLab - Loading");
	const location = useLocation();
	useTitle(Title);

	useEffect(() => {
		const { title } = BREADCRUMBS.filter((el) => el.path === location.pathname)[0];
		setTitle(`StaffLab - ${title}`);
	}, [location]);

	return null;
}
