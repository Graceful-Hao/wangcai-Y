<template>
    <div>
        <label class="notes">
            <span>{{fieldName}}</span>
            <input type="text"
                   :value="value"
                   @input="onValueChange($event.target.value)"
                   :placeholder="placeholder">
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Notes extends Vue {
    @Prop({default:''}) value!:string;

    @Prop({required:true}) fieldName!:string;
    @Prop() placeholder!:string;

    // @Watch('value')
    onValueChange(value:string){
        this.$emit('update:value', value)
    }
}
</script>

<style lang="scss" scoped>
.notes {
    display: flex;
    align-items: center;
    font-size: 14px;

    span {
        padding: 0 16px;
    }

    input {
        height: 44px;
        flex-grow: 1;
        border: none;
        background: transparent;
    }
}
</style>