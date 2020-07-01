<template>
<div class="bottombar" id="about">
    <div class="bottombar_box">
        <a-row>
            <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" :xxl="5">
                <img src="~/assets/img/logo.png" alt="" class="bottombar_logo">
                <div style="margin-top:40px">
                    <p class="bottombar_title">Minespace.</p>
                    <p class="bottombar_copyright">Copyright © 2020 Minesave Thailand All right reserved.</p>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19" :xxl="19">
                <div class="bottombar_content">
                    <div class="bottombar_built">
                        <div style="padding:22px 0">
                            <p class="bottombar_topic">Built with : </p>
                        </div>
                        <div style="padding:14px 0">
                            <a href="https://nuxtjs.org/" target="blank"><img src="~/assets/img/built/nuxt.png" alt="" class="bottombar_logo2"></a>
                            <a href="https://www.antdv.com/" target="blank"><img src="~/assets/img/built/antdv.png" alt="" class="bottombar_logo2"></a>
                            <a href="https://firebase.google.com/" target="blank"><img src="~/assets/img/built/firebase.png" alt="" class="bottombar_logo2"></a>
                        </div>
                    </div>
                    <div class="bottombar_social">
                        <p class="bottombar_big_title">Don't forget to save your money if you can.</p>
                        <div style="margin-top:12px">
                            <a href="https://www.facebook.com/nwpgm/" target="blank"><img src="~/assets/img/social/facebook.png" alt="" class="bottombar_logo3"></a>
                            <a href="https://www.instagram.com/nwpge/" target="blank"><img src="~/assets/img/social/instagram.png" alt="" class="bottombar_logo3"></a>
                        </div>
                    </div>
                </div>

            </a-col>
        </a-row>
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

.bottombar {
    position: relative;
    bottom: 0;
    width: 100%;
    height: auto;
    padding: 16px 0;
    background-color: #19002A;
}

.bottombar_logo {
    width: 80px;
    height: 80px;
    opacity: 1;
}

.bottombar_content{
    padding-left:60px;
}

.bottombar_built {
    display: grid;
    grid-template-columns: 120px auto;
    width: 100%;
    height: 80px;
}

.bottombar_topic {
    font-size: 20px;
    font-weight: 500;
    color: white;
}

.bottombar_box {
    width: 1000px;
    margin: 40px auto;
}

.bottombar_title {
    font-size: 16px;
    font-weight: 500;
    font-style: italic;
    color: white;
}

.bottombar_copyright {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;
    color: white;
}

.bottombar_social{
    margin-top:40px;
}

.bottombar_big_title {
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
    color: white;
}

.bottombar_logo_box {
    display: flex;
    justify-content: space-around;
}

.bottombar_logo2 {
    width: 50px;
    height: 50px;
    transition: 0.3s;
}

.bottombar_logo3 {
    width: 30px;
    height: 30px;
    margin-right: 12px;
    box-shadow: 0 2px 5px 0 #000000;
    transition: 0.3s;
}

.bottombar_logo3:hover,
.bottombar_logo2:hover {
    filter: brightness(0.8);
}

@media screen and (max-width: 1024px) {
    .bottombar_box {
        width: 80%;
        padding: 0 14px;
    }
}

@media screen and (max-width: 1023px) {
    .bottombar_box {
        width: 92%;    
    }
}

@media screen and (max-width: 767px){
    .bottombar_box, div{
        padding: 0;
    }

    .bottombar_content{
        padding: 0;
    }

    .bottombar_built, .bottombar_social{
        margin-top: 16px;
    }

    .bottombar_logo2{
        width: 40px;
        height: 40px;
    }
}
</style>
