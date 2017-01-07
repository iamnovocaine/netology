'use strict';

pokemonApp.controller('EditPokemonCtrl', function($scope, $routeParams, PokemonsService) {

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(response) {
        $scope.pokemonData = {
            name: response.data.name,
            weight: response.data.weight
        };
    });

    $scope.editPokemon = function(myPokemon) {

        $scope.editionSuccess = false;
        $scope.editionError = false;

        PokemonsService.editPokemon($routeParams['pokemonId'], myPokemon).then(function(response) {
            $scope.editionSuccess = true;
        }, function(error){
            $scope.editionError = true;
        });
    }

});
