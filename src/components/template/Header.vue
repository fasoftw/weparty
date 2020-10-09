<template>
    <div class="header">
        <h1> Header </h1> 
    </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style>
    .header{
        grid-area: header;
        background-color: cyan;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    
</style>