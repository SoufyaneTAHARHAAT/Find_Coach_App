<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    max-width: 40rem;
    margin: 2rem auto;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
}
</style>