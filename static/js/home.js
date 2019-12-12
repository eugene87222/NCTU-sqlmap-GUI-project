import sections from './import/id.js'
import tabnames from './import/tabname.js'

let ns = {};

ns.model = (function() {
    "use strict";

    let $event_pump = $("body");

    return {
        "read": function() {
            let ajax_options = {
                type: "GET",
                url: "api/UI/read",
                accepts: "application/json",
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger("model_read_success", [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger("model_error", [xhr, textStatus, errorThrown]);
            })
        }, 
        "run": function(args) {
            let ajax_options = {
                type: "POST",
                url: "api/UI/run",
                contentType: "application/json",
                data: JSON.stringify(args)
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger("model_run_success", [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger("model_error", [xhr, textStatus, errorThrown]);
            })
        }, 
        "info": function(args) {
            let ajax_options = {
                type: "POST",
                url: "api/UI/info",
                contentType: "application/json",
                data: JSON.stringify(args),
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger("model_info_success", [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger("model_error", [xhr, textStatus, errorThrown]);
            })
        }, 
        "save": function() {
            let ajax_options = {
                type: "GET",
                url: "api/UI/save",
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger("model_save_success", [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger("model_error", [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

ns.view = (function() {
    "use strict";

    return {
        showResult: function(data) {
            $("#final_output").html(data[0].output);
        }, 
        showInfo: function(data) {
            $("#info_msg").html(data);
        }, 
        error: function(error_msg) {
        }
    };
}());

ns.controller = (function(m, v) {
    "use strict";

    let model = m;
    let view = v;
    let $event_pump = $("body");

    let section_title = [
        "target", "request", "optimization", "injection", "detection", "techniques", 
        "fingerprint", "enumeration", "brute-force", "user-defined-function-injection", 
        "file-system-access", "operating-system-access", "windows-registry-access", 
        "general", "miscellaneous"
    ];
    let section_length = section_title.length;

    function checkTarget() {
        let targets = sections[0];
        let target_length = targets.length;
        for(let i = 0; i < target_length; i++) {
            if($("#" + targets[i] + "-cb").is(":checked")) {
                if($("#" + targets[i]).val() != "") {
                    return true;
                }
            }
        }
        return false;
    }

    function showAlert(msg) {
        document.getElementById("alert-msg").innerHTML = msg;
        document.getElementsByClassName("alert-window")[0].style.display = "block";
        document.getElementsByClassName("curtain")[0].style.display = "block";
    }

    var readInterval;
    
    $("#save_output").click(function(e) {
        e.preventDefault();
        if($("#final_output").html().trim() != "The final output will be shown here."){
            model.save();
        }
        else {
            showAlert("Final output is empty. <br/> Please run command first.")
        }
    });

    $("#run").click(function(e) {
        e.preventDefault();
        if(checkTarget()) {
            let args = {};
            let msg = "";
            args["v"] = $("#verbosity").val();
            for(let i = 0; i < section_length; i++) {
                let options = sections[i];
                let arg = {};
                let cnt = 0;
                for(let j = 0; j < options.length; j++) {
                    if(options[j].slice(-3) == "-cb") {
                        arg[options[j].slice(0, -3)] = {};
                        arg[options[j].slice(0, -3)]["check"] = $("#" + options[j]).is(":checked");
                    }
                    else {
                        arg[options[j]] = {};
                        arg[options[j]]["check"] = $("#" + options[j] + "-cb").is(":checked");
                        arg[options[j]]["value"] = $("#" + options[j]).val();
                        if(arg[options[j]]["check"] && arg[options[j]]["value"].length == 0) {
                            cnt += 1;
                        }
                    }
                }
                args[section_title[i]] = arg;
                if(cnt > 0) {
                    if(msg.length > 0) {
                        msg += ", ";
                    }
                    msg += "<span>" + tabnames[i] + "</span>";
                }
            }
            if(msg.length > 0) {
                showAlert("Empty textbox found in tabs below<br/><br/>" + msg);
            }
            else {
                model.run(args);
                readInterval = setInterval(function() { model.read(); }, 250);
            }
        }
        else {
            showAlert("Target must be provided.");
        }
    });

    $("#basic_help").click(function(e) {
        model.info({
            "type": "-h"
        });
    });

    $("#adv_help").click(function(e) {
        model.info({
            "type": "-hh"
        });
    });

    $("#version").click(function(e) {
        model.info({
            "type": "--version"
        });
    });

    $("#update").click(function (e) {
        model.info({
            "type": "--update"
        });
    });

    $event_pump.on("model_read_success", function(e, data) {
        view.showResult(data);
    });

    $event_pump.on("model_run_success", function(e, data) {
        clearInterval(readInterval);
        model.read();
        console.log("Run command successfully");
    });

    $event_pump.on("model_info_success", function(e, data) {
        view.showInfo(data);
        console.log("Get information successfully")
    });

    $event_pump.on("model_save_success", function(e, data) {
        // view.showInfo(data);
        showAlert("Save output successfully")
    });

    $event_pump.on("model_error", function(e, xhr, textStatus, errorThrown) {
        alert(textStatus);
        alert(errorThrown);
        alert(xhr);
    });
}(ns.model, ns.view));