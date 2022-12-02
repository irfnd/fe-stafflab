import { NavLink, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

// Styles & Icons
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components & Constants
import { BREADCRUMBS } from "@/constants/Routes";

export default function BaseBreadcrumbs() {
	const location = useLocation();
	const breadcrumbs = useBreadcrumbs(BREADCRUMBS);

	return (
		<Breadcrumb spacing={2} separator={<ChevronRight color="#00B5D8" size={18} />}>
			{breadcrumbs.map(({ match, breadcrumb }) => (
				<BreadcrumbItem key={match.pathname}>
					<BreadcrumbLink
						as={NavLink}
						to={match.pathname}
						fontSize={{ base: 14, md: 16 }}
						fontWeight="semibold"
						textDecoration={location.pathname === match.pathname && !match.route.isIndex ? "underline" : "none"}
						textDecorationColor={location.pathname === match.pathname && "cyan.500"}
						textDecorationThickness={location.pathname === match.pathname && 2}
						_hover={{
							textDecoration: "underline",
							textDecorationColor: "cyan.500",
							textDecorationThickness: 2,
						}}
					>
						{breadcrumb}
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}

			{breadcrumbs.length === 2 && (
				<BreadcrumbItem>
					<BreadcrumbLink
						as={NavLink}
						to={BREADCRUMBS.filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0].path}
						fontSize={{ base: 14, md: 16 }}
						fontWeight="semibold"
						textDecoration="underline"
						textDecorationColor="cyan.500"
						textDecorationThickness={2}
						_hover={{
							textDecoration: "underline",
							textDecorationColor: "cyan.500",
							textDecorationThickness: 2,
						}}
					>
						{BREADCRUMBS.filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0].breadcrumb}
					</BreadcrumbLink>
				</BreadcrumbItem>
			)}
		</Breadcrumb>
	);
}
