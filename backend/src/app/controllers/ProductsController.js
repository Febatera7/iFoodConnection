const Products = require('../models/Products');

class ProductsController {
    async create(req, res) {
        try {
            const product = await Products.create({
                ...req.body,
                establishmentId: req.establishmentId
            });

            return res.status(201).json(product);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async read(req, res) {
        try {
            const product = await Products.find({ establishmentId: req.establishmentId });

            return res.status(200).json(product);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async update(req, res) {
        try {
            const { productId } = req.params;

            const product = await Products.findOne(
                { _id: productId, establishmentId: req.establishmentId }
            );

            if (!product) {
                return res.status(400).json({ message: "Produto não encontrado." });
            }

            await Products.findOneAndUpdate(
                { _id: productId, establishmentId: req.establishmentId },
                { $set: req.body },
            );

            return res.status(200).json({ message: "Produto atualizado com sucesso." })
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async delete(req, res) {
        try {
            const { productId } = req.params;

            const product = await Products.findOne(
                { _id: productId, establishmentId: req.establishmentId }
            );

            if (!product) {
                return res.status(400).json({ message: "Produto não encontrado." });
            }

            await Products.findOneAndDelete({ _id: productId, establishmentId: req.establishmentId });

            return res.status(200).json({ message: "Produto excluído com sucesso." })
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

module.exports = new ProductsController();
