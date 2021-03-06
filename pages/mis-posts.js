import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../utils/api';

export default function MyPosts() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const user = supabase.auth.user();
		const { data } = await supabase.from('posts').select('*').filter('user_id', 'eq', user.id);
		setPosts(data);
	}
	async function deletePost(id) {
		await supabase.from('posts').delete().match({ id });
		fetchPosts();
	}
	return (
		<div>
			<h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">Mis Posts</h1>
			{posts.map((post, index) => (
				<div key={index} className="pb-4 mt-8 border-b border-gray-300">
					<h2 className="text-xl font-semibold">{post.title}</h2>
					<p className="mt-2 mb-2 text-gray-500">Autor: {post.user_email}</p>
					<Link href={`/editar/${post.id}`}>
						<a className="mr-4 text-sm text-blue-500">Editar post</a>
					</Link>
					<Link href={`/posts/${post.id}`}>
						<a className="mr-4 text-sm text-blue-500">Ver post</a>
					</Link>
					<button className="mr-4 text-sm text-red-500" onClick={() => deletePost(post.id)}>
						Eliminar post
					</button>
				</div>
			))}
		</div>
	);
}
