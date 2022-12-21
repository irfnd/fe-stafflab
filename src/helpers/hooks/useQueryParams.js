import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
	const [queryParams, setQueryParams] = useSearchParams();
	const search = queryParams.get("search") === "" ? null : queryParams.get("search");
	const filter = queryParams.get("filter") || "nama";
	const order = queryParams.get("order") || "createdAt";
	const sort = queryParams.get("sort") || "asc";
	const page = parseInt(queryParams.get("page"), 10) || 1;
	const limit = parseInt(queryParams.get("limit"), 10) || 12;

	if (search) return { queryParams: { search, filter, order, sort, page, limit }, setQueryParams };
	return { queryParams: { filter, order, sort, page, limit }, setQueryParams };
}
