<template>
<div>
    <navbar/>
    <nuxt/>
    <bottombar/>
</div>
</template>

<script>
import navbar from '@/components/navbar'
import bottombar from '@/components/bottombar'
export default {
    components:{
        navbar,
        bottombar
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Kanit', sans-serif;
}

html{
    scroll-behavior: smooth;
}

body{
    background: #22003F;
}


</style>
