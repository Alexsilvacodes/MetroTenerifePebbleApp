//////////////////////////////////
// Created by Alex Silva - 2016 //
// Lincesed under MIT           //
//////////////////////////////////

// TO-DO
// =====
// * Empty unnecessary variables
// * Color interface
// * Loading animation

// Constants
const TYPE_NONE = -1;
const TYPE_MENU = 0;
const TYPE_WINDOW = 1;

var UI = require('ui');
var Vector2 = require('vector2');
var Feature = require('platform/feature');
var Settings = require('settings');

var method = 'GET';
var url = 'http://tranviaonline.metrotenerife.com/#paneles';

var current_position = {};

// Create the request
var request = new XMLHttpRequest();

// Global arrays
var stops_json = [];
var panels_json = [];
var lines_json = [];
var data_lines = [];

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i].id === obj) {
           return true;
       }
    }
    return false;
}

function createUI() {
    // Lines Menu
    var lines_menu = new UI.Menu({
        status: {
            color: 'white',
            backgroundColor: Feature.color('cobalt-blue', 'black'),
            separator: 'none'
        },
        backgroundColor: Feature.color('oxford-blue', 'white'),
        textColor: Feature.color('white', 'black'),
        highlightBackgroundColor: Feature.color('red', 'black'),
        highlightTextColor: 'white',
        sections: [{
            title: 'Líneas:',
            items: createLinesArray()
        }]
    });

    // Callback when Lines Menu item get selected
    lines_menu.on('select', function(e) {
        current_position.line = e.itemIndex;
        var array_stops = createStopsArray(e.itemIndex);

        // Section array
        var array_sections = [];

        // If starred stop found, push starred section
        var starred_section = {};
        var starred_stop = Settings.data('starred_stop');
        if (starred_stop) {
            starred_section.title = 'Parada favorita:';
            starred_section.items = array_stops[starred_stop.index]

            array_sections.push(starred_section);
        }

        // Push stops
        array_sections.push({
            title: 'Paradas:',
            items: array_stops
        });

        // Stops Menu
        var stops_menu = new UI.Menu({
            status: {
                color: 'white',
                backgroundColor: Feature.color('cobalt-blue', 'black'),
                separator: 'none'
            },
            backgroundColor: Feature.color('oxford-blue', 'white'),
            textColor: Feature.color('white', 'black'),
            highlightBackgroundColor: Feature.color('red', 'black'),
            highlightTextColor: 'white',
            sections: array_sections
        });

        // Callback when Stops Menu item has long select (starred stop)
        stops_menu.on('longSelect', function(e) {
            var stop_sections = stops_menu.sections;
            console.log(stop_sections);
            if (starred_stop && e.sectionIndex == 0) {
                // Delete Starred
                Settings.data('starred_stop', null);
            } else {
                // Create Starred
                Settings.data(
                    'starred_stop',
                    {
                        index: e.itemIndex,
                        id: data_lines[current_position.line].stops[e.itemIndex].id
                    }
                );
            }
        });

        // Callback when Stops Menu item get selected
        stops_menu.on('select', function(e) {
            var starred_stop = Settings.data('starred_stop');
            if (starred_stop && e.sectionIndex == 0) {
                current_position.stop = starred_stop.index;
            } else {
                current_position.stop = e.itemIndex;
            }
            aux_panels = createPanelArray(current_position.stop);

            if (aux_panels.length == 0) {
                var wind = new UI.Window({
                    status: {
                        color: 'white',
                        backgroundColor: Feature.color('cobalt-blue', 'black'),
                        separator: 'none'
                    },
                    backgroundColor: Feature.color('oxford-blue', 'white')
                });

                var wind_size = wind.size();

                // Right circle
                var dot = new UI.Circle({
                    position: new Vector2(
                        Feature.round(wind_size.x + 3, wind_size.x + 5),
                        Feature.round(wind_size.y/2 - 20, wind_size.y/2 - 10)
                    ),
                    radius: 10,
                    backgroundColor: Feature.color('white', 'black')
                });

                var text = new UI.Text({
                    position: new Vector2(5, 40),
                    size: new Vector2(wind_size.x - 13, 70),
                    textAlign: 'center',
                    font: 'GOTHIC_18_BOLD',
                    textColor: Feature.color('white', 'black'),
                    backgroundColor:  Feature.color('oxford-blue', 'white'),
                    text: 'No hay información sobre esta parada ahora mismo'
                });

                wind.add(dot);

                wind.add(text);

                wind.on('longClick', 'select', function(e) {
                    // Update data
                    updateData(1, wind, TYPE_WINDOW);
                });

                wind.show();
            } else {
                var panel_menu = new UI.Menu({
                    status: {
                        color: 'white',
                        backgroundColor: Feature.color('cobalt-blue', 'black'),
                        separator: 'none'
                    },
                    backgroundColor: Feature.color('oxford-blue', 'white'),
                    textColor: Feature.color('white', 'black'),
                    highlightBackgroundColor: Feature.color('red', 'black'),
                    highlightTextColor: 'white',
                    sections: [{
                        title: Feature.round("Próximos tranvías", "Próximos tranvías:"),
                        items: aux_panels
                    }]
                });

                panel_menu.on('longSelect', function(e) {
                    panel_menu.item(0, 0, { title: "Actualizando...", subtitle: "" });

                    // Update data
                    updateData(1, panel_menu, TYPE_MENU);
                });

                panel_menu.show();
            }
        });

        stops_menu.show();
    });

    lines_menu.show();
}

