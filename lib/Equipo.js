// Funciones relevantes a la coleccion Equipos
if (Meteor.isClient) {
	
	Template.equipo1_titulo.titulo = function() {
		return Equipos.findOne({equipo: 'equipo1'});
	}
	
	Template.equipo2_titulo.titulo = function() {
		return Equipos.findOne({equipo: 'equipo2'});
	}

	Template.equipo1_titulo.editar = function(){
		return Session.get("edit-equipo1");
	}

	Template.equipo2_titulo.editar = function(){
		return Session.get("edit-equipo2");
	}

	Template.equipo1_titulo.events({
		'click .tit': function(e, t){
			Session.set("edit-equipo1", true);
		},
		
		'keypress input': function(e,t){
	        if (e.keyCode === 13) {
	          actualizarEquipo(t, 'equipo1');
	        }
    	},
	});

	Template.equipo2_titulo.events({
		'click .tit': function(e, t){
			Session.set("edit-equipo2", true);
		},
		
		'keypress input': function(e,t){
	        if (e.keyCode === 13) {
	          actualizarEquipo(t, 'equipo2');
	        }
    	},
	});

	// COUNT jugadores por equipo
	Template.equipo1_titulo.count = function(){
	return Jugadores.find({ equipo: 1}).count();
	}
	Template.equipo2_titulo.count = function(){
	return Jugadores.find({ equipo: 2}).count();
	}

	actualizarEquipo = function(t, eq){
		var nombreEquipo = t.find('input').value;
	    if (!nombreEquipo) return alert('Dale boludo, pone algo!');
	    equipoid = Equipos.findOne({equipo: eq})._id;
	    Equipos.update(equipoid, { $set: {nombre_equipo: nombreEquipo} });
	 	Session.set('edit-'+eq, false);
	}
}
