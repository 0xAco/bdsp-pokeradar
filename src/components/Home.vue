<script setup lang="ts">
import { ref } from 'vue'
import usePokemonStore from '@/stores/pokemon';

const pokemonStore = usePokemonStore();

defineProps<{
  msg: string
}>();
</script>

<template>
  <h2 class="h2">{{ msg }}</h2>
  <form class="form" @submit.prevent>
    <h3 class="h3">Valeurs de simulation</h3>
    <div class="form-group">
      <label for="pokemon_rate" class="label">taux d'apparition du pokémon</label>
      <input id="pokemon_rate" class="input text short" type="number" min="0" max="100" v-model="pokemonStore.pokemonRate" />
      <span class="text">%</span>
    </div>
    <div class="form-group">
      <label for="sample_size" class="label">taille de l'échantillon</label>
      <input id="sample_size" class="input text long" type="number" min="100" max="10000" v-model="pokemonStore.sampleSize" />
    </div>
    <button type="submit" class="primary-button">Lancer la simulation</button>
  </form>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Cantarell');

.h2 {
  color: #524232;
  text-align: center;
  margin: 50px 0;
}
.h3 {
  color: #524232;
  margin: 30px 0;
}
.form {
  padding: 5px 40px 20px 40px;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: linen;
  box-shadow: 5px 5px 0 0 rgb(149, 127, 105, .2);
}
.form-group {
  margin-bottom: 20px;
}
.primary-button {
  margin-top: 10px;
  width: 150px;
  height: 40px;
  font-family: 'Cantarell';
  color: linen;
  border: solid #524232 2px;
  background: linear-gradient(120deg, #957f69 -50%, #524232 100%);
  font-size: .9em;
  font-weight: bold;
  border-radius: 5px;
}
.primary-button:hover {
  color: #524232;
  background-color: linen;
  background: linen;
  cursor: pointer;
}
.label {
  display: block;
  margin: 5px;
  color: #524232;
}
.text {
  color: #524232;
  font-family: 'Cantarell';
}
.input {
  padding: 5px;
  border-radius: 5px 5px 0 0;
  background-color: rgba(120,120,120, .1);
  margin-right: 5px;
  outline: none;
  border: none;
  border-bottom: solid #9C8D76 2px;
  font-weight: bold;
  text-align: right;
}
.input::-webkit-inner-spin-button,
.input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.short {
  width: 40px;
}
.long{
  width: 50px;
}
</style>
