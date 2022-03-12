<script>
  import { user, db, db_user } from '../user';
import About from './About.svelte';

  let username = '';
  let password = '';
  let passwordRepeat = '';
  let nameSubmitted = 0;
  let emptyName = false;
  let error = '';

  const infos = [
    {'name': 'broadcast', 'text': 'Broadcast your toughts and information to the world and get incoming ones.'},
    {'name': 'fingerprint', 'text': 'No email address is required. Just choose a pseudonym and be part of the social network.'},
    {'name': 'decentralization', 'text': 'All data is only stored on a decentralized database ecosystem named GUN.'},
    {'name': 'encryption', 'text': 'All messaged are encrypted by default and no one except the authorized user can read them.'},
  ]

  function sumbitUsername() {
    db.get(`~@${username}`).once((data) => {
      nameSubmitted = !data ? 1 : 2;
    })
  }

  function reset() {
    username = '';
    password = '';
    passwordRepeat = '';
    nameSubmitted = 0;
    emptyName = false;
    error = '';
  }

  function register() {
    console.log(password)
    if (!password)
      error = 'A password is required to create an account.';
    else if (!password.match(/(?=.{10,})/))
      error = 'The password must be at least 10 characters long.';
    else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/))
      error = 'The password must contain at least one lowercase letter, uppercase letter, number and special character.';
    else if (password !== passwordRepeat)
      error = 'The passwords do not match.';
    else
      db_user.create(username, password, ({ err }) => {
        if (err) error = err;
        else login()
      })
  }

  function login() {
    db_user.auth(username, password, ({ err }) => {
      if (err) error = err;
      else window.location.reload();
    })
  }
</script>

<div class="w-2/6 place-self-center drop-shadow">

  {#if nameSubmitted == 0}
    <!--LOGO & INPUT-->
    <div class="w-full h-auto bg-white rounded-t-xl px-12">
      <img src="https://raw.githubusercontent.com/guns-n-goose/branding/main/logo-text.svg" alt="logo" class="m-auto w-1/2">
      <input on:change={() => emptyName = false} bind:value={username} placeholder="Enter your username" class="{emptyName ? 'border-rose-600' : 'border-gray-300'} w-full my-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <button on:click={() => sumbitUsername()} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue</button>
    </div>

    <div class="w-full h-auto bg-gray-100 rounded-b-xl px-12 pb-6">
      {#each [0,2] as n}
        <div class="flex flex-row">
          {#each infos.slice(n,n+2) as info}
            <div class="basis-1/2 pt-10 pr-4">
              <img class="h-12 mb-1" src="/static/{info.name}.png" alt={info.name}>
              <span class="text-sm font-thin">{info.text}</span>
            </div>
          {/each}
        </div>
      {/each}
      <a href="https://github.com/guns-n-goose">
        <img class="mt-6 w-8 m-auto mb-1" src="/static/github.png" alt="github" href="https://github.com/guns-n-goose"/>
        <div class="text-center text-sm font-thin">Guns N' Goose is open-source</div>
      </a>
    </div>

  {:else if nameSubmitted == 1}
    <div class="w-full h-auto bg-white rounded-xl px-12 py-6">
      <div class="w-full mb-4 text-center font-bold text-3xl">Create a Guns N' Goose Account</div>
      <div class="w-full text-center text-2xl">@{username}</div>
      <div on:click={reset} class="w-full mb-4 text-center font-light cursor-pointer text-blue-700 hover:underline">Change username</div>
      <input on:change={() => error = ''} bind:value={password} type="password" placeholder="Password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <input on:change={() => error = ''} bind:value={passwordRepeat} type="password" placeholder="Repeat password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <button on:click={register} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
      <div class="w-full text-center text-gray-400 text-thin text-sm">By proceeding, you agree to the <a class="underline" href="/terms-of-service">Terms of Service</a> and <a class="underline" href="/privacy-notice">Privacy Notice</a></div>
    </div>

  {:else}
    <div class="w-full h-auto bg-white rounded-xl px-12 py-6">
      <div class="w-full mb-4 text-center font-bold text-3xl">Login</div>
      <img class="rounded-full w-1/3 m-auto" src="https://avatars.dicebear.com/api/adventurer-neutral/Thomas.svg" alt="profile">
      <div class="w-full text-center text-2xl">@{username}</div>
      <div on:click={reset} class="w-full mb-4 text-center font-light cursor-pointer text-blue-700 hover:underline">Use different account</div>
      <input on:change={() => error = ''} bind:value={password} type="password" placeholder="Password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <button on:click={login} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
      <div class="w-full text-center text-gray-400 text-thin text-sm">By proceeding, you agree to the <a class="underline" href="/terms-of-service">Terms of Service</a> and <a class="underline" href="/privacy-notice">Privacy Notice</a></div>
    </div>
  {/if}
</div>

{#if error}
  <div id="toast-danger" class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </div>
    <div class="ml-3 text-sm font-normal">{error}</div>
  </div>
{/if}