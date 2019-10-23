// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    "use strict";

    let $event_pump = $("body");

    // Return the API
    return {
        "read": function() {
            let ajax_options = {
                type: "GET",
                url: "api/command",
                accepts: "application/json",
                dataType: "json"
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger("model_read_success", [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger("model_error", [xhr, textStatus, errorThrown]);
            })
        },
        "run": function(command) {
            let ajax_options = {
                type: "POST",
                url: "api/command",
                accepts: "application/json",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "command": command
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger("model_run_success", [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger("model_error", [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    "use strict";

    let $command = $("#command"), 
        $check = $("#check"), 
        $check_status = $("#check_status"), 
        $selection = $("#selection"), 
        $selection_status = $("#selection_status");

    // return the API
    return {
        reset: function() {
            $command.val("").focus();
            if($check.is(":checked")) {
                $check_status.val('checked');
            }
            else {
                $check_status.val('not checked');
            }
            $selection_status.val($selection.val());
        },
        update_editor: function(command) {
            $command.val(command).focus();
        },
        build_table: function(history) {
            let rows = ""

            // clear the table
            $(".history table > tbody").empty();

            // did we get a command array?
            if(history) {
                for(let i = 0, l = history.length; i < l; i++) {
                    rows += `<tr><td class="cmd">${history[i].command}</td><td class="output">${history[i].output}</td><td>${history[i].timestamp}</td></tr>`;
                }
                $("table > tbody").append(rows);
            }
        },
        error: function(error_msg) {
            $(".error")
                .text(error_msg)
                .css("visibility", "visible");
            setTimeout(function() {
                $(".error").css("visibility", "hidden");
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    "use strict";

    let model = m,
        view = v,
        $event_pump = $("body"),
        $command = $("#command");

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(command) {
        return command !== "";
    }

    // Create our event handlers
    $("#run").click(function(e) {
        let command = $command.val();
        e.preventDefault();
        if (validate(command)) {
            model.run(command)
        } else {
            alert("Empty command");
        }
    });

    $("#reset").click(function() {
        view.reset();
    })

    $("table > tbody").on("dblclick", "tr", function(e) {
        let $target = $(e.target),
            command;
        command = $target
            .parent()
            .find("td.cmd")
            .text();
        view.update_editor(command);
    });

    // Handle the model events
    $event_pump.on("model_read_success", function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on("model_run_success", function(e, data) {
        model.read();
    });

    $event_pump.on("model_error", function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ": " + errorThrown + " - " + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));