<template>
    <div class="main">
        <Nav />
        <div class="main-cont">
            <b-container  class="border border-secondary">
                <b-row>
                    <b-col>Party em andamento</b-col>
                </b-row>
            </b-container>
            <b-container class="border border-secondary" style="margin-top: 1%;">
                <b-row>
                    <b-col>Recomendações</b-col>
                </b-row>
            </b-container>
        </div>
    </div>

</template>

<script>

import Nav from './Nav'
export default {
    name:'Main',
    components:{Nav}

}
</script>

<style>
    .main-cont{
        height: 100%;
        display: flex;
        justify-content: flex-start ;
        align-items: flex-start;
        flex-wrap: wrap;
        background-color: #FFF;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .nav-dashboard{
        background-color: #FFF;
    }

</style>