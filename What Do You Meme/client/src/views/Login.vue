<template>
  <form class="container" @submit.prevent="login">
      {{error}} <!--display an error if there is one-->
      <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" v-model="email">
            <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" v-model="password">
            <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
            </span>
        </p>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-success">
                Login
                </button>
            </p>
             <button class="button is-primary" @click.prevent="google_login" >
                Login with Google
            </button>
            <br/><br/>
            <button class="button is-primary" @click.prevent="facebook_login" >
                Login with Facebook
            </button>
        </div>

        <img :src="profile_picture" v-if="profile_picture"/>
  </form>
</template>

<script>
    import {Login} from '../models/Users';
    const GOOGLE_CLIENT_ID = "70386515531-12spist145bonkfuegrhce7h3433mkbo.apps.googleusercontent.com";
    const FACEBOOK_CLIENT_ID = "194204998202015";
    let auth2 = null;

    export default { //vue object
        data(){
            return {
                email: '',
                password: '',
                error: '',
                profile_picture: null
            }
        },
        created(){
            const googleScriptTag = document.createElement('script') //calling web browser document object to create element called 'script'
            googleScriptTag.setAttribute('src', 'https://apis.google.com/js/api:client.js') //add a source with url; loader
            document.head.appendChild(googleScriptTag) //add tag to head

            googleScriptTag.onload = () => { //when script is finished loading, run function below
                // the global gapi variable is created by loading that script (on line 51)
                gapi.load('auth2', () => {
                    auth2 = gapi.auth2.init({ //new property of this global variable gets added
                        client_id: GOOGLE_CLIENT_ID,
                        cookiepolicy: 'single_host_origin', //allow Google to look and see who's already logged in (using cookies)
                        scope: 'profile email' //parts of Google we want to access
                    })
                })
            }
            //similar to onload except it's global fxn that gets called by the global script
            window.fbAsyncInit = function() { 
                FB.init({
                    appId      : FACEBOOK_CLIENT_ID,
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v3.0'
                });
                
                //FB.AppEvents.logPageView();   
                /*
                FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                });*/
            };
            //same as first 3 lines of Google code above
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js"; //creates global variable when loaded
                fjs.parentNode.insertBefore(js, fjs); //same as document.head.appendChild
            }(document, 'script', 'facebook-jssdk')); 
        },
        methods:{
            async login(){
                try {
                    //call await so rest of function doesn't get run until login throws error or returns
                    await Login(this.email, this.password); 
                    this.$router.push('/game');
                } catch (error) {
                    this.error = error;
                }
            },
            google_login(){ //when someone clicks login button
                auth2.signIn() //pop-up a window allowed to be opened in response to a click
                .then(googleUser =>{
                    console.log(googleUser);
                    
                    const profile = googleUser.getBasicProfile(); //pt object
                    console.log("ID: " + profile.getId()); // Don't send this directly to your server! Same as MU
                    console.log('Full Name: ' + profile.getName()); //Same as Ad
                    console.log('Given Name: ' + profile.getGivenName()); //Same as pW
                    console.log('Family Name: ' + profile.getFamilyName()); //Same as qU
                    console.log("Image URL: " + profile.getImageUrl());
                    console.log("Email: " + profile.getEmail());

                    this.profile_picture = profile.getImageUrl();
                } )
                .catch(error => this.error = error)
            },
            facebook_login(){
                FB.login(response => {
                        console.log(response);
                        //if login successful
                        FB.api('/me?fields=email,name,picture', function(response) { //FB.api is like myFetch function where don't have to pass whole URL just end of it
                            console.log(response);
                            this.profile_picture = response.picture.data.url;
                        });
                    }, 
                    {scope: 'email'}
                );
            }
        }
    }
</script>

<style>
</style> 