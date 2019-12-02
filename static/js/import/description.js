var description = [
    ['Connection string for direct database connection',
    'Target URL (e.g. "http://www.site.com/vuln.php?id=1")',
    'Parse target(s) from Burp or WebScarab proxy log file',
    'Parse target(s) from remote sitemap(.xml) file',
    'Scan multiple targets given in a textual file',
    'Load HTTP request from a file',
    'Process Google dork results as target URLs',
    'Load options from a configuration INI file'],

    ['Force usage of given HTTP method (e.g. PUT)',
    'Data string to be sent through POST (e.g. "id=1")',
    'Character used for splitting parameter values (e.g. &)',
    'HTTP Cookie header value (e.g. "PHPSESSID=a8d127e..")',
    'Character used for splitting cookie values (e.g. ;)',
    'File containing cookies in Netscape/wget format',
    'Ignore Set-Cookie header from response',
    'HTTP User-Agent header value',
    'Use randomly selected HTTP User-Agent header value',
    'HTTP Host header value',
    'HTTP Referer header value',
    'Extra header (e.g. "X-Forwarded-For: 127.0.0.1")',
    'Extra headers (e.g. "Accept-Language: fr\nETag: 123")',
    'HTTP authentication type (Basic, Digest, NTLM or PKI)',
    'HTTP authentication credentials (name:password)',
    'HTTP authentication PEM cert/private key file',
    'Ignore (problematic) HTTP error code (e.g. 401)',
    'Ignore system default proxy settings',
    'Ignore redirection attempts',
    'Ignore connection timeouts',
    'Use a proxy to connect to the target URL',
    'Proxy authentication credentials (name:password)',
    'Load proxy list from a file',
    'Use Tor anonymity network',
    'Set Tor proxy port other than default',
    'Set Tor proxy type (HTTP, SOCKS4 or SOCKS5 (default))',
    'Check to see if Tor is used properly',
    'Delay in seconds between each HTTP request',
    'Seconds to wait before timeout connection (default 30)',
    'Retries when the connection timeouts (default 3)',
    'Randomly change value for given parameter(s)',
    'URL address to visit frequently during testing',
    'POST data to send to a safe URL',
    'Load safe HTTP request from a file',
    'Test requests between two visits to a given safe URL',
    'Skip URL encoding of payload data',
    'Parameter used to hold anti-CSRF token',
    'URL address to visit for extraction of anti-CSRF token',
    'Force usage of SSL/HTTPS',
    'Use HTTP parameter pollution method',
    'Evaluate provided Python code before the request (e.g. "import hashlib;id2=hashlib.md5(id).hexdigest()")'],

    ['Turn on all optimization switches',
    'Predict common queries output',
    'Use persistent HTTP(s) connections',
    'Retrieve page length without actual HTTP response body',
    'Max number of concurrent HTTP(s) requests (default 1)'],

    ['Testable parameter(s)',
    'Skip testing for given parameter(s)',
    'Skip testing parameters that not appear to be dynamic',
    'Regexp to exclude parameters from testing (e.g. "ses")',
    'Force back-end DBMS to provided value',
    'DBMS authentication credentials (user:password)',
    'Force back-end DBMS operating system to provided value',
    'Use big numbers for invalidating values',
    'Use logical operations for invalidating values',
    'Use random strings for invalidating values',
    'Turn off payload casting mechanism',
    'Turn off string escaping mechanism',
    'Injection payload prefix string',
    'Injection payload suffix string',
    'Use given script(s) for tampering injection data'],

    ['Level of tests to perform (1-5, default 1)',
    'Risk of tests to perform (1-3, default 1)',
    'String to match when query is evaluated to True',
    'String to match when query is evaluated to False',
    'Regexp to match when query is evaluated to True',
    'HTTP code to match when query is evaluated to True',
    'Compare pages based only on the textual content',
    'Compare pages based only on their titles'],

    ['SQL injection techniques to use (default "BEUSTQ")',
    'Seconds to delay the DBMS response (default 5)',
    'Range of columns to test for UNION query SQL injection',
    'Character to use for bruteforcing number of columns',
    'Table to use in FROM part of UNION query SQL injection',
    'Domain name used for DNS exfiltration attack',
    'Resulting page URL searched for second-order response',
    'Load second-order HTTP request from file'],

    ['Perform an extensive DBMS version fingerprint'],
    ['Retrieve everything',
    'Retrieve DBMS banner',
    'Retrieve DBMS current user',
    'Retrieve DBMS current database',
    'Retrieve DBMS server hostname',
    'Detect if the DBMS current user is DBA',
    'Enumerate DBMS users',
    'Enumerate DBMS users password hashes',
    'Enumerate DBMS users privileges',
    'Enumerate DBMS users roles',
    'Enumerate DBMS databases',
    'Enumerate DBMS database tables',
    'Enumerate DBMS database table columns',
    'Enumerate DBMS schema',
    'Retrieve number of entries for table(s)',
    'Dump DBMS database table entries',
    'Dump all DBMS databases tables entries',
    'Search column(s), table(s) and/or database name(s)',
    'Check for DBMS comments during enumeration',
    'DBMS database to enumerate',
    'DBMS database table(s) to enumerate',
    'DBMS database table column(s) to enumerate',
    'DBMS database identifier(s) to not enumerate',
    'DBMS user to enumerate',
    'Exclude DBMS system databases when enumerating tables',
    'Pivot column name',
    'Use WHERE condition while table dumping',
    'First dump table entry to retrieve',
    'Last dump table entry to retrieve',
    'First query output word character to retrieve',
    'Last query output word character to retrieve',
    'SQL statement to be executed',
    'Prompt for an interactive SQL shell',
    'Execute SQL statements from given file(s)'],

    ['Check existence of common tables',
    'Check existence of common columns'],

    ['Inject custom user-defined functions',
    'Local path of the shared library'],

    ['Read a file from the back-end DBMS file system',
    'Write a local file on the back-end DBMS file system',
    'Back-end DBMS absolute filepath to write to'],

    ['Execute an operating system command',
    'Prompt for an interactive operating system shell',
    'Prompt for an OOB shell, Meterpreter or VNC',
    'One click prompt for an OOB shell, Meterpreter or VNC',
    'Stored procedure buffer overflow exploitation',
    'Database process user privilege escalation',
    'Local path where Metasploit Framework is installed',
    'Remote absolute path of temporary files directory'],

    ['Read a Windows registry key value',
    'Write a Windows registry key value data',
    'Delete a Windows registry key value',
    'Windows registry key',
    'Windows registry key value',
    'Windows registry key value data',
    'Windows registry key value type'],

    ['Load session from a stored (.sqlite) file',
    'Log all HTTP traffic into a textual file',
    'Never ask for user input, use the default behavior',
    'Result fields having binary values (e.g. "digest")',
    'Check Internet connection before assessing the target',
    'Crawl the website starting from the target URL',
    'Regexp to exclude pages from crawling (e.g. "logout")',
    'Delimiting character used in CSV output (default ",")',
    'Blind SQL injection charset (e.g. "0123456789abcdef")',
    'Format of dumped data (CSV (default), HTML or SQLITE)',
    'Character encoding used for data retrieval (e.g. GBK)',
    'Display for each output the estimated time of arrival',
    'Flush session files for current target',
    'Parse and test forms on target URL',
    'Ignore query results stored in session file',
    'Log all HTTP traffic into a HAR file',
    'Use hex conversion during data retrieval',
    'Custom output directory path',
    'Parse and display DBMS error messages from responses',
    'Use given script(s) for preprocessing of response data',
    'Redump entries having unknown character marker (?)',
    'Save options to a configuration INI file',
    'Regexp to filter targets from provided proxy log',
    'Select tests by payloads and/or titles (e.g. ROW)',
    'Skip tests by payloads and/or titles (e.g. BENCHMARK)',
    'Update sqlmap'],

    ['Use short mnemonics (e.g. "flu,bat,ban,tec=EU")',
    'Run host OS command(s) when SQL injection is found',
    'Set predefined answers (e.g. "quit=N,follow=N")',
    'Beep on question and/or when SQL injection is found',
    'Clean up the DBMS from sqlmap specific UDF and tables',
    'Check for missing (optional) sqlmap dependencies',
    'Disable console output coloring',
    'Use Google dork results from specified page number',
    'Make a thorough testing for a WAF/IPS protection',
    'Display list of available tamper scripts',
    'Imitate smartphone through HTTP User-Agent header',
    'Work in offline mode (only use session data)',
    'Safely remove all content from sqlmap data directory',
    'Skip heuristic detection of WAF/IPS protection',
    'Conduct thorough tests only if positive heuristic(s)',
    'Prompt for an interactive sqlmap shell',
    'Local directory for storing temporary files',
    'Web server document root directory (e.g. "/var/www")',
    'Simple wizard interface for beginner users']
];

export default description;