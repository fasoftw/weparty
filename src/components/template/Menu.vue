<template>
 <div class="menu">
    <h1>Menu</h1>
 </div>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style>
    .menu {
        grid-area: menu;
        background-color: darkorange;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>