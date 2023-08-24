<template>
  <div class="">
    <NavBar />
    <main>
      <slot />
    </main>
    <PageFooter />
    <BackTop :visibilityHeight="300" />
    <ToolButton />
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
