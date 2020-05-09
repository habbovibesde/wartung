/*!
 * HabboVibes.de - Wartungsmodus
 * 
 * @author   Gummiauge (Habbo.de)
 * @version  1.0.0
 */

$(function () {
    addInterval(() => {
        $('#radiostatus').html('Wird geladen...');

        $.getJSON('api.json', function (response) {
            var song = response.songtitle.split(' - ');

            $('#radiostatus').html(`
                <div class="title">${marquee(response.programm, 18)}</div>
                <div class="subtitle">mit DJ ${response.deejay}</div>
                <div class="title">${song[0] ? marquee(song[0], 21) : ''}</div>
                <div class="subtitle">${song[1] ? marquee(song[1], 20) : ''}</div>
            `);

            $('#habbo').css('background-image', `url('https://www.habbo.de/habbo-imaging/avatarimage?user=${response.deejay}&direction=4&head_direction=3&gesture=sml&size=l')`);
        });
    }, 60 * 1000);
});

/**
 * Interval setzen und Callback sofort ausführen
 * @param {Function} callback 
 * @param {int} timeout 
 */
function addInterval(callback, timeout) {
    callback(); // Run for first time
    setInterval(callback, timeout);
}

/**
 * Prüfen, ob Text lang genug ist für Marquee
 * @param {string} data 
 * @param {int} length 
 */
function marquee(data, length) {
    if (data.length >= length) {
        return `<marquee scrollamount="6" onmouseover="this.stop();" onmouseout="this.start();">${data}</marquee>`;
    }

    return data;
}