function createLinesArray() {
    // Set lines array to make the menu
    var lines = [];

    for (var i = 0 ; i<data_lines.length ; i++) {
        var name = "Línea " + data_lines[i].id;
        var destinations = data_lines[i].stops[0].name.substring(0, 11) + " - " + data_lines[i].stops[data_lines[i].stops.length-1].name.substring(0, 11)

        lines.push({
            title: name,
            subtitle: destinations
        });
    }

    return lines;
}

function createStopsArray(item) {
    var stops = [];
    var aux_stops = data_lines[item].stops;

    for (var i = 0 ; i<aux_stops.length ; i++) {
        stops.push({
            title: aux_stops[i].name
        });
    }

    return stops;
}

function createPanelArray(item) {
    var panels = [];
    var aux_panels = data_lines[current_position.line].stops[item].panels;

    aux_panels.sort(function(a, b) {
        if (a.remainingMinutes > b.remainingMinutes)
            return 1;
        if (a.remainingMinutes < b.remainingMinutes)
            return -1;
        return 0;
    });

    // Convert UNIX time to string 11/07/2016 15:50:50
    var date = new Date(/*aux_panels[0].lastUpdate*/);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var long_date = day + '/' + month + '/' + year + ' ' + (date.getTimezoneOffset()*-1/60 + hour) + ':' + min + ':' + sec;

    panels.push({
        title: "Actualizado",
        subtitle: long_date
        //subtitle: aux_panels[0].lastUpdateFormatted
    });

    for (var i = 0 ; i<aux_panels.length ; i++) {
        panels.push({
            subtitle: "Hacia > " + aux_panels[i].destinationStopDescription.toLowerCase().capitalizeFirstLetter(),
            title: "Faltan " + aux_panels[i].remainingMinutes + " minutos"
        });
    }

    return panels;
}

