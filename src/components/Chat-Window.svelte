<script>
    import ChatBubble from "./Chat-Bubble.svelte";
</script>

<div class="relative overflow-auto h- px-6 py-2">
    <ChatBubble />
    <ChatBubble />
    <div class="absolute bottom-0 shadow flex rounded-lg">
        <div class="w-full">
            <input type="text" class="w-full block outline-none py-4 px-4 bg-transparent" placeholder="Type a message..."/>
        </div>
    </div>
</div>