<template>
    <div class= "layout-wrapper">
        <div class= "content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
        </div>   
        <Nav/>  
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['classPrefix']
        
    })
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
   }
   .content {
        overflow: auto;
        flex-grow: 1;      
   }

</style>