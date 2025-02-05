const http = require("http");
const url = require("url");

class DictionaryController {
    constructor() {
        this.dictionary = [];
    }
    getDictionary() {
        return this.dictionary;
    }
    findDefinition(keyword) {
        try {
            return this.dictionary[keyword];
        } catch {
            // TODO: RETURN NOT FOUND
            return null;
        }
    }
    addDefinition(keyword, definition) {
        this.dictionary.push({ keyword: keyword, definition: definition });
    }
}

class RequestHandler {
    constructor(dictionaryController) {
        this.requestCount = 0;
        this.dictController = dictionaryController;
    }
    handleGetRequest(req, res, query) {
        this.requestCount++;
        const keyword = query.word;
        if (!word) {
            return;
            // Word is not given
        }
        const definition = this.dictController.findDefinition(keyword);
        if (definition) {
            // Found definition
        } else {
            // Not found definition
        }
    }
    handlePostRequest(req, res) {
        this.requestCount++;
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                if (!body) {
                    // return Emptybody
                }
                const { word, definition } = JSON.parse(body);
                if (!word || !definition) {
                    // return Both word and definition needed
                }
                const addResult = this.dictController.addDefinition(word, definition);
                if (!addResult) {
                    // return Word exist
                }

                // return OK
            } catch (err) {
                // return Invalid request
            }
        });
    }
    handleResponse(res, statusCode, data) {
        res.writeHead(statusCode, {
            "Content-Type": "application/json",
            "": "",
        });
        res.end(JSON.stringify(data));
    }
}

class Server {
    constructor() {}
    run() {
        const server = http.createServer(function (req, res) {
            const parsedUrl = url.parse(req.url, true);
            const pathName = parsedUrl.pathname;
            if (req.method === "POST") {
            } else if (req.method === "GET") {
                if (true) {
                    console.log();
                }
            } else {
                // TODO: Return unsupported
            }
        });
    }
}
