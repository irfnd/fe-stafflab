export default function usePagination(page, limit) {
	const from = page ? (page - 1) * limit : 0;
	const to = from + limit - 1;

	return { from, to };
}
