function respons (res, raw){
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(raw, null, 2))
}
module.exports = respons;