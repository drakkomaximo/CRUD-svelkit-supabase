<script>
	import supabase from '$lib/supabase.js';
	import { browser } from '$app/environment';
	import Alert from './Alert.svelte';
	import { goto } from '$app/navigation';

	let email = '';
	export let title = '';
	export let text = '';
	export let id = '';
	export let filename = '';
	let file = null;
	let show = false;
	let message = '';
	let type = 'info';

	if (browser) {
		email = supabase.auth.user().email;
	}

	const saveImage = async () => {
		const filename = email + '/' + Date.now();
		await supabase.storage.from('images').upload(filename, file, {
			cacheControl: '3600',
			upsert: false
		});
		const { publicURL } = supabase.storage.from('images').getPublicUrl(filename);
		return publicURL;
	};

	const savePost = async () => {
		const { status, error } = await supabase
			.from('posts')
			.insert({ title, text, email, image: await saveImage(), filename });

		if (status === 201) {
			title = '';
			text = '';
			type = 'success';
			message = 'Post saved successfully';
			show = true;
		} else if (error) {
			type = 'error';
			message = error.message;
			show = true;
		} else {
			type = 'error';
			message = 'Something went wrong';
			show = true;
		}
	};

	const editPost = async () => {
		if (file == null) {
			const { status, error } = await supabase
				.from('posts')
				.update({ title, text })
				.match({ id: id });

			if (status === 200) {
				goto('/');
			} else if (error) {
				type = 'error';
				message = error.message;
				show = true;
			} else {
				type = 'error';
				message = 'Something went wrong';
				show = true;
			}
		} else {
			const { status, error } = await supabase
				.from('posts')
				.update({ title, text, image: await saveImage(), filename })
				.match({ id: id });

			if (status === 200) {
				goto('/');
			} else if (error) {
				type = 'error';
				message = error.message;
				show = true;
			} else {
				type = 'error';
				message = 'Something went wrong';
				show = true;
			}
		}
	};

	const getFile = (e) => {
		file = !!e.target.files.length && e.target.files[0];
	};

	$: {
		if (show) {
			setTimeout(() => {
				show = false;
				type = 'info';
			}, 3000);
		}
	}
</script>

<div class="form-control">
	<label for="title" class="label">
		<span class="label-text">Title</span>
	</label>
	<input
		type="text"
		id="title"
		bind:value={title}
		placeholder="Title here..."
		autocomplete="off"
		class="input input-primary input-bordered"
	/>
	<label for="content" class="label">
		<span class="label-text">Content</span>
	</label>
	<textarea
		id="text"
		bind:value={text}
		class="textarea h-24 textarea-bordered textarea-primary"
		placeholder="Content here..."
	/>
	<label for="image" class="label">
		<span class="label-text">Image</span>
	</label>
	<input type="file" id="image" on:change={getFile} />
	<input type="hidden" bind:value={id} />
	{#if id == ''}
		<button class="btn btn-secondary mt-3" on:click={savePost}>Save Post</button>
	{:else}
		<button class="btn btn-secondary mt-3" on:click={editPost}>Edit Post</button>
	{/if}
	<Alert {type} {message} {show} />
</div>
