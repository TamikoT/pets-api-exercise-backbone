import $ from 'jquery';
import Backbone from 'backbone';
import PetView from './pet_view';

var PetListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.infoTemplate = params.infoTemplate;
    this.petListElement = this.$('#pet-list');
    this.petViews = [];

    this.model.forEach(function(petData) {
      this.addPet(petData);
    }, this); // bind `this` so it's available inside forEach

    this.listenTo(this.model, 'add', this.addPet);
    this.listenTo(this.model, 'update', this.render);

    this.input = {
      name: this.$('.add-pet-form input[name="name"]'),
      age: this.$('.add-pet-form input[name="age"]'),
      breed: this.$('.add-pet-form input[name="breed"]'),
    };
  },

  render: function() {
    this.petListElement.empty();
    console.log(">>> from petList render");

    this.petViews.forEach(function(card) {
      card.render();
      this.petListElement.append(card.$el);
    }, this);

    return this;
  },

  events: {
    'click .btn-add': 'createPet',
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

  createPet: function(event) {
    event.preventDefault();
    var userPet = {
      name: this.input.name.val(),
      age: this.input.age.val(),
      breed: this.input.breed.val(),
    };

    // add a pet to the collection
    this.model.add(userPet);
    this.model.create(userPet);
    console.log("pet added!");

    // clear the input form
    this.input.name.val('');
    this.input.age.val('');
    this.input.breed.val('');
  }
});

export default PetListView;
