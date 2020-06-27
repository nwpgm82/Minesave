<template>
<div>
    <div class="save" v-if="authenticatedUser.uid == uid" v-show="showData">
        <!-- {{userData[0].moneyData}} -->
        <p class="save_topic">Piggy Bank</p>
        <img src="~/assets/img/piggy.png" alt="" class="save_piggy">
        <div class="save_box_name">
            <p class="save_name">Name : {{profile[0].displayName}}</p>
            <p class="save_name">Total : {{userData.money}} Baht</p>
        </div>
        <div style="margin-top:40px">
            <a-row class="save_card">
                <a-col :xs="6" :sm="6" :md="4" :lg="2" :xl="2" :xxl="2" v-for="(i,index) in userData.moneyData" :key="index">
                    <div class="save_box_btn">
                        <button :id="`save_btn${i}`" class="save_btn" @click="click(i.money,authenticatedUser.uid)" :disabled="i.status">{{i.money}}</button>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
    <div v-if="authenticatedUser.uid == uid" v-show="NoshowData" style="height: 960px;margin-top:60px;padding:60px;">
        <p class="save_topic">Piggy Bank</p>
        <img src="~/assets/img/piggy.png" alt="" class="save_piggy">
        <button class="save_btn_create" @click="add(authenticatedUser.uid)">Create</button>
    </div>
    <div v-show="show404" style="height: 960px;margin-top:60px;padding:60px;" class="save404"> 
        <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist." >
            <template #extra>
                <a href="/">
                    <a-button type="primary" class="save404_btn">
                        Back Home
                    </a-button>
                </a>
            </template>
        </a-result>
    </div>
    <!-- <p style="color:white">{{uid}}</p> -->

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
            uid: this.$route.params.piggy,
            authenticatedUser: {},
            profile: [],
            moneyData: [],
            userData: {},
            total: 0,
            showData: true,
            NoshowData: false,
            show404 : false
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
                    // location.replace(`/piggy/${this.authenticatedUser.uid}`)
                } else {
                    console.log('Not signIn')
                    location.replace('/')
                }
                if (this.authenticatedUser.uid != this.uid) {
                    this.show404 = true
                }
            })
            // if (await this.authenticatedUser.uid != this.uid) {
            //     location.replace(`/piggy/${this.authenticatedUser.uid}`)
            // }
        },
        click(i, auth) {
            this.userData.moneyData[i - 1].status = true
            this.userData.money = this.userData.money + this.userData.moneyData[i - 1].money
            if (confirm(`คุณต้องการเก็บเงินจำนวน ${i} บาท ใช่หรือไม่ ??`)) {
                db.collection("Piggy").doc(auth).set({
                    name: this.profile[0].displayName,
                    email: this.profile[0].email,
                    moneyData: this.userData.moneyData,
                    money: this.userData.money
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }else{
                console.log("Nothing...")
            }
            
        },
        add(auth) {
            var i
            for (i = 1; i <= 120; i++) {
                this.moneyData.push({
                    money: i,
                    status: false
                })
            }
            console.log(this.moneyData)
            db.collection("Piggy").doc(auth).set({
                    name: this.profile[0].displayName,
                    email: this.profile[0].email,
                    moneyData: this.moneyData,
                    money: 0
                })
                .then(() => {
                    console.log("Document successfully written!");
                    location.reload()
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
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

.save {
    width: 60%;
    margin: auto;
    padding: 60px 0;
}

.save_topic {
    margin-top: 60px;
    font-size: 30px;
    font-weight: 500;
    color: white;
    text-align: center;
}

.save_piggy {
    width: 300px;
    height: 300px;
    display: block;
    margin: 40px auto;
}

.save_box_name {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
}

.save_name {
    font-size: 18px;
    font-weight: 500;
    color: white;
}

.save_card {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 8px;
    padding: 20px;
    /* display: flex; */
}

.save_box_btn {
    width: 80px;
    height: 50px;
    padding: 10px;
    margin: auto;
}

.save_btn {
    width: 60px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: #0c164f;
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
}

.save_btn:hover {
    background: #060a25;
}

.save_btn:disabled {
    background: rgb(196, 196, 196);
}

.save_btn_create {
    width: 120px;
    height: 50px;
    border-radius: 8px;
    border: none;
    background: white;
    color: #0c164f;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
    display: block;
    margin: auto;
}

.save_btn_create:hover {
    background: rgb(185, 185, 185);
}

.save404_btn{
    width: 100px;
}

@media screen and (max-width: 1599px) {
    .save {
        width: 80%;
    }
}

@media screen and (max-width: 767px){
    .save{
        width: 90%;
    }
    .save_piggy{
        width: 100%;
    }

    .save_box_name{
        display: block;
        padding: 0;
    }

    .save_name{
        margin: 8px auto;
    }
}

@media screen and (max-width: 375px){
     .save{
        width: 100%;
    }

    .save_box_name{
        padding: 0 16px;
    }
    .save_name{
        font-size: 16px;
    }

    .save_card{
        padding: 20px 0px;
    }
}
</style>
<style>
.save404 .ant-result-title,.save404 .ant-result-subtitle{
    color: white;
}
</style>
