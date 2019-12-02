var id = [
    //target
    ["d", "u", "l", "x", "m", "r", "g", "c"],

    //request
    ["method", "data", "param-del", "cookie", "cookie-del", "load-cookies", 
    "drop-set-cookie-cb", "user-agent", "random-agent-cb", "host", "referer", 
    "header", "headers", "auth-type", "auth-cred", "auth-file", "ignore-code", 
    "ignore-proxy-cb", "ignore-redirects-cb", "ignore-timeouts-cb", "proxy", 
    "proxy-cred", "proxy-file", "tor-cb", "tor-port", "tor-type", "check-tor-cb", 
    "delay", "timeout", "retries", "randomize", "safe-url", "safe-post", 
    "safe-req", "safe-freq", "skip-urlencode-cb", "csrf-token", "csrf-url", 
    "force-ssl-cb", "hpp-cb", "eval"],

    //optimization
    ["o-cb", "predict-output-cb", "keep-alive-cb", "null-connection-cb", "threads"],

    //injection
    ["p", "skip", "skip-static-cb", "param-exclude", "dbms", "dbms-cred", "os", 
    "invalid-bignum-cb", "invalid-logical-cb", "invalid-string-cb", "no-cast-cb", 
    "no-escape-cb", "prefix", "suffix", "tamper"],

    //detection
    ["level", "risk", "string", "not-string", "regexp", "code", "text-only-cb", 
    "titles-cb"],

    //techniques
    ["technique", "time-sec", "union-cols", "union-char", "union-from", 
    "dns-domain", "second-url", "second-req"],

    //fingerprint
    ["fingerprint-cb"],

    //enumeration
    ["all-cb", "banner-cb", "current-user-cb", "current-db-cb", "hostname-cb", 
    "is-dba-cb", "users-cb", "passwords-cb", "privileges-cb", "roles-cb", 
    "dbs-cb", "tables-cb", "columns-cb", "schema-cb", "count-cb", "dump-cb", 
    "dump-all-cb", "search-cb", "comments-cb", "D", "T", "C", "X", "U", 
    "exclude-sysdbs-cb", "pivot-column", "where", "start", "stop", "first", 
    "last", "sql-query", "sql-shell-cb", "sql-file"],

    //brute-force
    ["common-tables-cb", "common-columns-cb"],

    //user-defined-function-injection
    ["udf-inject-cb", "shared-lib"],

    //file-system-access
    ["file-read", "file-write", "file-dest"],

    //operating-system-access
    ["os-cmd", "os-shell-cb", "os-pwn-cb", "os-smbrelay-cb", "os-bof-cb", 
    "priv-esc-cb", "msf-path", "tmp-path"],

    //windows-registry-access
    ["reg-read-cb", "reg-add-cb", "reg-del-cb", "reg-key", "reg-value", 
    "reg-data", "reg-type"],


    //general
    ["s", "t", "batch-cb", "binary-fields", "check-internet-cb", "crawl", 
    "crawl-exclude", "csv-del", "charset", "dump-format", "encoding", "eta-cb", 
    "flush-session-cb", "forms-cb", "fresh-queries-cb", "har", "hex-cb", 
    "output-dir", "parse-errors-cb", "preprocess", "repair-cb", "save", "scope", 
    "test-filter", "test-skip", "update-cb"],

    //miscellaneous
    ["z", "alert", "answers", "beep-cb", "cleanup-cb", "dependencies-cb", 
    "disable-coloring-cb", "gpage", "identify-waf-cb", "list-tampers-cb", 
    "mobile-cb", "offline-cb", "purge-cb", "skip-waf-cb", "smart-cb", 
    "sqlmap-shell-cb", "tmp-dir", "web-root", "wizard-cb"]
]

export default id;