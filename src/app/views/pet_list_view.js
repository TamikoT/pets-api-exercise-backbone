import $ from 'jquery';
import _ from 'underscore';

import Backbone from 'backbone';
import PetView from './pet_view';

var PetListView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
    this.petInfoTemplate = options.petInfoTemplate;
    this.petListElement = this.$('#pet-list');
    this.petArray = [];

    this.model.forEach(function(rawPet) {
      this.addPet(rawPet);
    }, this); // bind `this` so it's available inside forEach

    this.listenTo(this.model, 'add', this.addPet);
    this.listenTo(this.model, 'update', this.render);
  },

  render: function() {
    this.petListElement.empty();
    console.log("inside petList render");

    this.petArray.forEach(function(card) {
      console.log(card);
      card.render();
      this.petListElement.append(card.$el);
    }, this);
    return this;
  },

  addPet: function(pet) {
    var petCard = new PetView({
      model: pet,
      template: this.template,
      petInfoTemplate: this.petInfoTemplate,
    });
    // this.listenTo(petCard, 'edit', )
    console.log(petCard);
    this.petArray.push(petCard);
  },
});

export default PetListView;
