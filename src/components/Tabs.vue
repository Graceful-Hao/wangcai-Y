<template>
    <ul class="tabs">
        <li v-for="item in dataSource" :key="item.value"
        class="tabs-item" :class="liClass(item)"
            @click="select(item)">{{ item.text }}</li>
    </ul>
    
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

type DataSourceItem = {
    text: string, value: string
}

@Component
export default class Tabs extends Vue {
    @Prop({ required: true, type:Array}) dataSource!:DataSourceItem[]
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    liClass(item:DataSourceItem){
        return { selected: item.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix }
    }
    select(item:DataSourceItem){
        this.$emit('update:value', item.value)
    }

}
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    text-align: center;
    background: #c4c4c4;
    font-size: 24px;

    &-item {
        width: 50%;
        height: 64px;
        line-height: 64px;

        &.selected {
            border-bottom: 4px solid;
        }
    }
}
</style>