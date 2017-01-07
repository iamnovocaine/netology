angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {
			$http.defaults.headers.common["application-id"] = "7E35E972-0FF8-D666-FFCB-B4B37E688E00";
			$http.defaults.headers.common["secret-key"] = "29D3DA3F-116C-3DFE-FF21-C37CAA0DD800";
			
            return {

                getPokemons: function() {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10', {
						headers: {
                            "application-id": undefined,
                            "secret-key": undefined
                        }
					});
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId, {
						headers: {
                            "application-id": undefined,
                            "secret-key": undefined
                        }
					});
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/v1/data/pokemon',
                        data: pokemonData
                    });
                },

				editPokemon: function(pokemonId, pokemonData) {
                    return $http({
                        method: 'PUT',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                        data: pokemonData
                    });
                },
				
                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                    });
                }

            }

        }

    );
