<!--
  @file WorkspaceTabNewTableEmptyState.vue
  @description 新建表空状态

  新建表时无列定义的占位提示。

  @module renderer/components/WorkspaceTabNewTableEmptyState
-->
<template>
   <div class="column col-12 empty">
      <p class="h6 empty-subtitle">
         {{ t('database.thereAreNoTableFields') }}
      </p>
      <div class="empty-action">
         <button class="btn btn-gray d-flex" @click="emit('new-field')">
            <BaseIcon
               class="mr-2"
               icon-name="mdiPlaylistPlus"
               :size="24"
            />
            {{ t('database.addNewField') }}
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import BaseIcon from '@/components/BaseIcon.vue';

const { t } = useI18n();
const emit = defineEmits(['new-field']);
</script>

<style scoped>
  .empty {
    border-radius: 0;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    z-index: 9;
  }
</style>
