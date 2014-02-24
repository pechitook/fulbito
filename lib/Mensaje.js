if (Meteor.isClient) {
	Template.chat.mensajes = function(){
		return Mensajes.find();
	}

	Template.chat.events({
		'keypress .nuevoMensaje': function(e, t){
			if (e.keyCode === 13) {
	          nuevoMensaje(t);
	        }
		}
	});

	Template.chat.rendered = function(){
		// Muestro los ultimos mensajes
		el = this.find('.mensajes');
		el.scrollTop = el.scrollHeight;
	}

	function nuevoMensaje(t) {
		fecha = new Date();
		minutos = (fecha.getMinutes()<10?'0':'') + fecha.getMinutes().toString();
		hora = fecha.getHours().toString() + ':' + minutos;
		mensaje = t.find('.nuevoMensaje').value;
		usuario = t.find('.chat_nombre').value;
		Mensajes.insert({usuario: usuario, mensaje: mensaje, hora: hora});
		mensaje = t.find('.nuevoMensaje').value = '';
	}
}