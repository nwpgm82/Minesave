<template>
<div class="about">
    <p class="about_topic">About me</p>
    <p class="about_topic_sub">ข้อมูลผู้สร้าง Minesave</p>
    <div class="about_profile">
        <a-row>
            <a-col :xxl="8">
                <img src="~/assets/img/about_profile_img.jpg" alt="" class="about_profile_img">
            </a-col>
            <a-col :xxl="16">
                <a-row>
                    <p class="about_profile_detail_topic">ข้อมูลส่วนตัว</p>
                    <a-col :xxl="6">
                        <div class="about_profile_detail_text">
                            <p><strong>ชื่อ : </strong></p>
                            <p><strong>เกิดวันที่ : </strong></p>
                            <p><strong>อายุ : </strong></p>
                            <p><strong>ศึกษาที่ : </strong></p>
                            <p><strong>สาขาวิชา : </strong></p>
                            <p><strong>ความใฝ่ฝัน : </strong></p>
                            <p><strong>ข้อมูลการติดต่อ : </strong></p>
                        </div>
                    </a-col>
                    <a-col :xxl="18">
                        <div class="about_profile_detail_text">
                            <p>Nawapol Noradechanun</p>
                            <p>21 December 1998</p>
                            <p>21 years</p>
                            <p>Maejo University '82</p>
                            <p>Computer Science</p>
                            <p>Front-end Developer</p>
                            <a-col :xxl="2">
                                <div style="margin-top:8px">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="facebook" class="about_profile_detail_img">
                                </div>
                                <div style="margin-top:8px">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png" alt="instagram" class="about_profile_detail_img">
                                </div>
                            </a-col>
                            <a-col :xxl="4">
                              <div style="margin-top:8px">
                                <a href="https://www.facebook.com/nwpgm" target="_blank" >
                                    <p style="color:#29487D;padding-top:2px">Facebook</p>
                                </a>
                              </div>
                                <div style="margin-top:8px">
                                  <a href="https://www.instagram.com/nwpge/" target="_blank" >
                                    <p style="color:#DD2A7B;padding-top:2px">Instagram</p>
                                </a>
                                </div>
                                
                            </a-col>
                        </div>

                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</div>
</template>

<script>
export default {
    layout: 'main'
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.about {
    width: 1000px;
    height: 960px;
    margin: 60px auto;
    padding: 60px 0;
}

.about_topic {
    font-size: 24px;
    font-weight: 500;
    font-style: initial;
    color: white;
}

.about_topic_sub {
    font-size: 16px;
    font-weight: 500;
    font-style: initial;
    color: white;
    text-decoration: underline;
}

.about_profile {
    margin-top: 60px;
    width: 100%;
}

.about_profile_img {
    width: 160px;
    height: 160px;
    border-radius: 12px;
    box-shadow: 0 2px 5px 0 #000000;
}

.about_profile_detail_topic {
    margin-bottom: 16px;
    font-size: 22px;
    font-weight: 500;
    text-decoration: underline;
    color: white;
}

.about_profile_detail_text p {
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 500;
    color: white;
}

.about_profile_detail_img {
    width: 30px;
    height: 30px;
}
</style>
