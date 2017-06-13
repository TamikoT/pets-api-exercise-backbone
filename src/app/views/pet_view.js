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

  events: {
    'click .pet-name': 'showDetails',
  },

  showDetails: function(event) {
    event.stopPropagation();
    var self = this;
    console.log(">>> single contact clicked");

    var compiledInfoTemplate = self.infoTemplate({pet: self.model.toJSON()});
    $('#pet').html(compiledInfoTemplate);
    $('#pet').show();

    $('.btn-delete').on('click', function(event) {
      self.deletePet(event);
    });

    return self;
  },

  deletePet: function(event) {
    event.preventDefault();
    console.log(">>> inside pet_view.deletePet");
    if (window.confirm("Are you sure you're taking this pet away?")) {
      console.log("ok will delete it!");
      this.model.fetch();
      this.model.destroy();
    }
  },
});

export default PetView;
