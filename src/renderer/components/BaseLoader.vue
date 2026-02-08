<!--
  @file BaseLoader.vue
  @description 加载指示器组件

  显示加载中状态的动画指示器。

  @module renderer/components/BaseLoader
-->
<template>
   <div class="empty">
      <div class="loading loading-lg" />
   </div>
</template>

<style scoped>
.empty {
  position: absolute;
  display: flex;
  height: 100%;
  flex-direction: column;
  left: 0;
  justify-content: center;
  right: 0;
}
</style>
