import { Auth, Typography, Button } from '@supabase/ui';
const { Text } = Typography;
import { supabase } from '../utils/api';

function Profile(props) {
	const { user } = Auth.useUser();
	if (user)
		return (
			<>
				<Text>Conectado con: {user.email}</Text>
				<Button block onClick={() => props.supabaseClient.auth.signOut()}>
					Cerrar sesión
				</Button>
			</>
		);
	return props.children;
}

export default function AuthProfile() {
	return (
		<Auth.UserContextProvider supabaseClient={supabase}>
			<Profile supabaseClient={supabase}>
				<Auth supabaseClient={supabase} />
			</Profile>
		</Auth.UserContextProvider>
	);
}
