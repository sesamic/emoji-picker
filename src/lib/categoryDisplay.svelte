<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown } from "lucide-svelte";
  import type { ICategory, ICategoryInfo, IEmoji } from "./types";
  import Emoji from "./Emoji.svelte";
  import SkinEmoji from "./SkinEmoji.svelte";
  import { getPickerState } from "./stores";

  export let category: ICategory;
  export let categoryInfo: ICategoryInfo;
  export let isToneSelectorEnabled: boolean;
  export let onEmojiSelect: (emoji: IEmoji) => void;
  export let onEmojiMouseEnter: (emoji: IEmoji) => void;
  export let onEmojiMouseLeave: (emoji: IEmoji) => void;
  export let pickerId: string;

  const { searchValueStore } = getPickerState(pickerId);

  let isOpen = true;
  const storageKey = `hokkiemojipicker-category-${category.name}-open`;

  onMount(() => {
    try {
        const cached = localStorage.getItem(storageKey);
        isOpen = cached === null ? true : cached === "true";
    } catch (e) {
        isOpen = true;
    }
  });

  function handleToggle() {
    isOpen = !isOpen;
    try {
      localStorage.setItem(storageKey, String(isOpen));
    } catch (e) {}
  }

  $: searchLower = ($searchValueStore || "").toLowerCase().replace(/_/g, " ");

  $: filteredEmojis = searchLower
    ? category.emojis.filter((emoji) =>
        emoji.name.toLowerCase().replace(/_/g, " ").includes(searchLower)
      )
    : null;
</script>

{#if searchLower}
  {#if category.name === "recentlyUsed"}
    <div class="h-1-5 w-full"></div>
  {:else}
    {#each filteredEmojis || [] as emoji (emoji.name)}
      {#if emoji.hasTone && !emoji.preRendered}
        <SkinEmoji
          {onEmojiSelect}
          {pickerId}
          {onEmojiMouseEnter}
          {onEmojiMouseLeave}
          {emoji}
        />
      {:else}
        <Emoji
          {onEmojiSelect}
          {pickerId}
          {emoji}
          {onEmojiMouseEnter}
          {onEmojiMouseLeave}
          key={emoji.name}
        />
      {/if}
    {/each}
  {/if}
{:else}
  <div class="HOKKIEMOJIPICKER-categorydisplay flex flex-col relative w-full pt-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="HOKKIEMOJIPICKER-categoryHeader sticky top-0 pt-2 cursor-pointer text-white px-2 flex bg-[#131416] p-1 pb-2 {category.name}"
      on:click={handleToggle}
    >
      <span class="flex gap-1-5 items-center opacity-75 hover:opacity-100">
        <span class="*:size-4.5">{@html categoryInfo.icon}</span>
        <span class="text-md font-semibold font-gg">
          {categoryInfo.name}
        </span>
        <ChevronDown
            strokeWidth={2}
            class="transition-all size-5 {isOpen ? '' : '-rotate-90'}"
        />
      </span>
    </div>

    {#if isOpen}
      <div class="flex flex-wrap gap-y-0-5">
        {#each category.emojis as emoji (emoji.name)}
          {#if emoji.hasTone && !emoji.preRendered && isToneSelectorEnabled}
            <SkinEmoji
              {onEmojiSelect}
              {pickerId}
              {emoji}
              {onEmojiMouseEnter}
              {onEmojiMouseLeave}
            />
          {:else}
            <Emoji
              {onEmojiSelect}
              {pickerId}
              {onEmojiMouseEnter}
              {onEmojiMouseLeave}
              {emoji}
            />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/if}