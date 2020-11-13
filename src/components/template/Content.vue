<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content{
        grid-area: content;
        background-color: #efefef;
        padding-top:1%;
        padding-left:2%;
        padding-right: 2%;
        justify-content: center        
    }
</style>