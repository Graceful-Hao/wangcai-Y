<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goback" />
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="note-wrapper">
            <Notes :value="tag?.name" @update:value="update" field-name="标签名" placeholder="请输入标签名" />
        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({ components: { Notes, Button } })
export default class Editlabel extends Vue {
    get tag() {
       return this.$store.state.currentTag
    }
    created() {
        this.$store.commit('fetchTags')
        this.$store.commit('setCurrentTag', this.$route.params.id)
        if (!this.tag) {
            this.$router.replace('/404')
        }
    }
    update(name: string) {
        if (this.tag) {
            this.$store.commit('updateTag',{id:this.tag.id, name})
        }
    }
    remove() {
        if (this.tag) {
            this.$store.commit('removeTag', this.tag.id)
        }
    }
    goback() {
        this.$router.back()
    }
}
</script>

<style lang="scss" scoped>
.navBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: white;
    font-size: 16px;

    :deep(svg) {
        width: 24px;
        height: 24px;
    }

    .rightIcon {
        width: 20px;
        height: 20px;
    }
}

.note-wrapper {
    background: white;
    margin-top: 8px;
}

.button-wrapper {
    text-align: center;
    margin-top: 44px;
}
</style>