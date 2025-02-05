const http = require("http");
const url = require("url");

const PORT = 3010;

class DictionaryController {
    constructor() {
        this.dictionary = [];
    }
    getDictionary() {
        return this.dictionary;
    }
    findDefinition(keyword) {
        this.dictionary.map((each) => {
            if (each[keyword]) {
                return each[definition];
            }
        });
        return null;
    }
    addDefinition(keyword, definition) {
        this.dictionary.push({ keyword: keyword, definition: definition });
    }
}

// Response messages are created by ChatGPT 40
class RequestHandler {
    constructor(dictionaryController) {
        this.requestCount = 0;
        this.dictController = dictionaryController;
    }
    handleGetRequest(req, res, query) {
        this.requestCount++;
        const keyword = query.word;
        if (!keyword) {
            const response = {
                success: false,
                message: `Error: Keyword is not given.`,
                requestCount: this.requestCount,
            };
            this.handleBadRequest(res, response);
            return;
        }
        const definition = this.dictController.findDefinition(keyword);
        if (definition) {
            const response = {
                success: true,
                message: definition,
                requestCount: this.requestCount,
            };
            this.handleSuccessfulRequest(res, response);
        } else {
            const response = {
                success: false,
                message: `Error: ${keyword} does not exist in dictionary.`,
                requestCount: this.requestCount,
            };
            this.handleNotFound(res, response);
            return;
        }
    }
    handlePostRequest(req, res) {
        this.requestCount++;
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        console.log(body);
        req.on("end", () => {
            try {
                if (!body) {
                    const response = {
                        success: false,
                        message: "Error: Empty request body.",
                        requestCount: this.requestCount,
                    };
                    this.handleBadRequest(res, response);
                    return;
                }
                const { word, definition } = JSON.parse(body);
                if (!word || !definition) {
                    const response = {
                        success: false,
                        message:
                            "Error: Invalid JSON format. Both word and definition are required.",
                        requestCount: this.requestCount,
                    };
                    this.handleBadRequest(res, response);
                    return;
                }
                const addResult = this.dictController.addDefinition(word, definition);
                if (!addResult) {
                    const response = {
                        success: true,
                        message: `Error: ${word} already exists in dictionary.`,
                        requestCount: this.requestCount,
                    };
                    this.handleConflict(res, response);
                    return;
                }

                const response = {
                    success: true,
                    message: `${word}: ${definition} | successfully recorded in dictionary.`,
                    requestCount: this.requestCount,
                };
                this.handleSuccessfulRequest(res, response);
                return;
            } catch (err) {
                const response = {
                    success: false,
                    message: `Error: Server error. Please try again.`,
                    requestCount: this.requestCount,
                };
                this.handleUnknownServerError(res, response);
                return;
            }
        });
    }
    addRequestCount(data) {
        if (!data.requestCount) {
            data.requestCount = this.requestCount;
        }
    }
    handleMethodNotAllowed(res, data) {
        this.addRequestCount(data);
        this.handleResponse(res, 405, data);
    }

    handleBadRequest(res, data) {
        this.addRequestCount(data);
        this.handleResponse(res, 400, data);
    }
    handleSuccessfulRequest(res, data) {
        this.addRequestCount(data);
        this.handleResponse(res, 200, data);
    }
    handleNotFound(res, data) {
        this.addRequestCount(data);
        this.handleResponse(res, 404, data);
    }
    handleConflict(res, data) {
        this.addRequestCount(data);
        this.handleResponse(res, 409, data);
    }
    handleUnknownServerError(res, data) {
        this.addRequestCount(data);
        this.handleResponse(res, 500, data);
    }
    handleResponse(res, statusCode, data) {
        res.writeHead(statusCode, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(data));
    }
}

class Server {
    constructor() {
        this.dictController = new DictionaryController();
        this.requestHandler = new RequestHandler(this.dictController);
    }
    run() {
        const server = http.createServer(function (req, res) {
            const parsedUrl = url.parse(req.url, true);
            const pathName = parsedUrl.pathname;
            const query = parsedUrl.query;
            if (pathName.startsWith("/api/definition")) {
                if (req.method === "POST") {
                    this.requestHandler.handlePostRequest(req, res);
                } else if (req.method === "GET") {
                    this.requestHandler.handleGetRequest(req, res, query);
                } else {
                    const response = {
                        success: false,
                        message: `Error: Only GET and POST method are supported.`,
                    };
                    this.requestHandler.handleMethodNotAllowed(res, response);
                }
            } else {
                const response = {
                    success: false,
                    message: `Error: Wrong endpoint.`,
                };
                this.requestHandler.handleNotFound(res, response);
            }
        });
        server.listen(PORT);
    }
}

const server = new Server();
server.run();
