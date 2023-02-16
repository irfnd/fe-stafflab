import { useSelector } from "react-redux";

export default function useClaims() {
	const { session } = useSelector((state) => state.auth);
	if (session) return session.user.app_metadata.claims;
	return null;
}
