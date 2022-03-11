<script>
  import { user } from '../user';

  let username = '';
  let password = '';
  let passwordRepeat = '';
  let nameSubmitted = false;
  let emptyName = false;
  let error = '';

  const infos = [
    {'name': 'broadcast', 'text': 'Broadcast your toughts and information to the world and get incoming ones.'},
    {'name': 'fingerprint', 'text': 'No email address is required. Just choose a pseudonym and be part of the social network.'},
    {'name': 'decentralization', 'text': 'All data is only stored on a decentralized database ecosystem named GUN.'},
    {'name': 'encryption', 'text': 'All messaged are encrypted by default and no one except the authorized user can read them.'},
  ]

  function register() {
    console.log(password)
    if (!password)
      error = 'You need a password to create an account.';
    else if (!password.match(/(?=.{10,})/))
      error = 'The password must be at least 10 characters long.';
    else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/))
      error = 'Perhaps try an uppercase, lowercase, number and a special character?';
    else if (password !== passwordRepeat)
      error = 'It seems that the passwords do not match.';
    else
      user.register(username, password)
  }
</script>

<div class="w-2/6 place-self-center drop-shadow">

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
      <input on:change={() => error = ''} bind:value={password} type="password" placeholder="Password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <input on:change={() => error = ''} bind:value={passwordRepeat} type="password" placeholder="Repeat password" class="{error ? 'border-rose-600' : 'border-gray-300'} w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      <p class="{error ? 'visible' : 'invisible'} mt-2 mb-4 text-sm text-red-600"><b>Oops!</b> {error}</p>
      <button on:click={() => register()} class="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
      <div class="w-full text-center text-gray-400 text-thin text-sm">By proceeding, you agree to the <u>Terms of Service</u> and <u>Privacy Notice</u></div>
    </div>
  {/if}
</div>