<script>
	import supabase from '$lib/supabase';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
	let email = '';
	let password = '';
    let token = '';

    if(browser) {
        token = JSON.parse(localStorage.getItem('token'));
        if(token != null) {
            goto('/home');
        }
    }

	const regiter = async () => {
		const { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		console.log(user, session, error);
	};

	const login = async () => {
		const { user, session, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});
        if( user.role = 'authenticated' ) {
            localStorage.setItem('token', JSON.stringify(session.access_token));
            goto('/home');
        }
		/* console.log(user, session, error); */
	};
</script>

<div class="bg-green-800 p-8">
    <div class="">
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Email</span>
            </div>
            <input
                type="text"
                placeholder="Email here"
                class="input input-bordered w-full"
                bind:value={email}
            />
        </label>
    
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Password</span>
            </div>
            <input
                type="text"
                placeholder="Password here"
                class="input input-bordered w-full"
                bind:value={password}
            />
        </label>
    </div>
    
    <div class="flex flex-wrap gap-4 mt-4 w-80">
        <button class="btn btn-primary text-white" on:click={login}>Login</button>
        <button class="btn btn-secondary" on:click={regiter}>Register</button>
    </div>
</div>