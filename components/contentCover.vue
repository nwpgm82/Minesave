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
    margin-top: 60px;
    width: 100%;
    height: 400px;
    background: #0c164f;
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
    text-shadow: 4px 4px #000000;
    text-align: center;
}
</style>
