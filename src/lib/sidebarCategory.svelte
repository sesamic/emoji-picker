<script lang="ts">
  import { onDestroy } from "svelte";
  import { getPickerState } from "./stores";

  export let categoryName: string;
  export let picker: HTMLDivElement;
  export let icon: string;
  export let id: string;

  const { searchValueStore, actions } = getPickerState(id);
  
  let isActive = false;
  let scrollElement: Element | null = null;

  let cleanupListener: (() => void) | null = null;

  $: if (picker && !cleanupListener) {
    scrollElement = picker.querySelector(".HOKKIEMOJIPICKER-emojidisplay");
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateActive);
      cleanupListener = () => {
        scrollElement?.removeEventListener("scroll", updateActive);
      };
      updateActive();
    }
  }

  $: if ($searchValueStore !== undefined) {
    updateActive();
  }

  onDestroy(() => {
    if (cleanupListener) cleanupListener();
  });

  function updateActive() {
    if (($searchValueStore || "").length > 0) {
      isActive = false;
      return;
    }

    if (!picker || !scrollElement) return;

    const header = picker.querySelector(
      ".HOKKIEMOJIPICKER-categoryHeader." + categoryName
    ) as HTMLElement;

    if (!header) return;

    const categoryContainer = header.parentElement as HTMLElement;
    const containerRect = scrollElement.getBoundingClientRect();
    const categoryRect = categoryContainer.getBoundingClientRect();
    const headerHeight = header.offsetHeight;
    
    const categoryTop = categoryRect.top - containerRect.top + scrollElement.scrollTop;
    const categoryBottom = categoryTop + categoryContainer.offsetHeight;
    const sTop = scrollElement.scrollTop;

    const inView =
      sTop >= categoryTop - headerHeight &&
      sTop < categoryBottom - headerHeight;

    isActive = inView;
  }

  function handleClick() {
    if (!picker) return;

    const doScroll = () => {
      const header = picker.querySelector(
        ".HOKKIEMOJIPICKER-categoryHeader." + categoryName
      ) as HTMLElement;

      if (!header) return;

      const categoryContainer = header.parentElement as HTMLElement;
      const scrollElem = picker.querySelector(
        ".HOKKIEMOJIPICKER-emojidisplay"
      );

      if (!scrollElem) return;

      const containerRect = scrollElem.getBoundingClientRect();
      const categoryRect = categoryContainer.getBoundingClientRect();
      const headerHeight = header.offsetHeight;

      const targetTop =
        categoryRect.top -
        containerRect.top +
        scrollElem.scrollTop -
        headerHeight;

      scrollElem.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
    };

    if (($searchValueStore || "").length > 0) {
        actions.setSearchValue("");
        setTimeout(doScroll, 50);
    } else {
        doScroll();
    }
  }
</script>

<button
  on:click={handleClick}
  data-active={isActive ? "true" : "false"}
  class="!outline-0 HOKKIEMOJIPICKER-sidebarButton cursor-pointer size-8 data-[active=true]:bg-white/5 hover:bg-white/10 overflow-hidden *:!size-6.5 transition-all hover:*:!opacity-85 data-[active=true]:*:!opacity-100 flex items-center justify-center rounded-sm *:opacity-50"
>
  {@html icon}
</button>