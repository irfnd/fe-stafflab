export default function useDate(date) {
	const options = {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		timeZoneName: "short",
	};
	const formatter = Intl.DateTimeFormat("id-ID", options);
	return formatter.format(new Date(date));
}
