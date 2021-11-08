const axios = require("axios");

async function brazilApiAddresses(cep) {
    try {
        const brazilApiAddress = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);

        return brazilApiAddress.data;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    brazilApiAddresses
}