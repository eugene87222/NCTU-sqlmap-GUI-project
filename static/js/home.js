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
    
    let sections = {};

    sections["target"] = [
        "d", "u", "l", "x", "m", "r", "g", "c"
    ];

    sections["request"] = [
        "method", "data", "param-del", "cookie", "cookie-del", "load-cookies", 
        "drop-set-cookie-cb", "user-agent", "random-agent-cb", "host", "referer", 
        "header", "headers", "auth-type", "auth-cred", "auth-file", "ignore-code", 
        "ignore-proxy-cb", "ignore-redirects-cb", "ignore-timeouts-cb", "proxy", 
        "proxy-cred", "proxy-file", "tor-cb", "tor-port", "tor-type", "check-tor-cb", 
        "delay", "timeout", "retries", "randomize", "safe-url", "safe-post", 
        "safe-req", "safe-freq", "skip-urlencode-cb", "csrf-token", "csrf-url", 
        "force-ssl-cb", "hpp-cb", "eval"
    ];
    
    sections["optimization"] = [
        "o-cb", "predict-output-cb", "keep-alive-cb", "null-connection-cb", "threads"
    ];

    sections["injection"] = [
        "p", "skip", "skip-static-cb", "param-exclude", "dbms", "dbms-cred", "os", 
        "invalid-bignum-cb", "invalid-logical-cb", "invalid-string-cb", "no-cast-cb", 
        "no-escape-cb", "prefix", "suffix", "tamper"
    ];

    sections["detection"] = [
        "level", "risk", "string", "not-string", "regexp", "code", "text-only-cb", 
        "titles-cb"
    ];

    sections["techniques"] = [
        "technique", "time-sec", "union-cols", "union-char", "union-from", 
        "dns-domain", "second-url", "second-req"
    ];

    sections["fingerprint"] = [
        "fingerprint-cb"
    ];
    
    sections["enumeration"] = [
        "all-cb", "banner-cb", "current-user-cb", "current-db-cb", "hostname-cb", 
        "is-dba-cb", "users-cb", "passwords-cb", "privileges-cb", "roles-cb", 
        "dbs-cb", "tables-cb", "columns-cb", "schema-cb", "count-cb", "dump-cb", 
        "dump-all-cb", "search-cb", "comments-cb", "D", "T", "C", "X", "U", 
        "exclude-sysdbs-cb", "pivot-column", "where", "start", "stop", "first", 
        "last", "sql-query", "sql-shell-cb", "sql-file"
    ];

    sections["brute-force"] = [
        "common-tables-cb", "common-columns-cb"
    ];

    sections["user-defined-function-injection"] = [
        "udf-inject-cb", "shared-lib"
    ];

    sections["file-system-access"] = [
        "file-read", "file-write", "file-dest"
    ];

    sections["operating-system-access"] = [
        "os-cmd", "os-shell-cb", "os-pwn-cb", "os-smbrelay-cb", "os-bof-cb", 
        "priv-esc-cb", "msf-path", "tmp-path"
    ];

    sections["windows-registry-access"] = [
        "reg-read-cb", "reg-add-cb", "reg-del-cb", "reg-key", "reg-value", 
        "reg-data", "reg-type"
    ];

    sections["general"] = [
        "s", "t", "batch-cb", "binary-fields", "check-internet-cb", "crawl", 
        "crawl-exclude", "csv-del", "charset", "dump-format", "encoding", "eta-cb", 
        "flush-session-cb", "forms-cb", "fresh-queries-cb", "har", "hex-cb", 
        "output-dir", "parse-errors-cb", "preprocess", "repair-cb", "save", "scope", 
        "test-filter", "test-skip", "update-cb"
    ];
        
    sections["miscellaneous"] = [
        "z", "alert", "answers", "beep-cb", "cleanup-cb", "dependencies-cb", 
        "disable-coloring-cb", "gpage", "identify-waf-cb", "list-tampers-cb", 
        "mobile-cb", "offline-cb", "purge-cb", "skip-waf-cb", "smart-cb", 
        "sqlmap-shell-cb", "tmp-dir", "web-root", "wizard-cb"
    ];

    function checkTarget() {
        let targets = sections["target"];
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

    var readInterval;
    
    $("#attack").click(function(e) {
        e.preventDefault();
        if(checkTarget()) {
            let args = {};
            args["v"] = $("#verbosity").val();
            for(let i = 0; i < section_length; i++) {
                let options = sections[section_title[i]];
                let arg = {};
                for(let j = 0; j < options.length; j++) {
                    if(options[j].slice(-3) == "-cb") {
                        arg[options[j].slice(0, -3)] = {};
                        arg[options[j].slice(0, -3)]["check"] = $("#" + options[j]).is(":checked");
                    }
                    else {
                        arg[options[j]] = {};
                        arg[options[j]]["check"] = $("#" + options[j] + "-cb").is(":checked");
                        arg[options[j]]["value"] = $("#" + options[j]).val();
                    }
                }
                args[section_title[i]] = arg;
            }
            model.run(args);
            readInterval = setInterval(function() { model.read(); }, 250);
        }
        else {
            alert("Target must be provided.");
        }
    });

    $("#save").click(function(e) {
        e.preventDefault();
        model.save();
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

    $event_pump.on("model_read_success", function(e, data) {
        view.showResult(data);
    });

    $event_pump.on("model_run_success", function(e, data) {
        clearInterval(readInterval);
        model.read();
    });

    $event_pump.on("model_info_success", function(e, data) {
        view.showInfo(data);
    });

    $event_pump.on("model_error", function(e, xhr, textStatus, errorThrown) {
        alert(textStatus);
        alert(errorThrown);
        alert(xhr);
    });
}(ns.model, ns.view));