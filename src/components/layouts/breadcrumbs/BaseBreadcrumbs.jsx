import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

// Styles & Icons
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components & Constants
import { BREADCRUMBS } from "@/constants/Routes";

export default function BaseBreadcrumbs() {
	const breadcrumbs = useBreadcrumbs(BREADCRUMBS);

	return (
		<Breadcrumb spacing={2} separator={<ChevronRight size={18} />}>
			{breadcrumbs.map(({ match, breadcrumb }) => (
				<BreadcrumbItem key={match.pathname}>
					<BreadcrumbLink as={NavLink} to={match.pathname} fontSize={{ base: 14, md: 16 }} fontWeight="semibold">
						{breadcrumb}
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}

			{breadcrumbs.length === 2 && (
				<BreadcrumbItem>
					<BreadcrumbLink as={NavLink} to={breadcrumbs[1].match.pathname} fontSize={{ base: 14, md: 16 }} fontWeight="semibold">
						{BREADCRUMBS.filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0].breadcrumb}
					</BreadcrumbLink>
				</BreadcrumbItem>
			)}
		</Breadcrumb>
	);
}
