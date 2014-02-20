Jugadores = new Meteor.Collection("jugadores");

if (Meteor.isClient) {

    Template.listaJugadores.jugadores = function () {
      return Jugadores.find();
    };

    // Eventos para el form de crear un jugador
    Template.nuevoJugador.events({
      'click button': function(e, t) {
          agregarJugador(t);
      },

      'keypress input': function(e,t){
        if (e.keyCode === 13) {
          agregarJugador(t);
        }
      }
    });

    // Agregar un nuevo jugador a la DB
    function agregarJugador(t){
      var nombreNuevoJugador = t.find('input');
      Jugadores.insert({ nombre: nombreNuevoJugador.value, equipo: 0 });
      $('.input-jugador').val('');
    }

    // Desactivar Sin Equipo active class
    Template.jugador.sinequipo = function (e, t){
      return this.equipo == 0 ? 'active' : '';
    }
    // Active class Equipo 1 al iniciar
    Template.jugador.equipo1_activo = function (e, t){
      return this.equipo == 1 ? 'active' : '';
    }
    // Active class Equipo 2 al iniciar
    Template.jugador.equipo2_activo = function (e, t){
      return this.equipo == 2 ? 'active' : '';
    }

    // Eventos para cada jugador
    Template.jugador.events({
      'click .remove' : function (e, t){
        console.log(t);
        Jugadores.remove(t.data._id);
      },
      
      'click .sin-equipo' : function (e, t){
        t.find('.sin-equipo').className = 'btn btn-primary sin-equipo active';
        Jugadores.update(t.data._id, { $set: {equipo: 0} });
      },

      'click .equipo1' : function (e, t){
        $(this).find('.equipo1').toggleClass('active');
        Jugadores.update(t.data._id, { $set: {equipo: 1} });
      },

      'click .equipo2' : function (e, t){
        $(this).find('.equipo2').toggleClass('active');
        Jugadores.update(t.data._id, { $set: {equipo: 2} });
      },
    });

    // Jugadores en el equipo 1
    Template.equipo1.jugadores = function(){
      return Jugadores.find({ equipo: 1});
    }

    // Jugadores en el equipo 2
    Template.equipo2.jugadores = function(){
      return Jugadores.find({ equipo: 2});
    }

    // Cantidad de jugadores
    Template.titulo.cantidad_jugadores = function(){
      return Jugadores.find({}).count();
    }
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
