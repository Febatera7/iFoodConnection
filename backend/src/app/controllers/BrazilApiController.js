const brazilApi = require("../services/brazilApi");

class BrazilApiController {
    async addresses(req, res) {
        try {
            const { cep } = req.body;

            const address = await brazilApi.brazilApiAddresses(cep);

            return res.status(200).send(address);
        } catch(err) {
            return res.status(400).send(err);
        }
    }
}

module.exports = new BrazilApiController();
