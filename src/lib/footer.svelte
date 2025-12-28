<script lang="ts">
  import { render } from "./render";
  import type { IEmoji } from "./types";
  import { getPickerState } from "./stores";

  export let id: string;
  export let firstEmoji: IEmoji | undefined;

  const { footerEmojiStore } = getPickerState(id);

  $: currentEmoji = $footerEmojiStore || firstEmoji;

  $: html = render(currentEmoji?.char || "");

  $: displayName = currentEmoji
    ? (currentEmoji.name || "")
        .split(" ")
        .map((e) => `:${e || ""}:`)
        .join(" ")
    : "";
</script>

<div class="HOKKIEMOJIPICKER-footer relative mt-auto flex gap-2 items-center px-4 py-3 bg-[#070709]">
  <div
    style="left: 0; position: absolute; background-color: transparent; top: 0; width: 12px; height: 12px; transform: translateY(-100%); border-radius: 100%; box-shadow: -14px 14px 0px 10px #070709;"
  ></div>

  <div class="*:size-9 *:min-w-9 *:max-w-9">
    {@html html}
  </div>

  <p class="text-lg whitespace-nowrap overflow-hidden text-ellipsis font-gg font-semibold">
    {displayName}
  </p>
</div>