import useClaims from "@/helpers/hooks/useClaims";
import useDynamicPageTitle from "@/helpers/hooks/useDynamicPageTitle";
import usePageTitle from "@/helpers/hooks/usePageTitle";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

// Styles & Icons
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components & Constants
import { BREADCRUMBS } from "@/constants/Routes";
const subMenuPath = ["/pegawai", "/mutasi", "/cuti", "/perusahaan"];

export default function BaseBreadcrumbs() {
	const claims = useClaims();

	const dynamicTitle = useDynamicPageTitle();
	const breadcrumbs = useBreadcrumbs(BREADCRUMBS(dynamicTitle, claims));

	usePageTitle(breadcrumbs);

	return (
		<Breadcrumb display={{ base: "none", md: "inherit" }} spacing={2} separator={<ChevronRight color='#00B5D8' size={18} />}>
			{breadcrumbs.map(({ match, breadcrumb }) => (
				<BreadcrumbItem key={match.pathname}>
					<BreadcrumbLink
						as={NavLink}
						to={match.pathname}
						fontSize={{ base: 14, md: 16 }}
						fontWeight='semibold'
						_hover={{ textDecoration: "underline", textDecorationColor: "cyan.500", textDecorationThickness: 2 }}
					>
						{breadcrumb}
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}

			{breadcrumbs.length === 2 && breadcrumbs.some((el) => subMenuPath.includes(el.key)) && (
				<BreadcrumbItem>
					<BreadcrumbLink
						as={NavLink}
						to={BREADCRUMBS(dynamicTitle)?.filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0]?.path}
						fontSize={{ base: 14, md: 16 }}
						fontWeight='semibold'
						_hover={{ textDecoration: "underline", textDecorationColor: "cyan.500", textDecorationThickness: 2 }}
					>
						{BREADCRUMBS(dynamicTitle)?.filter((el) => el.path.includes(breadcrumbs[1].match.pathname) && el.isIndex)[0]?.breadcrumb}
					</BreadcrumbLink>
				</BreadcrumbItem>
			)}
		</Breadcrumb>
	);
}
