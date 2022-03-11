<script>
  import { user } from '../user';

  let username = '';
  let password = '';
  let passwordRepeat = '';
  let nameSubmitted = false;
  let emptyName = false;

  const infos = [
    {'name': 'broadcast', 'text': 'Broadcast your toughts and information to the world and get incoming ones.'},
    {'name': 'fingerprint', 'text': 'No email address is required. Just choose a pseudonym and be part of the social network.'},
    {'name': 'decentralization', 'text': 'All data is only stored on a decentralized database ecosystem named GUN.'},
    {'name': 'encryption', 'text': 'All messaged are encrypted by default and no one except the authorized user can read them.'},
  ]
</script>

<div class="w-2/6 place-self-center drop-shadow-xl">

  {#if !nameSubmitted}
    <!--LOGO & INPUT-->
    <div class="w-full h-auto bg-white rounded-t-xl px-12 pt-6">
      <img src="https://raw.githubusercontent.com/guns-n-goose/branding/main/logo.svg" alt="logo" class="m-auto w-1/6 -mb-10 -translate-y-16">
      <div class="w-full text-center font-bold text-2xl">Enter your username</div>
      <div class="w-full mb-4 text-center font-light">Continue to Guns N' Goose</div>
      <input on:change={() => emptyName = false} bind:value={username} placeholder="Username" class="{emptyName ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <button on:click={() => username ? nameSubmitted = true : emptyName = true} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue</button>
    </div>

    <div class="w-full h-auto bg-gray-100 rounded-b-xl px-12 pb-6">
      <!--INFOS-->
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
      <!--GITHUB-->
      <a href="https://github.com/guns-n-goose">
        <img class="mt-6 w-8 m-auto mb-1" src="/static/github.png" alt="github" href="https://github.com/guns-n-goose"/>
        <div class="text-center text-sm font-thin">Guns N' Goose is open-source</div>
      </a>
    </div>
  {:else}
    <div class="w-full h-auto bg-white rounded-xl px-12 py-6">
      <img src="https://raw.githubusercontent.com/guns-n-goose/branding/main/logo.svg" alt="logo" class="m-auto w-1/6 -mb-10 -translate-y-16">
      <div class="w-full text-center font-bold text-2xl">Create a Guns N' Goose Account</div>
      <div class="w-full mb-4 text-center font-light">Continue to Guns N' Goose</div>
      <div class="w-full text-center text-2xl">@{username}</div>
      <div on:click={() => [username, nameSubmitted] = ['', false]} class="w-full mb-4 text-center font-light cursor-pointer text-blue-700 hover:underline">Change username</div>
      <input bind:value={password} placeholder="Password" class="border-gray-300 w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <input bind:value={passwordRepeat} placeholder="Repeat password" class="border-gray-300 w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <button on:click={() => user.register(username, password)} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
      <div class="w-full text-center text-gray-400 text-thin text-sm">By proceeding, you agree to the <u>Terms of Service</u> and <u>Privacy Notice</u></div>
    </div>
  {/if}

</div>



  <!--{#if usernameSubmitted && loginBool}
    <span transition:fade class="grid absolute mb-80 place-self-center">
      <img src={`https://avatars.dicebear.com/api/adventurer-neutral/${username}.svg`} alt="avatar" class="w-32 mb-4 rounded-xl place-self-center">
      <b class="place-self-center text-xl">Welcome back {username} 👋</b>
      <h5 class="place-self-center text-base">Please verify your identity with your password.</h5>
    </span>
  {:else if usernameSubmitted && !loginBool}
    <span transition:fade class="grid absolute mb-44 place-self-center">
      <b class="place-self-center text-xl">Hello {username} 👋</b>
      <h5 class="place-self-center text-base">Please insert a password to create your account.</h5>
    </span>
  {/if}-->
  <!--
  <div id="input" class="w-2/6 rounded-lg p-5 bg-white place-self-center">
    {#if !usernameSubmitted}
    <div class="float-left relative z-0 w-4/5 group">
      <input bind:value={username} name="username" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        What's your (desired) username?
      </label>
    </div>
    {:else}
    <div transition:fade class="float-left relative z-0 w-4/5 group">
      <input bind:value={password} name="password" type="password" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        What password do you want to use?
      </label>
    </div>
    {/if}
    <button on:click={submitUsername} class="float-right ml-2.5 px-2.5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg sm:w-auto text-center">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </button>
  </div>
  -->


<!--
    <button class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
<main class="w-full h-full flex justify-center items-center">
    <div class="bg-gray-400">
        <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input bind:value={username} name="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="">
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input bind:value={password} name="password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="">
        </div>
        <button on:click={login} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
        <button on:click={signup} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign Up</button>
    </div>    
</main>
-->