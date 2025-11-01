<script lang="ts" setup>
import ThemeSwap from "@/components/ThemeSwap.vue"
import FontChange from "@/components/FontChange.vue"

defineProps<{ user: string; repo: string }>()
</script>

<template>
  <header class="header-note">
    <router-link
      :to="{ name: 'Home' }"
      class="button is-small is-white back-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-narrow-left"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="12" x2="9" y2="16" />
        <line x1="5" y1="12" x2="9" y2="8" />
      </svg>
    </router-link>
    <!-- <router-link
      :to="{ name: 'SpacedRepetitionCard', params: { user, repo } }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-id"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <line x1="15" y1="8" x2="17" y2="8" />
        <line x1="15" y1="12" x2="17" y2="12" />
        <line x1="7" y1="16" x2="17" y2="16" />
      </svg>
    </router-link> -->

    <button onclick="font_modal.showModal()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icons-tabler-outline icon-tabler-typography"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 20l3 0" />
        <path d="M14 20l7 0" />
        <path d="M6.9 15l6.9 0" />
        <path d="M10.2 6.3l5.8 13.7" />
        <path d="M5 20l6 -16l2 0l7 16" />
      </svg>
    </button>
    <router-link :to="{ name: 'DraftNotes', params: { user, repo } }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-notes"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    </router-link>
    <router-link :to="{ name: 'FluxNoteView', params: { user, repo } }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    </router-link>
    <router-link :to="{ name: 'FleetingNotes', params: { user, repo } }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-mailbox"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5"
        />
        <path d="M12 11v-8h4l2 2l-2 2h-4" />
        <path d="M6 15h1" />
      </svg>
    </router-link>
    <dialog id="font_modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Font settings</h3>
        <font-change />
      </div>
    </dialog>
    <theme-swap />
  </header>
</template>

<style scoped lang="scss">
.header-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  img {
    &:hover {
      cursor: pointer;
    }
  }

  button {
    color: var(--color-accent);
  }
}
</style>
