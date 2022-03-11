<script>
  import Loader from '@/components/Loader.svelte';
  import Home from '@/components/Home.svelte';
  import Auth from '@/components/Auth.svelte';
  import About from '@/components/About.svelte';

  import { user } from './user';

  const routes = [
    {'path': '/', 'component': Home},
    {'path': '/auth', 'component': Auth},
    {'path': '/about', 'component': About},
  ]

  const loadApp = new Promise((resolve, reject) => {
    if (!routes.map(route => route.path).includes(window.location.pathname))
      window.location.replace('/');
    setTimeout(() => {
      if (window.location.pathname !== '/auth' && !$user)
        window.location.replace('/auth');
      else if (window.location.pathname === '/auth' && $user)
        window.location.replace('/');
      else 
        resolve();
    }, 300);
  })

</script>

<main class="w-full h-full grid bg-gray-100">
  {#await loadApp}
    <Loader/>
  {:then}
    {#each routes as route}
      {#if window.location.pathname === route.path}
        <svelte:component this={route.component}/>
      {/if}
    {/each}

    <button on:click={() => user.logout()} class="absolute bottom-0">Logout</button>
  {/await}
</main>