function updateData(up, object, type) {
    // Specify the callback for when the request is completed
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            // HTML Response string
            var html_doc = this.responseText;
            // Get all script tags
            var scripts = html_doc.match(/<script.*?>([\s\S]*?)<\/script>/gmi);
            // Remove script tags and blank spaces
            var trimmed = scripts[scripts.length-2].replace(/<script.*?>/, "").replace(/<\/script>/, "").trim();
            // Split by ";"
            var data_array = trimmed.split(";");
            // Trim each item and remove empty elements from array
            for (var i = 0 ; i<data_array.length ; i++) {
                data_array[i] = data_array[i].trim();

                if (data_array[i] == "") {
                    data_array.splice(i, 1);
                }
            }
            // Remove the var name and characters
            for (var i = 0 ; i<data_array.length ; i++) {
                var pos = data_array[i].indexOf("[");
                data_array[i] = data_array[i].substring(pos);
            }
            // JSON Parsers
            stops_json = JSON.parse(data_array[0]);
            panels_json = JSON.parse(data_array[1]);
            lines_json = JSON.parse(data_array[2]);

            // Set aux lines array
            var aux_lines = [];

            for (var i = 0 ; i<stops_json.length ; i++) {
                for (var j = 0 ; j<stops_json[i].lines.length ; j++) {
                    if (aux_lines.indexOf(stops_json[i].lines[j]) == -1) {
                        aux_lines.push(stops_json[i].lines[j]);
                    }
                }
            }

            // Set panels in stops
            for (var i = 0; i < stops_json.length; i++) {
                stops_json[i].panels = [];
            }

            for (var i = 0; i < stops_json.length; i++) {
                for (var j = 0; j < panels_json.length; j++) {
                    if (stops_json[i].id == panels_json[j].stop) {
                        stops_json[i].panels.push(panels_json[j]);
                    }
                }
            }

            // Set array with lines and stops
            data_lines = [];

            // Line info
            for (var i = 0; i < aux_lines.length; i++) {
                data_lines.push({
                    id: aux_lines[i],
                    stops: []
                });
            }
            // Stop info
            for (var i = 0 ; i<stops_json.length ; i++) {
                for (var j = 0 ; j<data_lines.length ; j++) {
                    if (stops_json[i].lines.indexOf(data_lines[j].id) != -1) {
                        data_lines[j].stops.push(stops_json[i]);
                    }
                }
            }

            // Create UI
            if (up == 0) {
                createUI();
                splash_screen.hide();
            } else {
                if (type == TYPE_WINDOW) {
                    createLinesArray();
                    createStopsArray(current_position.line);
                    aux_panels = createPanelArray(current_position.stop);

                    if (aux_panels.length > 0) {
                        var panel_menu = new UI.Menu({
                            status: {
                                color: 'white',
                                backgroundColor: Feature.color('cobalt-blue', 'black'),
                                separator: 'none'
                            },
                            backgroundColor: Feature.color('oxford-blue', 'white'),
                            textColor: Feature.color('white', 'black'),
                            highlightBackgroundColor: Feature.color('red', 'black'),
                            highlightTextColor: 'white',
                            sections: [{
                                title: 'Próximos tranvías:',
                                items: aux_panels
                            }]
                        });

                        panel_menu.on('longSelect', function(e) {
                            // Update data
                            updateData(1, panel_menu, TYPE_MENU);
                        });
                        panel_menu.show();
                        object.hide();
                    }
                } else {
                    createLinesArray();
                    createStopsArray(current_position.line);
                    object.items(0, createPanelArray(current_position.stop));
                }
            }
        } else if (request.readyState == 4 && request.status != 200) {
            // Connection Errors
            var con_error_screen = new UI.Card({
                status: false,
                backgroundColor: Feature.color('oxford-blue', 'black'),
                banner: 'IMAGE_ICON_DISMISS',
                body: '\n\n Error de conexión',
                bodyColor: 'white',
                style: 'mono'
            });

            con_error_screen.show();
        }
    };

    // Send the request
    request.open(method, url);
    request.send();
}

var splash_screen = new UI.Window({
    status: false,
    backgroundColor: 'white',
    fullscreen: true
});

var wind_size = Feature.resolution();

var logo_img = new UI.Image({
    size: new Vector2(wind_size.x, 110),
    position: new Vector2(0, 10),
    image: Feature.blackAndWhite('IMAGE_LOGO_METRO_BW', 'IMAGE_LOGO_METRO_C'),
    backgroundColor: 'clear'
});

logo_img.compositing('normal');

var logo_text = new UI.Text({
    size: new Vector2(wind_size.x, 20),
    position: new Vector2(0, wind_size.y-55),
    text: 'Cargando datos...',
    textAlign: 'center',
    color: 'black',
    font: 'MONO_FONT_14'
});

splash_screen.add(logo_img);
splash_screen.add(logo_text);

// Show initial screen
splash_screen.on('show', function() {
    // Initialize data
    updateData(0, 0, TYPE_NONE);
});

splash_screen.show();
