<template>
<div class="cover">
    <div>
        <p class="cover_topic">Welcome to Minesave</p>
        <p class="cover_text">Revenue Accounts & Expenses Accounts</p>
    </div>
</div>
</template>

<script>
export default {
   
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.cover {
    width: 100%;
    height: 400px;
    background: url("~@/assets/img/profile_cover.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0px 2px 4px 0px #00000050;
    display: flex;
    justify-content: center;
    align-items: center;

}

.cover_topic {
    font-size: 50px;
    font-weight: 500;
    font-style: italic;
    color: white;
    text-shadow: 4px 4px #000000;
    text-align: center;
}

.cover_text {
    font-size: 30px;
    font-weight: 500;
    font-style: italic;
    color: white;
    text-shadow: 4px 2px #000000;
    text-align: center;
}
</style>
