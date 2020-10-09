<template>
    <div class="footer">
     <h1> Footer </h1>
    </div>
</template>

<script>
export default {
    name:'Footer'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: cornflowerblue;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>