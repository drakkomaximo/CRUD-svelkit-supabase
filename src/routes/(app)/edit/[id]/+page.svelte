<script>
	import { page } from '$app/stores';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import Form from '../../../../components/Form.svelte';

	let id = $page.params.id;
	let title = '';
	let text = '';
	let filename = ''

	let loadPost = async () => {
		const { data, status, error } = await supabase.from('posts').select('*').eq('id', id);

		if (status === 200) {
			title = data[0].title;
			text = data[0].text;
		} else if (error) {
			console.log(error);
		}
	};

	onMount(() => {
		loadPost();
	});
</script>

<h1 class="text-7xl">Edit Post</h1>

<Form {title} {text} {id} {filename} />
