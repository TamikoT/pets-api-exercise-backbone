import $ from 'jquery';
import Backbone from 'backbone';

var PetView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.infoTemplate = params.infoTemplate;
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var html = this.template({pet: this.model.toJSON()});
    this.$el.html(html);
    this.delegateEvents();
    return this;
  },

  showDetails: function(event) {
    event.stopPropagation();
    console.log(">>> single contact clicked");

    var compiledInfoTemplate = this.infoTemplate({pet: this.model.toJSON()});
    $('#pet').html(compiledInfoTemplate);
    $('#pet').show();
    return this;
  },

  events: {
    'click .pet-name': 'showDetails',
  }
});

export default PetView;
