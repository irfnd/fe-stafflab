import usePageTitle from "@/helpers/hooks/usePageTitle";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import useDynamicPageTitle from "@/helpers/hooks/useDynamicPageTitle";

// Styles & Icons
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components & Constants
import DynamicBreadcrumbs from "@/components/layouts/breadcrumbs/DynamicBreadcrumbs";
import { BREADCRUMBS } from "@/constants/Routes";

export default function BaseBreadcrumbs() {
	const dynamicTitle = useDynamicPageTitle();
	const breadcrumbs = useBreadcrumbs(BREADCRUMBS(DynamicBreadcrumbs, dynamicTitle));
	usePageTitle(breadcrumbs);

	return (
		<Breadcrumb spacing={2} separator={<ChevronRight color='#00B5D8' size={18} />}>
			{breadcrumbs.map(({ match, breadcrumb }) => (
				<BreadcrumbItem key={match.pathname}>
					<BreadcrumbLink
						as={NavLink}
						to={match.pathname}
						fontSize={{ base: 14, md: 16 }}
						fontWeight='semibold'
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
						to={
							BREADCRUMBS(DynamicBreadcrumbs, dynamicTitle).filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0].path
						}
						fontSize={{ base: 14, md: 16 }}
						fontWeight='semibold'
						_hover={{
							textDecoration: "underline",
							textDecorationColor: "cyan.500",
							textDecorationThickness: 2,
						}}
					>
						{
							BREADCRUMBS(DynamicBreadcrumbs, dynamicTitle).filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0]
								.breadcrumb
						}
					</BreadcrumbLink>
				</BreadcrumbItem>
			)}
		</Breadcrumb>
	);
}
