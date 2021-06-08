import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/api';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(async () => checkUser());
		checkUser();
		return () => {
			authListener?.unsubscribe();
		};
	}, []);
	async function checkUser() {
		const user = supabase.auth.user();
		setUser(user);
	}
	return (
		<div>
			<Head>
				<title>NEXT - SUPABASE</title>
			</Head>
			<nav className="p-6 border-b border-gray-300">
				<Link href="/">
					<span className="mr-6 cursor-pointer">Inicio</span>
				</Link>
				{user && (
					<Link href="/crear-post">
						<span className="mr-6 cursor-pointer">Crear post</span>
					</Link>
				)}
				{user && (
					<Link href="/mis-posts">
						<span className="mr-6 cursor-pointer">Mis Posts</span>
					</Link>
				)}
				<Link href="/perfil">
					<span className="mr-6 cursor-pointer">Perfil</span>
				</Link>
			</nav>
			<div className="px-16 py-8">
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default MyApp;
