import $ from 'jquery';
import _ from 'underscore';

import Backbone from 'backbone';
import Pet from '../models/pet';


var PetView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.petInfoTemplate = params.petInfoTemplate;

    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    // console.log(this.model.attributes);
    var html = this.template({pet: this.model.toJSON()});
    this.$el.html(html);

    this.delegateEvents();

    return this;
  },
});

export default PetView;
