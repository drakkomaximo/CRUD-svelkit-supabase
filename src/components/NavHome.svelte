<script>
	import supabase from '$lib/supabase.js';
	import { goto } from '$app/navigation';

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if(!error) {
            localStorage.removeItem('token');
            goto('/');
        }
    }
</script>

<div class="navbar bg-blue-700 text-white flex justify-between">
	<a href="/" class="btn btn-ghost text-xl">CRUD Supabase home</a>

		<div>
			<a href="/home" class="btn btn-ghost">Home</a>
			<a href="/home/post" class="btn btn-ghost">Post</a>
			<a href="/" on:click={signOut} class="btn btn-ghost">Log Out</a>
		</div>
</div>
