import $ from 'jquery';
import Backbone from 'backbone';
import PetView from './pet_view';

var PetListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.infoTemplate = params.infoTemplate;
    this.petListElement = this.$('#pet-list');
    this.petViews = [];

    this.model.forEach(function(rawPet) {
      this.addPet(rawPet);
    }, this); // bind `this` so it's available inside forEach

    this.listenTo(this.model, 'add', this.addPet);
    this.listenTo(this.model, 'update', this.render);
  },

  render: function() {
    this.petListElement.empty();
    console.log(">>> from petList render");

    this.petViews.forEach(function(card) {
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
      infoTemplate: this.infoTemplate,
    });

    console.log(petCard);
    this.petViews.push(petCard);
  },
});

export default PetListView;
