<template>
  <div class="bottombar">
      <p>Copyright © 2020 Project M Thailand All right reserved.</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.bottombar{
    width: 100%;
    height: 60px;
    background: #0c164f;
    position:relative;
    bottom: 0;
    padding: 16px 8px;
    box-shadow: 0px -2px 4px 0px #00000050;
}

p{
    font-size: 16px;
    text-align: center;
    color: white;
}

@media screen and (max-width: 435px){
    .bottombar{
        padding: 8px;
    }
}
</style>