let ns = {};

ns.model = (function() {
    "use strict";

    let $event_pump = $("body");

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

ns.view = (function() {
    "use strict";

    let $command = $("#command"), 
        $result = $("#result");

    return {
        reset: function() {
            $command.val("").focus();
        },
        show_result: function(result) {
            $result.html(result[0].output);
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

ns.controller = (function(m, v) {
    "use strict";

    let model = m,
        view = v,
        $event_pump = $("body"),
        $command = $("#command");
    
    setInterval(function(){ model.read(); }, 100);

    function validate(command) {
        return command !== "";
    }

    $("#run").click(function(e) {
        let command = $command.val();
        e.preventDefault();
        if (validate(command)) {
            model.run(command);
        } else {
            alert("Empty command");
        }
    });

    $("#reset").click(function() {
        view.reset();
    });

    $event_pump.on("model_read_success", function(e, data) {
        view.show_result(data);
    });

    $event_pump.on("model_run_success", function(e, data) {
    });

    $event_pump.on("model_error", function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ": " + errorThrown + " - " + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));