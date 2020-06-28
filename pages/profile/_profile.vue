<template>
<div class="profile">
    <div class="profile_bg">
        <img :src="authenticatedUser.photoURL" alt="" class="profile_img">
        <!-- <img :src="authenticatedUser.photoURL" alt="" style="display:block;margin:auto;width:160px;height:160px;border-radius:50%"> -->
    </div>
    <div class="profile_detail">
        <div class="profile_name_box">
            <p class="profile_name">{{authenticatedUser.displayName}}</p>
        </div>
        <div class="profile_circle_box">
            <a-progress type="circle" :stroke-color="{'0%': '#ba1e68','100%': '#5643fd',}" :percent="(userData.money*100)/7290" :width="90" :strokeWidth="10" class="profile_circle" :format="percent => percent.toFixed(2) + '%'" />
        </div>
        <div class="profile_money_box">
            <p class="profile_money" v-show="piggynoShow">ไม่มีกระปุก...</p>
            <p class="profile_money" v-show="piggyShow">Total : {{userData.money}} Baht</p>
        </div>
        <div class="profile_piggy_box">
            <nuxt-link :to="`/piggy/${authenticatedUser.uid}`"><button class="profile_piggy_btn profile_piggy_btn_color">Go to Piggy</button></nuxt-link>
        </div>
    </div>
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
            userData: {},
            piggynoShow: false,
            piggyShow: false
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
                            this.piggyShow = true
                            // console.log("userData : ", this.userData)
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            console.log(this.userData)
                            this.piggynoShow = true
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
    width: 1000px;
    height: 960px;
    margin: auto;
}

.profile_bg {
    margin: 60px auto 0 auto;
    width: 100%;
    height: 300px;
    position: relative;
    background: url("~@/assets/img/profile_cover.jpg");
    background-size: cover;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 2px 5px 0 #000000;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.profile_detail {
    width: 1000px;
    height: auto;
    margin: auto;
    padding: 90px 0;
}

.profile_img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: relative;
    top: 200px;
    left: 420px;
    right: 420px;
    margin: auto;
    background: white;
    box-shadow: 0 2px 5px 0 #000000;
}

.profile_name_box {
    width: 300px;
    margin: auto;
}

.profile_name {
    font-size: 20px;
    font-weight: 500;
    color: white;
    text-align: center;
}

.profile_circle_box {
    width: 500px;
    margin: 40px auto 20px auto;
}

.profile_circle {
    width: 90px;
    display: block;
    margin: auto;
}

.profile_money_box {
    width: 300px;
    margin: auto;
}

.profile_money {
    font-size: 18px;
    font-weight: 500;
    color: white;
    text-align: center;
}

.profile_piggy_box {
    width: 300px;
    margin: 20px auto;
}

.profile_piggy_btn {
    width: 120px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 12px;
    display: block;
    margin: auto;
    transition: 0.3s;
    cursor: pointer;
    background-size: 300% 100%;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.profile_piggy_btn_color {
    background-image: linear-gradient(to right, #ba1e68, #13237e, #101d64, #0c164f);
    box-shadow: 0 4px 15px 0 #000000;
}

.profile_piggy_btn:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

@media screen and (max-width: 1024px) {
    .profile {
        height: 1366px;
    }

    .profile_bg {
        width: 82%;
    }

    .profile_img {
        left: 328px;
        right: 328px
    }
}

@media screen and (max-width: 1023px) {
    .profile {
        width: 100%;
    }

    .profile_img {
        left: 235px;
        right: 235px;
    }

    .profile_detail {
        width: 100%;
    }

    .profile_circle_box {
        width: 100%;
    }
}

@media screen and (max-width: 414px) {
    .profile {
        height: 100%;
    }

    .profile_bg {
        width: 95%;
    }

    .profile_img {
        left: 118px;
        right: 118px;
    }
}

@media screen and (max-width: 400px) {
    .profile_img {
        left: 99px;
        right: 99px;
    }
}

@media screen and (max-width: 360px) {
    .profile_img {
        left: 91px;
        right: 91px;
    }
}

@media screen and (max-width: 320px) {
    .profile_img {
        left: 72px;
        right: 72px;
    }
}
</style><style>
.profile_circle .ant-progress-circle {
    width: 90px !important;
    height: 90px !important;

}

.profile_circle .ant-progress-inner {
    width: 90px !important;
    height: 90px !important;
    background: rgba(255, 255, 255, 0.85);

}

/* .profile_circle .ant-progress-circle-trail{
    stroke: rgb(255, 255, 255) !important;
} */
.profile_circle span.ant-progress-text {
    background: linear-gradient(to right, #ba1e68, #0c164f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
