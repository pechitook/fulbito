// Funciones relevantes a la coleccion Jugadores

agregarJugador = function(t) {
	var nombreNuevoJugador = t.find('input');
      if (!nombreNuevoJugador.value) return alert('Dale boludo, pone algo!');
      if (Jugadores.find({}).count() == 12) return alert ('YA SOMOS 12!');
      Jugadores.insert({ nombre: nombreNuevoJugador.value, equipo: 0, numero: Math.floor(Math.random() * 35) + 1 });
      $('.input-jugador').val('');
}