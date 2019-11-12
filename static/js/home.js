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
        }
    };
}());

ns.view = (function() {
    "use strict";

    return {
        show_result: function(result) {
            $("#info_msg").html(result[0].output);
        }, 
        error: function(error_msg) {
            $("#info_msg").html(error_msg);
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
        "drop-set-cookie", "user-agent", "random-agent", "host", "referer", 
        "header", "headers", "auth-type", "auth-cred", "auth-file", "ignore-code", 
        "ignore-proxy", "ignore-redirects", "ignore-timeouts", "proxy", "proxy-cred", 
        "proxy-file", "tor", "tor-port", "tor-type", "check-tor", "delay", "timeout", 
        "retries", "randomize", "safe-url", "safe-post", "safe-req", "safe-freq", 
        "skip-urlencode", "csrf-token", "csrf-url", "force-ssl", "hpp", "eval"
    ];

    sections["optimization"] = [
        "o", "predict-output", "keep-alive", "null-connection", "threads"
    ];

    sections["injection"] = [
        "p", "skip", "skip-static", "param-exclude", "dbms", "dbms-cred", "os", 
        "invalid-bignum", "invalid-logical", "invalid-string", "no-cast", "no-escape", 
        "prefix", "suffix", "tamper"
    ];

    sections["detection"] = [
        "level", "risk", "string", "not-string", "regexp", "code", "text-only", "titles"
    ];

    sections["techniques"] = [
        "technique", "time-sec", "union-cols", "union-char", "union-from", 
        "dns-domain", "second-url", "second-req"
    ];

    sections["fingerprint"] = [
        "fingerprint"
    ];
    
    sections["enumeration"] = [
        "all", "banner", "current-user", "current-db", "hostname", "is-dba", 
        "users", "passwords", "privileges", "roles", "dbs", "tables", "columns", 
        "schema", "count", "dump", "dump-all", "search", "comments", "D", "T", 
        "C", "X", "U", "exclude-sysdbs", "pivot-column", "where", "start", "stop", 
        "first", "last", "sql-query", "sql-shell", "sql-file"
    ];

    sections["brute-force"] = [
        "common-tables", "common-columns"
    ];

    sections["user-defined-function-injection"] = [
        "udf-inject", "shared-lib"
    ];

    sections["file-system-access"] = [
        "file-read", "file-write", "file-dest"
    ];

    sections["operating-system-access"] = [
        "os-cmd", "os-shell", "os-pwn", "os-smbrelay", "os-bof", "priv-esc", 
        "msf-path", "tmp-path"
    ];

    sections["windows-registry-access"] = [
        "reg-read", "reg-add", "reg-del", "reg-key", "reg-value", "reg-data", "reg-type"
    ];

    sections["general"] = [
        "s", "t", "batch", "binary-fields", "check-internet", "crawl", "crawl-exclude", 
        "csv-del", "charset", "dump-format", "encoding", "eta", "flush-session", 
        "forms", "fresh-queries", "har", "hex", "output-dir", "parse-errors", 
        "preprocess", "repair", "save", "scope", "test-filter", "test-skip", "update"
    ];
        
    sections["miscellaneous"] = [
        "z", "alert", "answers", "beep", "cleanup", "dependencies", "disable-coloring", 
        "gpage", "identify-waf", "list-tampers", "mobile", "offline", "purge", 
        "skip-waf", "smart", "sqlmap-shell", "tmp-dir", "web-root", "wizard"
    ];

    // setInterval(function(){ model.read(); }, 500);

    $("#attack").click(function(e) {
        e.preventDefault();
        let args = {};
        args["v"] = $("#verbosity").val();
        for(let i = 0; i < section_length; i++) {
            let options = sections[section_title[i]];
            let arg = {};
            for(let j = 0; j < options.length; j++) {
                let checkbox = "#" + options[j] + "-cb";
                let input = "#" + options[j];
                arg[options[j]] = {};
                arg[options[j]]["check"] = $(checkbox).is(":checked");
                if(typeof $(input).val() != "undefined") {
                    arg[options[j]]["value"] = $(input).val();
                }
            }
            args[section_title[i]] = arg;
        }
        $("#msg").html(JSON.stringify(args));
        model.run(args);
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
        view.show_result(data);
    });

    $event_pump.on("model_run_success", function(e, data) {
        alert("successfully send the command");
    });

    $event_pump.on("model_info_success", function(e, data) {
        model.read();
    });

    $event_pump.on("model_error", function(e, xhr, textStatus, errorThrown) {
        alert(textStatus);
        alert(errorThrown);
        alert(xhr);
        view.error("HI");
    });
}(ns.model, ns.view));