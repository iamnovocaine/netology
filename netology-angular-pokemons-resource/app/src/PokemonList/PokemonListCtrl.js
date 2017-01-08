'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService, BerryService) {

    $scope.pokemons = PokemonsService.query();
	$scope.berries = BerryService.query();
});
