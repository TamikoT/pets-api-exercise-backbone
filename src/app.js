import $ from 'jquery';
import _ from 'underscore';

import PetList from 'app/collections/pet_list';
import PetListView from 'app/views/pet_list_view';

var petCardTemplate;
var petInfoTemplate;

petCardTemplate = _.template($("#pet-card-template").html());
petInfoTemplate = _.template($("#pet-info-template").html());

$(document).ready(function() {
  var petList = new PetList();
  petList.fetch();

  var options = {
    el: $('#application'),
    model: petList,
    template: petCardTemplate,
    petInfoTemplate: petInfoTemplate,
  };

  var application = new PetListView(options);
  application.render();
});
