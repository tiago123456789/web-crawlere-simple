const express = require("express");
const requestClient = require("request");
const cheerio = require("cheerio");

const route = express.Router();

module.exports = (() => {

    route.post("/", (request, response) => {
        let { search } = request.body;

        if (!search) {
            return response.redirect("/");
        }

        search = search.replace(/\s/g, "+");
        const engineSearch = `https://www.google.com.br/search?q=${search}`;
        let resultsSearch = [];
        requestClient(engineSearch, (err, responseRequest, body) => {
            if (err || responseRequest.statusCode !== 200) {
                return response.redirect("/");
            }
            
            const $ = cheerio.load(body);
            $(".r").each(function(index, element) {
                const title = $(this).text();
                let link = $(this).find("a").attr("href");
                link = `https://www.google.com/${link}`;
                resultsSearch.push({ title , link })
            });
            response.render("index.ejs", { resultsSearch: resultsSearch });
        });
    });

    route.get("/", (request, response) => {
        response.render("index.ejs", { resultsSearch: null });
    });

    return route;
})();