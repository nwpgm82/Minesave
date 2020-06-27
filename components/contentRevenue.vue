<template>
<div style="background:white;padding:60px 0;">
    <div class="save">
        <img src="~/assets/img/save_money.png" alt="" id="save_img" class="save_img">
        <div id="save_textbox" class="save_textbox">
            <p class="save_text">คุณสามารถบันทึกการเก็บเงินของคุณได้ตลอดเวลา</p>
        </div>
    </div>
    <div class="rev_exp">
        <div id="rev_exp_textbox" class="rev_exp_textbox">
            <p class="rev_exp_text">คุณสามารถบันทึกรายรับรายจ่ายได้สะดวกทุกเวลา</p>
        </div>
        <img src="~/assets/img/rev_exp.png" alt="" id="rev_exp_img" class="rev_exp_img">
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

.save {
    width: 80%;
    height: 300px;
    margin: auto;
    display: flex;
    justify-content: space-around;
}

.save_img {
    width: 300px;
    height: 300px;
}

.save_textbox {
    display: flex;
    justify-content: center;
    align-items: center;
}

.save_text {
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
    text-decoration: underline;
    color: #0c164f;
}

.rev_exp {
    width: 80%;
    height: 300px;
    margin: 60px auto;
    display: flex;
    justify-content: space-around;
}

.rev_exp_img {
    width: 300px;
    height: 300px;
}

.rev_exp_textbox {
    display: flex;
    justify-content: center;
    align-items: center;
}

.rev_exp_text {
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
    text-decoration: underline;
    color: #0c164f;
}

@media screen and (max-width: 767px) {
    .save,.rev_exp{
        flex-flow: column;
        height: 400px;
        width: 82%;
    }
    #save_img,#rev_exp_img {
        order: 1;
    }

    #save_textbox,#rev_exp_textbox {
        order: 2;
    }

    .save_img,.rev_exp_img {
        display: block;
        margin: auto;
    }
}
</style>
