<script lang="ts">
  import { render } from "./render";
  import type { IEmoji } from "./types";
  import { getPickerState } from "./stores";

  export let pickerId: string;
  export let emoji: IEmoji;
  export let onEmojiMouseEnter: (emoji: IEmoji) => void;
  export let onEmojiMouseLeave: (emoji: IEmoji) => void;
  export let onEmojiSelect: (emoji: IEmoji) => void;

  const { actions } = getPickerState(pickerId);

  function handleMouseEnter() {
    actions.changeFooterEmoji(emoji);
    actions.changeSearchbarPlaceholder(emoji.name);
    onEmojiMouseEnter(emoji);
  }

  function handleMouseLeave() {
    onEmojiMouseLeave(emoji);
  }

  function handleClick() {
    onEmojiSelect(emoji);
  }

  $: html = render(emoji?.char || "");
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click={handleClick}
  class="HOKKIEMOJIPICKER-emoji text-4xl p-1 cursor-pointer hover:bg-white/15 rounded-sm size-12-5 flex items-center justify-center overflow-hidden"
>
  {@html html}
</div>