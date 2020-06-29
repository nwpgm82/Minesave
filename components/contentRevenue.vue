<template>
<div class="rev">
    <div class="rev_detail">
        <div class="rev_img_box" id="box1">
            <img src="~/assets/img/save_money.png" alt="" class="rev_img">
        </div>
        <div class="rev_text_box" id="box2">
            <p class="rev_text">สามารถบันทึกการเก็บเงินได้ตลอดเวลา</p>
            <button class="rev_piggy_btn rev_piggy_btn_color" @click="piggy(authenticatedUser)">Go to piggy</button>
        </div>
    </div>
    <div class="rev_detail">
        <div class="rev_text_box" id="box2">
            <p class="rev_text">สามารถบันทึกรายรับรายจ่ายได้ตลอดเวลา (coming soon)</p>
            <a-tooltip placement="top" title="Coming soon...">
                <button class="rev_piggy_btn rev_piggy_btn_color">Go to book</button>
            </a-tooltip>
        </div>
        <div class="rev_img_box" id="box1">
            <img src="~/assets/img/rev_exp.png" alt="" class="rev_img">
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
    data() {
        return {
            authenticatedUser: null
        }
    },

    methods: {
        async create() {
            await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.authenticatedUser = user
                    // console.log(this.authenticatedUser)
                } else {
                    console.log('Not signIn')
                }
            })
        },
        async piggy(auth) {
            if (this.authenticatedUser != null) {
                location.assign(`/piggy/${this.authenticatedUser.uid}`)
            } else {
                var provider = await new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    // console.log('token : ', token)
                    // console.log('user : ', user.uid)
                    location.assign(`/piggy/${user.uid}`)
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            }
        }
    },
    async mounted() {
        await this.create()
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.rev {
    width: 1000px;
    height: auto;
    padding: 60px 14px;
    margin: auto;
}

.rev_detail {
    display: flex;
    justify-content: space-around;
    margin-bottom: 60px;
}

.rev_img {
    width: 300px;
    height: 300px;
}

.rev_text_box {
    padding: 88px 14px;
}

.rev_text {
    font-size: 20px;
    color: white;
    font-weight: 500;
}

.rev_piggy_btn {
    width: 160px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: white;
    color: white;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
    display: block;
    margin: 40px auto auto auto;
    background-size: 300% 100%;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.rev_piggy_btn_color {
    background-image: linear-gradient(to right, #ba1e68, #13237e, #101d64, #0c164f);
    box-shadow: 0 4px 15px 0 #000000;
}

.rev_piggy_btn:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

@media screen and (max-width: 1023px) {
    .rev {
        width: 100%;
        padding: 60px 24px;
    }
}

@media screen and (max-width: 767px) {
    .rev_detail {
        flex-flow: column;
    }

    .rev_img_box,
    .rev_text_box {
        width: 100%;
    }

    .rev_img {
        width: 100%;
        height: 100%;
        display: block;
        margin: auto;
    }

    .rev_text_box {
        padding: 58px 10px;
    }

    .rev_text {
        text-align: center;
    }

    #box1 {
        order: 1;
    }

    #box2 {
        order: 2;
    }
}
</style>
