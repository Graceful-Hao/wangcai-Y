<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">
                新增标签
            </button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id" 
            :class="{ selected: selectedTags.indexOf(tag.name) >= 0 }" 
            @click="toggle(tag.name)">
                {{ tag.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import tagHelper from '@/mixins/tagHelper'

@Component
export default class Tags extends mixins(tagHelper) {
    selectedTags: string[] = []

    get tagList() {
        return this.$store.state.tagList;
    }
    created(){
        this.$store.commit('fetchTags')
    }
    toggle(tagName: string) {
        const index = this.selectedTags.indexOf(tagName)
        if (index >= 0) {
            this.selectedTags.splice(index, 1)
        } else {
            this.selectedTags.push(tagName)
        }
        this.$emit('update:value', this.selectedTags)
    }
}
</script>

<style lang="scss" scoped>
.tags {
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    background: white;

    .current {
        display: flex;
        flex-wrap: wrap;

        >li {
            $bg: #d9d9d9;
            background: $bg;
            margin-right: 12px;
            margin-top: 4px;
            padding: 0 16px;
            $h: 24px;
            height: $h;
            line-height: $h;
            border-radius: $h/2;

            &.selected {
                background: darken($bg, 40%);
                color: white;
            }
        }
    }

    >.new {
        padding-top: 16px;

        button {
            padding: 0 3px;
            background: transparent;
            color: #999;
            border: none;
            border-bottom: 1px solid;
        }

    }
}
</style>