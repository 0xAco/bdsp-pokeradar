import { defineStore } from 'pinia';

interface State {
  // constants
  chainBreakingRate: number;
  chainShinyRates: number[];
  chainMaxValue: number;

  // parameters
  pokemonRate: number;
  sampleSize: number;
  punishTime: number;

  // results
  timeResultsJSON: {chainLength: number, avgTime: number}[];
}

export default defineStore('pokemon', {
  state: (): State => ({
    chainBreakingRate: 0.07,
    chainShinyRates: [4096, 3855, 3640, 3449, 3277, 3121, 2979, 2849, 2731, 2621, 2521, 2427, 2341, 2259, 2185, 2114, 2048, 1986, 1927, 1872, 1820, 1771, 1724, 1680, 1638, 1598, 1560, 1524, 1489, 1456, 1310, 1285, 1260, 1236, 1213, 1192, 993, 799, 400, 200, 99],
    chainMaxValue: 40,
    punishTime: 100,
    pokemonRate: 50,
    sampleSize: 1000,

    timeResultsJSON: [],
  }),

  actions: {
    /** 
     * simulates multiples rolls for a specified rate
     * @param roll the number of rolls to simulate
     * @param odds the odd of rolling a success (as in 1/odds)
     * @returns true if there is at least 1 success
     */
    simulateShiny(roll: number, odds: number): boolean {
      const rolls = [];
      for (let i = 0; i < roll; i++) {
        rolls.push( Math.floor(Math.random() * odds) );
      }
      return rolls.includes(1);
    },

    /**
     * simulates a pokemon encounter from its rate
     * @param pokemonRate the rate of the pokemon (ex: 0.1 for 10%)
     * @returns true if the target is found
     */
    simulatePokemonEncounter(pokemonRate: number): boolean {
      return Math.random() <= pokemonRate;
    },

    /**
     * simulates whether the chain continues or not
     * @returns true if the chain continues
     */
    chainContinues(): boolean {
      return Math.random() < (1 - this.chainBreakingRate);
    },

    runSimulation(): void {
      let foundRightPokemon: boolean ;
      let foundShiny: boolean;
      let currentChainLength: number;
      let localTime: number;

      // for each chain length from 1 to chainMaxValue (included)
      for (let localChain = 1; localChain <= this.chainMaxValue; localChain++) {
        console.log('chains for ', localChain);
        localTime = 0;
          
        /* find a number of shinies equal to sampleSize
            where we stop the chain at a length of localChain */
        for (let i = 0; i < this.sampleSize; i++) {
          currentChainLength = 0;
          foundShiny = false;

          // grind the chain until we reach localChain or find a shiny
          while (currentChainLength < localChain && !foundShiny) {
            
            // find the right pokemon to start (or restart) the chain
            if (currentChainLength === 0) {
              foundRightPokemon = this.simulatePokemonEncounter(this.pokemonRate);
              while (!foundRightPokemon) {
                foundRightPokemon = this.simulatePokemonEncounter(this.pokemonRate);
                localTime += 50;
              }
            }

            // possiblity that a grass shines before reaching the target chain length
            foundShiny = this.simulateShiny(4, this.chainShinyRates[localChain]);

            if (!foundShiny) {
              // possibility that a shiny appears in a non-sparkly grass
              foundShiny = this.simulateShiny(1, this.chainShinyRates[0]);
              if (this.chainContinues()) {
                currentChainLength ++;
                localTime += 50;
              } else {
                localTime += this.punishTime;
                currentChainLength = 0;
                foundRightPokemon = false;
              }
            }
          }

          // once the chain is maxed, we reset the radar until a grass shines
          while (!foundShiny) {
            localTime += 15;
            foundShiny = this.simulateShiny(4, this.chainShinyRates[currentChainLength]);
          }
        }

        // all shinies for this chain length found, write in the result
        this.timeResultsJSON.push({chainLength: localChain, avgTime: localTime / this.sampleSize});
        console.log('done for chain length of ', localChain);
      }

      console.log('done!');
    }
  }
});