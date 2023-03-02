<template>
    <Layout>
        <div class="tags">
            <router-link class="tag"
                         v-for="tag in tags" :key="tag.id"
                         :to="`/labels/edit/${tag.id}`">
                <span>{{ tag.name }}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="wrapper">
            <Button @click="createTag">新建标签</Button>
        </div>
   </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component';
    import Button from '@/components/Button.vue';
    import tagHelper from '@/mixins/tagHelper';


    @Component({components:{Button}})
    export default class Labels extends mixins(tagHelper){
        get tags(){
            return this.$store.state.tagList
        }
        created(){
            this.$store.commit('fetchTags')
        }
    }
</script>

<style lang="scss" scoped>
.tags {
    background: white;
    padding-left: 16px;
    font-size: 16px;
    > .tag{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        min-height: 44px;
        :deep(svg) {
            margin-right: 16px;
            width: 20px;
            height: 20px;
            color: rgb(92, 91, 91);
        }
    }
}
.wrapper {
    text-align: center;
    margin-top: 44px;
}

</style>