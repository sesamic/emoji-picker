<script>
  import { EmojiPicker } from '$lib';
</script>

<div class="h-screen w-full flex items-center justify-center bg-black text-white">
  <EmojiPicker 
    onEmojiSelect={(emoji) => console.log(emoji)} 
  />
</div>