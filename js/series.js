(function($) {

    window.Serie = Backbone.Model.extend({
		defaults : {
			id : "",
			season : 1,
			episode : 1
		},
		initialize : function Serie() {
			// Nothing
		},
		increaseSeason : function() {
            this.set('season',this.get('season')+1);
			this.save();
        },
		decreaseSeason : function() {
            if (this.get('season') > 0) {
				this.set('season',this.get('season')-1);
				this.save();
			}
        },
		increaseEpisode : function() {
            this.set('episode',this.get('episode')+1);
			this.save();
        },
		decreaseEpisode : function() {
            if (this.get('episode') > 0) {
				this.set('episode',this.get('episode')-1);
				this.save();
			}
        }
	});
	
	window.Series = Backbone.Collection.extend({
		model : Serie,
		localStorage : new Store("series"),
		initialize : function() {
			// Nothing
		}
	});
	
	window.SeriesCollectionView = Backbone.View.extend({
        el : $('#series-collection-container'),
        initialize : function() {
            this.template = _.template($('#series-collection-template').html());
            _.bindAll(this, 'render');
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);

        },
		events: {
			"click #increaseSeason": "increaseSeason",
			"click #decreaseSeason": "decreaseSeason",
			"click #increaseEpisode": "increaseEpisode",
			"click #decreaseEpisode": "decreaseEpisode",
			"click #removeSerie": "removeSerie"
        },
		increaseSeason: function(ev){
			idSerie = $(ev.target).attr('href');
			this.collection.get(idSerie).increaseSeason();
			return false;
		},
		decreaseSeason: function(ev){
			idSerie = $(ev.target).attr('href');
			this.collection.get(idSerie).decreaseSeason();
			return false;
		},
		increaseEpisode: function(ev){
			idSerie = $(ev.target).attr('href');
			this.collection.get(idSerie).increaseEpisode();
			return false;
		},
		decreaseEpisode: function(ev){
			idSerie = $(ev.target).attr('href');
			this.collection.get(idSerie).decreaseEpisode();
			return false;
		},
		removeSerie: function(ev){
			idSerie = $(ev.target).attr('href');
			this.collection.get(idSerie).destroy();
			return false;
		},
        render : function() {
            var renderedContent = this.template({ series : this.collection.toJSON() });
            $(this.el).html(renderedContent);
            return this;
        }
    });
	
	window.SerieFormView = Backbone.View.extend({
		el : $('#serie-form-container'),
		initialize : function() {
			// Nothing
		},
		events : {
			"submit form" : 'addSerie'
		},
		addSerie : function(e) {
			e.preventDefault();
			idSerie = this.$('#id').val();
			if (idSerie != "") {
				this.collection.create({
					id : idSerie,
					season : 1,
					episode : 1
				});
			} else {
				alert('Le nom est vide !');
			}
			this.$('input[type="text"]').val('');
		}
	});
	
	series = new Series();
	series.fetch();
	serieFormView = new SerieFormView({ collection : series });
	seriesView = new SeriesCollectionView({ collection : series });
    seriesView.render();

})(Zepto);