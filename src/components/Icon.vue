<template>
    <div>
        <svg class="icon" >
            <use :xlink:href="'#'+name"/>
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
    try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

    export default Vue.extend({
        props: ['name'],
    })
</script>

<style lang="scss" scoped>
    .icon { 
        width: 29px; 
        height: 29px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        fill: currentColor;
    }


</style>