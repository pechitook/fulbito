if (Meteor.isClient) {
  shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  randomEquipos = function () {
    var jugadores = Jugadores.find().fetch();
    shuffle(jugadores);
    for (var i = 0; i <= 6; i++) {
      console.log(Jugadores.update( jugadores[i]._id, { $set: {equipo: 1} }));
    };
    for (var i = 6; i <= jugadores.length; i++) {
      console.log(Jugadores.update( jugadores[i]._id, { $set: {equipo: 2} }));
    };
  }

  // Sortear los equipos  
  Template.sortear.events({
    'click .rnd': function(e, t){
        randomEquipos();
    }
  });

  somos_12 = function(){
    return Jugadores.find().count() == 12 ? true : false;
  }

  Template.sortear.somos_12 = function(){
    return somos_12();
  };

  // COUNT jugadores total
    Template.titulo.cantidad_jugadores = function(){
      return Jugadores.find({}).count();
    }

  // *** STYLING CSS CLASSES ***
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

}