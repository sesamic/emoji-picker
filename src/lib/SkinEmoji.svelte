<script lang="ts">
  import { render } from "./render";
  import type { IEmoji, ITone } from "./types";
  import { getPickerState } from "./stores";

  export let pickerId: string;
  export let emoji: IEmoji;
  export let onEmojiSelect: (emoji: IEmoji) => void;
  export let onEmojiMouseEnter: (emoji: IEmoji) => void;
  export let onEmojiMouseLeave: (emoji: IEmoji) => void;

  const { skinStore, actions } = getPickerState(pickerId);

  $: skin = $skinStore;

  $: fakeEmoji = (() => {
    const charForSkin = [1, 2, 3, 4, 5].includes(skin)
      ? emoji.tones?.find((a: ITone) => a.tone.includes(skin))?.char
      : emoji.char;

    const firstTone = emoji.tones && emoji.tones[0] ? emoji.tones[0] : { name: "", tone: [0], char: "" };

    return {
      ...emoji,
      char: charForSkin || emoji.char,
      preRendered: true,
      tones: [
        {
          name: firstTone.name.replaceAll("1", "0"),
          tone: [0],
          char: emoji.char,
        } as ITone,
        ...(emoji.tones || []),
      ],
    };
  })();

  function handleMouseEnter() {
    actions.changeFooterEmoji(fakeEmoji);
    actions.changeSearchbarPlaceholder(emoji.name);
    onEmojiMouseEnter(fakeEmoji);
  }

  function handleMouseLeave() {
    onEmojiMouseLeave(fakeEmoji);
  }

  function handleClick() {
    onEmojiSelect(fakeEmoji);
  }

  $: html = render(fakeEmoji?.char || "");
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click={handleClick}
  class="HOKKIEMOJIPICKER-skinemoji text-4xl p-1 cursor-pointer hover:bg-white/15 rounded-sm size-12-5 flex items-center justify-center overflow-hidden"
>
  {@html html}
</div>