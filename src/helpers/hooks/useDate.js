export default function useDate(date, withTime = true) {
	const options = withTime
		? {
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				timeZoneName: "short",
		  }
		: {
				day: "numeric",
				month: "long",
				year: "numeric",
		  };
	const formatter = Intl.DateTimeFormat("id-ID", options);
	return formatter.format(new Date(date));
}
