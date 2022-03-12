<script>
  import { createEventDispatcher } from 'svelte';

  export let username;
  export let error;
  let password = '';
  let passwordRepeat = '';

	const dispatch = createEventDispatcher();
  const registerEvent = () => { dispatch('register', { password }) };
  const resetEvent = () => { dispatch('reset') };
  const errorEvent = (e) => { dispatch('error', { error: e }) };

  const checkPassword = () => {
    if (!password)
      errorEvent('A password is required to create an account.');
    else if (!password.match(/(?=.{10,})/))
      errorEvent('The password must be at least 10 characters long.');
    else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/))
      errorEvent('The password must contain at least one lowercase letter, uppercase letter, number and special character.');
    else if (password !== passwordRepeat)
      errorEvent('The passwords do not match.');
    else
      return true;
    return false;
  }
</script>

<div class="w-full h-auto bg-white rounded-xl px-12 py-6">
  <div class="w-full mb-4 text-center font-bold text-3xl">Create a Guns N' Goose Account</div>
  <div class="w-full text-center text-2xl">{username}</div>
  <div class="w-full mb-4 text-center font-light text-blue-700"><span on:click={resetEvent} class="cursor-pointer hover:underline">Change username</span></div>
  <input on:change={() => errorEvent('')} bind:value={password} type="password" placeholder="Password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
  <input on:change={() => errorEvent('')} bind:value={passwordRepeat} type="password" placeholder="Repeat password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
  <button on:click={() => { if (checkPassword()) registerEvent() }} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
  <div class="w-full text-center text-gray-400 text-thin text-sm">By proceeding, you agree to the <a class="underline" href="/terms-of-service">Terms of Service</a> and <a class="underline" href="/privacy-notice">Privacy Notice</a></div>
</div>