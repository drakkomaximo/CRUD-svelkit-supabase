<script>
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
	import ShowPosts from '../../../components/ShowPosts.svelte';

    let token = '';
    if (browser) {
        token = JSON.parse(localStorage.getItem('token'));
        if (token == null) {
            goto('/');
        }
    }
</script>

<h1>home</h1>
<ShowPosts />
