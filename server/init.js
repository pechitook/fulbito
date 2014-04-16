Meteor.startup(function() {
    if (Equipos.find().count() != 2) {
        Equipos.remove({});
        Equipos.insert({
            equipo: 'equipo1',
            nombre_equipo: 'Equipo 1'
        });
        Equipos.insert({
            equipo: 'equipo2',
            nombre_equipo: 'Equipo 2'
        });
    }
});