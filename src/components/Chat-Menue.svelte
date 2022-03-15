<script>
  import ChatListing from "./Chat-Listing.svelte";
  import ChatWindow from "./Chat-Window.svelte";
</script>

<div class="w-full h-auto bg-white rounded-xl px-12 py-6">
  <div class="w-full h-auto bg-white rounded-xl">
    <div class="flex-1 flex h-full">
      <div class="w-1/3 h-full mx-3 overflow-auto"> 
        <ChatListing />
      </div>
      <div class="w-2/3 overflow-auto bg-grey mx-3 overflow-auto">
        <ChatWindow />
      </div>
    </div>
  </div>
</div>
