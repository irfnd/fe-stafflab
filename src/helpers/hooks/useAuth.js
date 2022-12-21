import Supabase from "@/helpers/Supabase";
import { AuthActions } from "@/helpers/redux/slices/AuthSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
	const { session } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		Supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			if (currentSession?.user?.app_metadata?.claims === "ADMIN") {
				dispatch(AuthActions.setSession(currentSession));
			}
		});

		Supabase.auth.onAuthStateChange((_event, currentSession) => {
			if (currentSession?.user?.app_metadata?.claims === "ADMIN") {
				dispatch(AuthActions.setSession(currentSession));
			}
		});
	}, []);

	return { session };
}
