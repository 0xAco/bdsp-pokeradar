<script setup lang="ts">
import Card from '@/components/Card.vue';
import usePokemonStore from '../stores/pokemon';

const pokemonStore = usePokemonStore();

defineProps<{
  msg: string
}>();
</script>

<template>
  <h2>{{ msg }}</h2>
  <Card title="Valeurs de simulation">
    <template v-slot:content>
      <form id="simulationValues" class="form" @submit.prevent>
        <div class="form-group">
          <div class="col-label">
            <input id="pokemon_rate" class="input text short" type="number" min="0" max="100" v-model="pokemonStore.pokemonRate"/><span class="text">%</span>
          </div>
            <label for="pokemon_rate" class="label">taux d'apparition du pokémon</label>
        </div>
        <div class="form-group">
          <div class="col-label">
            <input id="sample_size" class="input text long" type="number" min="100" max="10000" v-model="pokemonStore.sampleSize"/>
          </div>
          <label for="sample_size" class="label">taille de l'échantillon</label>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button slot="footer" type="submit" form="simulationValues" class="primary-button">Lancer la simulation</button>
    </template>
  </Card>
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
.form-group {
  margin-bottom: 20px;
}
.col-label {
  display: inline-block;
  text-align: right;
  margin-right: 10px;
  width: 70px;
}
.primary-button {
  margin-top: 10px;
  width: 150px;
  height: 40px;
  font-family: 'Cantarell';
  color: linen;
  border: solid #524232 2px;
  background: linear-gradient(315deg, #957f69 -50%, #524232 80%);
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
