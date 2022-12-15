import { useEffect } from "react";
import { AuthActions } from "@/helpers/redux/slices/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import Supabase from "@/helpers/Supabase";

export default function useAuth() {
	const { session } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		Supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			dispatch(AuthActions.setSession(currentSession));
		});

		Supabase.auth.onAuthStateChange((_event, currentSession) => {
			dispatch(AuthActions.setSession(currentSession));
		});
	}, []);

	return { session };
}
