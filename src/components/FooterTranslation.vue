<script lang="ts" setup>
import { useI18n } from "vue-i18n"

import { locales } from "@/locales/message"

const { t } = useI18n()
const i18n = useI18n()

const toggleLanguage = () =>
  (i18n.locale.value =
    locales[(locales.indexOf(i18n.locale.value) + 1) % locales.length])
</script>

<template>
  <footer class="footer-translation">
    <button class="button" @click="toggleLanguage">
      {{ t("toggle-lang") }}
    </button>
  </footer>
</template>
