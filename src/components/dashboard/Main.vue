<template>
    <div class="main">
        <Nav />
        <div class="main-cont">
            <Recommendation />
        </div>


    </div>

</template>

<script>

import Nav from './Nav'
import Recommendation from './recommendation/Recommendations'
export default {
    name:'Main',
    components:{Nav, Recommendation}

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
        margin-top: 5px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .nav-dashboard{
        background-color: #FFF;
    }

</style>