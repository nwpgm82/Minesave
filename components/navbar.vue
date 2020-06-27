<template>
<div class="navbar">
    <div class="navbar_container">
        <div class="navbar_logo">
            <p class="navbar_logo_text">Minesave</p>
            <div style="padding:4px;width:30px;height:30px" @click="navbar_toggle()">
                <div class="navbar_toggle"></div>
                <div class="navbar_toggle"></div>
                <div class="navbar_toggle"></div>
            </div>
        </div>
        <div class="navbar_menu">
            <ul class="navbar_ul">
                <a href="/">
                    <li>Home</li>
                </a>
                <a href="/">
                    <li>About me</li>
                </a>
                <a v-if="authenticatedUser == null" v-show="signInShow">
                    <li>
                        <button @click="signIn()">Login with
                            <img src="~/assets/img/google.png" alt="" class="navbar_login_img">
                        </button>
                    </li>
                </a>
                <li v-if="authenticatedUser != null" v-show="profileShow">
                    <div>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                <img :src="authenticatedUser.photoURL" alt="" class="navbar_profile">
                                <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay" class="navbar_profileDropdown">
                                <a-menu-item key="0">
                                    <a :href="`/profile/${authenticatedUser.uid}`">
                                        <div class="navbar_profileDropdown_grid">
                                            <img :src="authenticatedUser.photoURL" alt="" class="navbar_profile">
                                            <div style="padding:2px 8px">
                                                <p class="navbar_profileDropdown_name">{{authenticatedUser.displayName}}</p>
                                            </div>
                                        </div>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="1" @click="signOut()" class="navbar_profileDropdown_signOut">
                                    <div style="padding:2px 8px">
                                        <p class="navbar_profileDropdown_logout">Sign out</p>
                                    </div>

                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>

                </li>
            </ul>
            <!-----------mobile-------------->
            <ul class="navbar_ul_mobile" v-show="navbar_ul_show">
                <a href="/">
                    <li>Home</li>
                </a>
                <a href="/">
                    <li>About me</li>
                </a>
                <a v-if="authenticatedUser == null" v-show="signInShow">
                    <li><button @click="signIn()">Login with
                            <img src="~/assets/img/google.png" alt="" class="navbar_login_img">
                        </button></li>
                </a>
                <a :href="`/profile/${authenticatedUser.uid}`" v-if="authenticatedUser != null" v-show="profileShow">
                    <li>
                        <div>
                            <img :src="authenticatedUser.photoURL" alt="" class="navbar_profile">
                        </div>
                    </li>
                </a>

                <a v-if="authenticatedUser != null">
                    <button @click="signOut()" style="width:70px;margin:auto;display:block">Logout</button>
                </a>
            </ul>
        </div>
    </div>
    <!-- <div v-if="authenticatedUser != null" style="display:grid;grid-template-columns: 70px auto;">
        <img :src="authenticatedUser.photoURL" alt="" style="width:60px;height:60px">
        <p style="color : white;font-size:24px">Welcome : {{ authenticatedUser.displayName }} + {{ authenticatedUser.email }}</p>
    </div> -->
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
            navbar_ul_show: false,
            name: '',
            authenticatedUser: null,
            signInShow: false,
            profileShow: false,
            moneyData: [],
        }
    },
    methods: {
        navbar_toggle() {
            this.navbar_ul_show = !this.navbar_ul_show
        },
        async create() {
            await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.authenticatedUser = user
                    // console.log(this.authenticatedUser)
                    this.profileShow = true
                } else {
                    console.log('Not signIn')
                    this.signInShow = true
                }
            })
        },
        async signIn() {
            var provider = await new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                // console.log('token : ', token)
                // console.log('user : ', user.uid)
                location.replace(`/profile/${user.uid}`)
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
        },
        async signOut() {
            if (confirm("คุณต้องการออกจากระบบใช่หรือไม่ ??")) {
                await firebase.auth().signOut().then(() => {

                    // Sign-out successful.
                }).catch((error) => {
                    // An error happened.
                });
                location.reload()
            } else {
                console.log("Nothing")
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

.navbar {
    width: 100%;
    height: 60px;
    background: #0c164f;
    position: fixed;
    top: 0;
    box-shadow: 0px 2px 4px 0px #00000050;
    z-index: 999;
}

.navbar_toggle {
    display: none;
    width: 24px;
    height: 4px;
    border-radius: 4px;
    background: white;
    margin-bottom: 4px;

}

.navbar_container {
    width: 1000px;
    padding: 14px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.navbar_logo {
    height: auto;
}

.navbar_logo_text {
    font-size: 18px;
    color: white;
    font-weight: 500;
    font-style: italic;
    text-shadow: 1px 1px #000000;
}

.navbar_menu {
    width: 30%;
    height: 100%;
    padding: 2px 0;
}

.navbar_ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
}

.navbar_ul_mobile {
    display: none;
}

a li {
    font-size: 16px;
    color: white;
    text-shadow: 1px 1px #000000;
}

button {
    width: 120px;
    height: 28px;
    color: #0c164f;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    border: none;
    padding: 0px 8px 4px 8px;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    text-align: left;
}

button:hover {
    background: rgb(220, 220, 220);
    color: #0c164f;
}

.navbar_login_img {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 4px;
    right: 8px;
}

.navbar_profile {
    width: 30px;
    height: 30px;
    border-radius: 2px;
    background: white;
}

div .navbar_profileDropdown {

    width: 240px !important;
    border-radius: 0 0 4px 4px;
    overflow: hidden;
}

.navbar_profileDropdown_grid {
    display: grid;
    grid-template-columns: 30px auto;
}

.navbar_profileDropdown_name {
    width: 180px;
    font-size: 16px;
    color: #0c164f;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.navbar_profileDropdown_logout {
    font-size: 16px;
    color: white;
    font-weight: 500;
}

div .slide-up-leave {
    top: 0;
}

.navbar_profileDropdown li {
    height: 50px;
    padding: 10px 8px;
}

.navbar_profileDropdown a {
    font-size: 16px;
}

.navbar_profileDropdown_signOut {
    background: rgb(200, 1, 1);
}

.navbar_profileDropdown_signOut:hover {
    background: rgb(160, 1, 1);
}

.navbar_profileDropdown_signOut a {
    color: white;
}

@media screen and (max-width: 1279px) {
    .navbar_container {
        width: 80%;
    }

}

@media screen and (max-width: 1024px) {
    .navbar_menu {
        width: 40%;
    }
}

@media screen and (max-width: 767px) {
    .navbar {
        padding: 0;
    }

    .navbar_container {
        display: block;
        width: 100%;
        padding: 0;
    }

    .navbar_logo {
        display: flex;
        justify-content: space-between;
        padding: 14px;
    }

    .navbar_toggle {
        display: block;
    }

    .navbar_menu {
        width: 100%;
        background: #0c164f;
        margin: auto;
        box-shadow: 0px 2px 4px 0px #00000050;
    }

    .navbar_ul {
        display: none;
    }

    .navbar_ul_mobile {
        display: block;

    }

    li {
        display: flex;
        justify-content: center;
        height: 60px;
        padding-top: 16px;
    }

}
</style><style>
div .ant-dropdown {
    top: 60px !important;
    position: fixed;
}

.anticon {
    color: white;
}
</style>
