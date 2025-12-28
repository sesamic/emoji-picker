<script lang="ts">
  let { ...props } = $props();
</script>

<svg
  aria-hidden="true"
  fill="none"
  focusable="false"
  height="1em"
  role="presentation"
  viewBox="0 0 24 24"
  width="1em"
  {...props}
>
  <circle
    cx="11.5"
    cy="11.5"
    r="9.5"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <path
    d="M18.5 18.5L22 22"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
</svg>