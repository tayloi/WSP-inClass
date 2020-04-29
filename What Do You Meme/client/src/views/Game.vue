<!--
  GAME VUE
-->
<template>
  <div class="container">
    <h1 class="title is-5">
        Game Page
    </h1>
    
    <!--Players and current picture-->
    <div class="columns"> <!--acting as margin outside panel-->
      <div class="column is-one-third">
        <div class=""> 
          <ul class="panel">
            <li class="panel-heading">Players</li>
            <li v-for="player in Game.State.Players" :key="player.Name" class="panel-block">
              <span class="panel-icon"> <!--aligns icons vertically-->
                <i class="fas fa-user-graduate" aria-hidden="true"></i> <!--font awesome-->
              </span>
              <span class="flex-name">
                {{player.Name}} 
              </span>
              <span class="tag is-rounded">{{player.Score}}</span>
            </li>
          </ul>
        </div>
      </div>
      <img :src="Game.State.CurrentPicture"  class="card column"/>
    </div>
    
    <!--My cards and cards in play-->
    <div class="columns">
          <div class="column is-one-third">
            <div class="">
              <ul class="panel">
                <li class="panel-heading">My Cards</li>
                <li v-for="card in Game.MyCards" :key="card" class="panel-block"> <!--stored at client side-->
                  {{card}} 
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <div class="">
              <ul class="panel">
                <li class="panel-heading">Cards in Play</li>
                <li v-for="card in Game.State.CardsInPlay" :key="card.Text" class="panel-block"> <!--what's updated from server is inside State-->
                  {{card.Text}}, {{card.PlayerId}}, {{card.IsChosen}} <!--what gets displayed-->
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import Game from "../models/Game"; 

  export default {
    name: 'Home',
    created(){
      Game.Init();
      Game.Start();
    },
    destroyed(){
      Game.Pause();
    },
    data: () => ({
      Game
    })
  }
</script>

<style>
  img.card-image{
    width: 100%
  }
  .flex-name {
    flex-grow: 1; /*moves score icon to right*/
  }
</style>