<script lang="ts">
  import { onMount } from "svelte";
  import { render } from "./render";
  import { getPickerState } from "./stores";

  export let id: string;

  const skins = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"];
  const { skinStore, actions } = getPickerState(id);

  let open = false;

  onMount(() => {
    try {
      const cached = localStorage.getItem("hokkiemojipicker-skin");
      if (cached) {
        actions.setSkin(parseInt(cached, 10));
      }
    } catch (e) {}
  });

  $: selectedTone = $skinStore;
  $: renderedCurrentSkin = render(skins[selectedTone] || "");

  $: availableSkins = skins
    .map((skin, i) => (i === selectedTone ? null : { skin, i }))
    .filter((item): item is { skin: string; i: number } => item !== null);

  function toggleOpen() {
    open = !open;
  }

  function handleSkinSelect(index: number) {
    open = false;
    actions.setSkin(index);
    try {
      localStorage.setItem("hokkiemojipicker-skin", String(index));
    } catch (e) {}
  }
</script>

<div class="relative mr-1">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="HOKKIEMOJIPICKER-skinselector-trigger opacity-75 hover:opacity-100 cursor-pointer *:size-7 *:min-w-7"
    on:click={toggleOpen}
  >
    {@html renderedCurrentSkin}
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    style:opacity={open ? 1 : 0}
    style:pointer-events={open ? "all" : "none"}
    class="absolute flex transition-all flex-col cursor-pointer top-full translate-y-2 overflow-hidden -left-2 rounded-sm border-1 bg-neutral-900 z-[60]"
  >
    {#each availableSkins as item (item.i)}
      <div
        class="HOKKIEMOJIPICKER-skinselector-skinoption *:size-7 *:min-w-7 hover:bg-white/5 p-2 transition-all"
        on:click={() => handleSkinSelect(item.i)}
      >
        {@html render(item.skin || "")}
      </div>
    {/each}
  </div>
</div>