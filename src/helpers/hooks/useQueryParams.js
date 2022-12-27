import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
	const [queryParams, setQueryParams] = useSearchParams();

	const search = queryParams.get("search") === "" ? null : queryParams.get("search");
	const filter = queryParams.get("filter") || "nama";
	const status = queryParams.get("status") === "" ? null : queryParams.get("status");
	const order = queryParams.get("order") || "createdAt";
	const sort = queryParams.get("sort") || "asc";
	const page = parseInt(queryParams.get("page"), 10) || 1;
	const limit = parseInt(queryParams.get("limit"), 10) || 12;

	if (search && status) return { queryParams: { search, status, filter, order, sort, page, limit }, setQueryParams };
	if (search) return { queryParams: { search, filter, order, sort, page, limit }, setQueryParams };
	if (status) return { queryParams: { status, filter, order, sort, page, limit }, setQueryParams };
	return { queryParams: { filter, order, sort, page, limit }, setQueryParams };
}
