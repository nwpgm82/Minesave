<template>
<div class="profile">
    <!-- {{profile[0].uid}} -->
    <!-- <p>{{this.$route.params.profile}}</p> -->
    <div class="profile_bg">
        <div v-if="authenticatedUser.uid == uid" class="profile_box">
            <div class="profile_box_img">
                <img :src="profile[0].photoURL" alt="" class="profile_img">
            </div>
            <div class="profile_box_name">
                <p class="profile_name">{{profile[0].displayName}}</p>
                <div class="profile_info">
                    <a-icon type="mail" style="font-size:24px" />
                    <div class="profile_box_text">
                        <p class="profile_text">{{profile[0].email}}</p>
                    </div>
                </div>
                <div class="profile_info">
                    <a-icon type="idcard" style="font-size:24px" />
                    <div class="profile_box_text" v-if="profile[0].phoneNumber">
                        <p class="profile_text">{{profile[0].phoneNumber}}</p>
                    </div>
                    <div class="profile_box_text" v-if="profile[0].phoneNumber == null">
                        <p class="profile_text">No data</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <img src="~/assets/img/profile_cover.jpg" alt="" > -->

    <!--------------------------------------------->
    <div style="margin-top:60px" class="profile_detail">
        <a-row  :gutter="[16,16]" style="width:100%;margin:0 auto">
            <a-col  :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :xxl="8">
                <div class="profile_detail_card">
                    <div style="padding: 14px;display: block;margin: auto;">
                        <a-progress type="circle" class="profile_circle" :stroke-color="{'0%': '#ba1e68','100%': '#0c164f',}" :percent="(userData.money*100)/7260" :strokeWidth="14" :width="80" :format="percent => percent.toFixed(2) + '%'" />
                    </div>
                    <div style="padding: 16px 16px">
                        <p class="profile_detail_text1">Percent of Piggy bank</p>
                        <nuxt-link :to="`/piggy/${authenticatedUser.uid}`"><button class="profile_piggy_btn">Go to my Piggy</button></nuxt-link>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
    <!-- {{authenticatedUser.uid}} -->
</div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import {
    db
} from "@/plugins/firebaseConfig.js";
export default {
    layout: 'main',
    data() {
        return {
            uid: this.$route.params.profile,
            authenticatedUser: {},
            profile: [],
            userData: {}
        }
    },
    methods: {
        async create() {
            await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.authenticatedUser = user
                    // console.log("Auth : ", this.authenticatedUser)
                    this.profile.push(this.authenticatedUser)
                    // console.log("Profile : ", this.profile)
                    var docRef = db.collection("Piggy").doc(this.authenticatedUser.uid);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data());
                            this.userData = doc.data()
                            // console.log("userData : ", this.userData)
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            this.showData = false
                            this.NoshowData = true
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                } else {
                    console.log('Not signIn')
                    location.replace('/')
                }
            })
        },
    },
    mounted() {
        this.create()
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.profile {
    width: 100%;
    height: 960px;
    margin: 60px auto 0 auto;
    position: relative;
}

.profile_box {
    width: 60%;
    height: 300px;
    position: absolute;
    top: 0;
    left: 150px;
    right: 150px;
    margin: auto;
    display: grid;
    grid-template-columns: 160px auto;
    padding: 65px 0;
}

.profile_bg {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    filter: brightness(1);
    background: #ba1e68;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.profile_box_img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 1px solid rgb(224, 224, 224);
    overflow: hidden;
    background: white;
}

.profile_img {
    width: 160px;
    height: 160px;
}

.profile_box_name {
    padding: 16px 50px;
}

.profile_name {
    font-size: 26px;
    font-weight: 500;
    color: white;
}

.profile_info {
    display: grid;
    grid-template-columns: 24px auto;
    margin-top: 8px;
}

.profile_box_text {
    padding: 0 16px;
}

.profile_text {
    font-size: 16px;
    font-weight: 500;
    color: white;
    line-height: 22px;
}

.profile_detail {
    width: 60%;
    margin: auto;
}

.profile_detail_card {
    width: 100%;
    background: white;
    display: grid;
    grid-template-columns: 94px auto;
    border-radius: 20px;
}

.profile_detail_text1 {
    font-size: 20px;
    font-weight: bold;
    color: #0c164f;
}
.profile_piggy_btn{
    margin-top: 10px;
    background:#0c164f;
    color: white;
    border: none;
    border-radius: 8px;
    width: 120px;
    height: 36px;
    transition: 0.3s;
    cursor: pointer;
}

.profile_detail_card2{
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
}

.profile_detail_text2{
    font-size: 20px;
    font-weight: 500;
    color: white;
}

@media screen and (max-width: 1199px) {
    .profile{
        height: 1246px;
    }
    .profile_detail {
        width: 80%;
    }

    .profile_detail_card {
        width: 100%;
    }
}

@media screen and (max-width: 1023px) {
    .profile_box {
        width: 80%;
        left: 76px;
    }

    .profile_detail {
        width: 90%;
    }

    .profile_detail_card {
        width: 100%;
    }
}

@media screen and (max-width: 767px) {
    .profile_bg {
        height: 400px;
    }

    .profile_box {
        display: block;
        left: 42px;
    }

    .profile_box_img {
        margin: auto;
    }

    .profile_box_name {
        width: 100%;
        padding: 16px 20px;
        margin: auto;

    }

    .profile_name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }

    .profile_info {
        width: 90%;
        margin: 8px auto 0 auto;
        grid-template-columns: 24px 240px;
    }

    .profile_text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .profile_detail {
        display: block;
        width: 100%;
    }

    .profile_detail_card {
        margin: 16px auto;
    }
}

@media screen and (max-width: 320px) {
    .profile_box {
        left: 32px;
    }

    .profile_info {
        grid-template-columns: 24px 200px;
    }
}
</style><style>
.profile_circle span.ant-progress-text {
    background: linear-gradient(to right, #ba1e68, #0c164f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
