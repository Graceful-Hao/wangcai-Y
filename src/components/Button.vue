<template>
    <button @click="$emit('click', $event)">
    <slot/>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style lang="scss" scoped>
button {
    border: none;
    background: #767676;
    color: white;
    border-radius: 6px;
    height: 40px;
    padding: 0 16px;
}
</style>