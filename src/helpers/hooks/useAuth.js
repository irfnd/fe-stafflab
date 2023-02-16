import Supabase from "@/helpers/Supabase";
import { AuthActions } from "@/helpers/redux/slices/AuthSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
	const { session } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const refreshSession = () => {
		Supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			if (["ADMIN", "MANAJER"].includes(currentSession?.user?.app_metadata?.claims)) {
				dispatch(AuthActions.setSession(currentSession));
			} else {
				dispatch(AuthActions.setSession(null));
			}
		});

		Supabase.auth.onAuthStateChange((_event, currentSession) => {
			if (["ADMIN", "MANAJER"].includes(currentSession?.user?.app_metadata?.claims)) {
				dispatch(AuthActions.setSession(currentSession));
			} else {
				dispatch(AuthActions.setSession(null));
			}
		});
	};

	useEffect(() => {
		refreshSession();
	}, []);

	return { session };
}
