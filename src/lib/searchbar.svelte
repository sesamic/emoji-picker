<script lang="ts">
  import { getPickerState } from "./stores";
  import { MagnifierLinear } from "./icons"; 

  export let searchPlaceholder: string;
  export let id: string;

  const { searchPlaceholderStore, searchValueStore, actions } = getPickerState(id);

  let isFocused = false;
  let inputElement: HTMLInputElement;

  $: currentPlaceholder = $searchPlaceholderStore || searchPlaceholder;
</script>

<div
  data-focused={isFocused}
  class="bg-white/5 items-center w-full border-1 border-[#323337] p-2 px-3 flex rounded-md data-[focused=true]:border-[#3687E9]"
>
  <input
    bind:this={inputElement}
    bind:value={$searchValueStore}
    class="!outline-0 text-lg w-full bg-transparent text-inherit placeholder-inherit"
    on:focus={() => (isFocused = true)}
    on:blur={() => (isFocused = false)}
    placeholder={currentPlaceholder}
  />
  <MagnifierLinear class="size-5 opacity-50" />
</div>