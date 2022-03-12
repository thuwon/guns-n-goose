<script>
  import Loader from '@/components/Loader.svelte';
  import Home from '@/routes/home/Home.svelte';
  import Auth from '@/routes/auth/Auth.svelte';
  import About from '@/routes/about/About.svelte';
  import TermsOfService from '@/routes/terms-of-service/TermsOfService.svelte';
  import PrivacyNotice from '@/routes/privacy-notice/PrivacyNotice.svelte';

  import { user } from './user';

  const BASE_URL = window.location.host === 'guns-n-goose.github.io' ? window.location.origin + '/guns-n-goose' : window.location.origin

  const routes = {
    '/': {component: Home, access: 'loggedIn'},
    '/auth': {component: Auth, access: 'loggedOut'},
    '/about': {component: About, access: ''},
    '/terms-of-service': {component: TermsOfService, access: ''},
    '/privacy-notice':  {component: PrivacyNotice, access: ''},
  }

  const loadApp = new Promise((resolve) => {
    if (!routes[window.location.pathname])
      window.location.href = BASE_URL;
    setTimeout(() => {
      if (routes[window.location.pathname].access === 'loggedIn' && !$user)
        window.location.href = BASE_URL + '/auth';
      else if (routes[window.location.pathname].access === 'loggedOut' && $user)
        window.location.href = BASE_URL;
      else 
        resolve();
    }, 300);
  })

</script>

<main class="w-full h-full grid bg-gray-100">
  {#await loadApp}
    <Loader/>
  {:then}
    <svelte:component this={routes[window.location.pathname].component}/>
    <button on:click={() => user.logout()} class="absolute bottom-0">Logout</button>
  {/await}
</main>