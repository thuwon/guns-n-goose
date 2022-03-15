<script>
  import { user, db_user } from "@/user.js";
  import { onMount } from "svelte";

  import GUN from 'gun';
  const db = GUN();

  let newMessage;
  let messages = [];
  const key = "#foo";
  let chat = "chat";

  onMount(() => {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      ".": {
        // property selector
        ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      "-": 1, // filter in reverse
    };
    // Get Messages
    db.get("chat")
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          const key = "#foo";
          var message = {
            // transform the data
            who: await db.db_user(data).get("alias"), // a user might lie who they are! So let the user system detect whose data it is.
            what: (await SEA.decrypt(data.what, key)) + "", // force decrypt as text.
            when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
          };
          if (message.what) {
            messages = [...messages.slice(-100), message].sort(
              (a, b) => a.when - b.when
            );
            if (canAutoScroll) {
              autoScroll();
            } else {
              unreadMessages = true;
            }
          }
        }
      });
  });
  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, "#foo");
    const message = db_user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    db.get("chat").get(index).put(message);
    newMessage = "";
  }
</script>

<svelte:head>
  <title>Guns N' Goose - Chat</title>
</svelte:head>
<!--


<script>
    import ChatMenue from '../../components/Chat-Menue.svelte';
    import GUN from 'gun';
    import SEA from 'gun/sea';
    const db = GUN();

    let newMessage
    let messages = []

    onMount( (chat) => {
        db.get(chat)
        .map()
        .once( async(data, id) => {
            if (data) {
                const key = 'someSecureKey'

                var message = {
                    who: await db.user(data).get('alias'),
                    content: await SEA.decrypt(data.content, key),
                    timestamp: GUN.state.is(data, 'msg')
                }

                if (message.content) {
                    messages = [...messages.slice(-100), message]
                }
            };
        });
    })
</script>
-->

<div class="w-10/12 h-2/3 place-self-center drop-shadow">
  {#each messages as message (message.when)}
    <p>{message.what}</p>
  {/each}
  <form on:submit|preventDefault={sendMessage}>
    <input type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="100" />
    <button type="submit" disabled={!newMessage}>💥</button>
  </form>

</div>
