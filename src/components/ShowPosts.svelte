<script>
	import supabase from '$lib/supabase';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import 'sweetalert2/dist/sweetalert2.min.css';
	let email = '';
	let posts = [];

	if (browser) {
		email = supabase.auth.user().email;
	}

	const loadPosts = async () => {
		const { data, status, error } = await supabase
			.from('posts')
			.select('*')
			.order('id', { ascending: false });
		/*             .eq('email', email); */

		if (status === 200) {
			posts = data;
		} else if (error) {
			posts = [];
			console.log(error);
		}
	};

	const activeDeleteAlert = (id, filename) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				deletePost(id, filename);
			}
		});
	};

	const deletePost = async (id, filename) => {
		const { data } = await supabase.storage.from('images').remove([filename]);
		if (data) {
			const { status, error } = await supabase.from('posts').delete().match({ id: id });

			if (status === 200) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					confirmButtonText: 'Ok'
				});
				loadPosts();
			} else if (error) {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					confirmButtonText: 'Ok'
				});
			}
		}
	};

	onMount(() => {
		loadPosts();
	});
</script>

{#each posts as post}
	<div class="card w-96 bg-base-100 shadow-xl">
		<figure>
			<img src={post.image} alt={post.title} />
		</figure>
		<div class="card-body">
			<h2 class="card-title">{post.title}</h2>
			<h3 class="card-title">{post.email}</h3>
			<p>{post.text}</p>
			{#if email === post.email}
				<div class="card-actions justify-end">
					<a href={`/edit/${post.id}`} class="btn btn-primary">Edit</a>
					<button class="btn btn-error" on:click={activeDeleteAlert(post.id, post.filename)}>Delete</button>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<h1>There are not post now...</h1>
{/each}
