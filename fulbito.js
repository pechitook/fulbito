if (Meteor.isClient) {

    // Envio todos los jugadores al template de lista
    Template.listaJugadores.jugadores = function () {
      return Jugadores.find();
    };

    // Eventos para el form de crear un jugador
    Template.nuevoJugador.events({
      // Click en el boton +
      'click button': function(e, t) {
          agregarJugador(t); // Jugador.js
      },

      // Apretar Enter
      'keypress input': function(e,t){
        if (e.keyCode === 13) {
          agregarJugador(t); // Jugador.js
        }
      }
    });

    // Eventos para cada jugador
    Template.jugador.events({ 
      'click .remove' : function (e, t){
        console.log(t);
        Jugadores.remove(t.data._id);
      },
      
      'click .sin-equipo' : function (e, t){
        $(this).find('.sin-equipo').toggleClass('active');
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Equipos.find().count() != 2) {
      Equipos.remove({});
      Equipos.insert({equipo: 'equipo1', nombre_equipo: 'Con remera'});
      Equipos.insert({equipo: 'equipo2', nombre_equipo: 'Sin remera'});
    }
  });
}