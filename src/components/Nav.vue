<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name = "money"/>
            记账            
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name = "label"/>
            标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <icon name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
    
    import Vue from 'vue'

    export default Vue.extend({
        
        
    })
</script>

<style lang= "scss"  scoped>
  @import "@/assets/style/helpper.scss";

    nav {
        @extend %outerShadow;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        font-size: 12px;
      > .item {
        padding: 2px 0;       
      }
      >.item.selected {
        color: $color-highlight
      }
    }


</style>