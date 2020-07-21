<template>
<div>
    <div class="save" v-if="authenticatedUser.uid == uid" v-show="showData">
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
                        <a-button class="save_btn" @click="click(i.money,authenticatedUser.uid)" :style="`background: ${i.status};`">{{i.money}}</a-button>
                    </div>
                </a-col>
            </a-row>
            <div class="save_box_btn_del">
                <a-button class="save_btn_del" @click="del(authenticatedUser.uid)">Break my piggy !!</a-button>
            </div>

        </div>
    </div>
    <div v-if="authenticatedUser.uid == uid" v-show="NoshowData" style="height: 960px;margin-top:60px;padding:60px;">
        <p class="save_topic">Piggy Bank</p>
        <img src="~/assets/img/piggy.png" alt="" class="save_piggy">
        <button class="save_btn_create save_btn_create_color" @click="add(authenticatedUser.uid)">Create my piggy</button>
    </div>
    <div v-show="show404" style="height: 960px;margin-top:60px;padding:60px;" class="save404">
        <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
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
    layout: 'main2',
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
            show404: false
        }
    },
    methods: {
        async create() {
            await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.authenticatedUser = user
                    this.profile.push(this.authenticatedUser)
                    var docRef = db.collection("Piggy").doc(this.authenticatedUser.uid);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            this.userData = doc.data()
                        } else {
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
                if (this.authenticatedUser.uid != this.uid) {
                    this.show404 = true
                }
            })
        },
        click(i, auth) {
            if (this.userData.moneyData[i - 1].status == "#0c164f") {
                if (confirm(`คุณต้องการเก็บเงินจำนวน ${i} บาท ใช่หรือไม่ ??`)) {
                    this.userData.moneyData[i - 1].status = "grey"
                    this.userData.money = this.userData.money + this.userData.moneyData[i - 1].money
                    db.collection("Piggy").doc(auth).set({
                            name: this.profile[0].displayName,
                            email: this.profile[0].email,
                            photo: this.profile[0].photoURL,
                            moneyData: this.userData.moneyData,
                            money: this.userData.money,
                        })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                } else {
                    console.log("Nothing...")
                }
            } else if (this.userData.moneyData[i - 1].status == "grey") {
                if (confirm(`คุณต้องการลดจำนวนการเก็บเงิน ${i} บาท ใช่หรือไม่ ??`)) {
                    this.userData.moneyData[i - 1].status = "#0c164f"
                    this.userData.money = this.userData.money - this.userData.moneyData[i - 1].money
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
                } else {
                    console.log("Nothing...")
                }
            }
        },
        add(auth) {
            var i
            for (i = 1; i <= 120; i++) {
                this.moneyData.push({
                    money: i,
                    status: "#0c164f"
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
        },
        del(auth) {
            this.$confirm({
                title: 'คุณต้องการลบกระปุกใช่หรือไม่ ?',
                content: 'ไม่นะ!!...น้องกระปุกจะถูกทำลาย!!',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    console.log('OK');
                    db.collection("Piggy").doc(auth).delete().then(() => {
                        console.log("Document successfully deleted!");
                        location.reload()
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                },
                onCancel() {
                    console.log('Cancel');
                },
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
    border-radius: 12px;
    border: none;
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

.save_box_btn_del {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
}

.save_btn_del {
    width: 150px;
    height: 30px;
    background: red;
    color: white;
    font-size: 16px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 4px 15px 0 #000000;
}

.save_btn_del:hover {
    background: rgb(200, 0, 0);
}

.save_btn_create {
    width: 200px;
    height: 50px;
    border-radius: 12px;
    border: none;
    background: white;
    color: white;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
    display: block;
    margin: auto;
    background-size: 300% 100%;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.save_btn_create_color {
    background-image: linear-gradient(to right, #ba1e68, #13237e, #101d64, #0c164f);
    box-shadow: 0 4px 15px 0 #000000;
}

.save_btn_create:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.save404_btn {
    width: 100px;
}

@media screen and (max-width: 1599px) {
    .save {
        width: 80%;
    }
}

@media screen and (max-width: 767px) {
    .save {
        width: 90%;
    }

    .save_piggy {
        width: 100%;
        height: auto;
    }

    .save_box_name {
        display: block;
        padding: 0;
    }

    .save_name {
        margin: 8px auto;
    }
}

@media screen and (max-width: 375px) {
    .save {
        width: 100%;
    }

    .save_box_name {
        padding: 0 16px;
    }

    .save_name {
        font-size: 16px;
    }

    .save_card {
        padding: 20px 0px;
    }
}
</style><style>
.save404 .ant-result-title,
.save404 .ant-result-subtitle {
    color: white;
}
</style>
