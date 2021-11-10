const Products = require('../models/Products');
const Establishment = require('../models/Establishment');

class ProductsController {
    async create(req, res) {
        try {
            const {
                plate,
                description,
                type,
                price,
            } = req.body;

            const establishment = await Establishment.findOne({
                where: { t_ifd_rest_cd_resp: req.user }
            });

            if (!establishment) {
                return res.status(400).json({ message: 'Establishment not found' });
            }

            let randomNumericProductmentId = Math.floor(Math.random() * 999999999);

            const findEqualProductIdOnDB = await Products.findOne({
                where: {
                    cd_alimento: randomNumericProductmentId
                }
            });

            if (findEqualProductIdOnDB) {
                randomNumericProductmentId = Math.floor(Math.random() * 999999999);
            }

            const product = await Products.create({
                cd_alimento: randomNumericProductmentId,
                nm_alimento: plate,
                ds_alimento: description,
                ds_tipo: type,
                vl_alimento: price,
                t_ifd_rest_cd_rest: establishment.cd_rest,
            });

            if (!product) {
                return res.status(400).json({ message: 'Fail to create product' });
            }

            return res.status(201).json({
                message: 'Created product',
                product,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Error",
                err
            });
        }
    }

    async read(req, res) {
        try {

            const establishment = await Establishment.findOne({
                where: { t_ifd_rest_cd_resp: req.user }
            });

            if (!establishment) {
                return res.status(400).json({ message: 'Establishment not found' });
            }

            const products = await Products.findAll({
                where: { t_ifd_rest_cd_rest: establishment.cd_rest },
                order: ['id'],
            });

            return res.status(200).json(products);
        } catch (err) {
            return res.status(400).json({
                message: "Error",
                err
            });
        }
    }

    async update(req, res) {
        try {
            const { productId } = req.params;
            const {
                plate,
                description,
                type,
                price,
            } = req.body;

            const product = await Products.findOne({
                where: {
                    cd_alimento: productId,
                },
            });

            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }

            await product.update({
                nm_alimento: plate,
                ds_alimento: description,
                ds_tipo: type,
                vl_alimento: price,
            });

            return res.status(200).json({
                message: "Updated product",
                product
            })
        } catch (err) {
            return res.status(400).json({
                message: "Error",
                err
            });
        }
    }

    async delete(req, res) {
        try {
            const { productId } = req.params;

            const product = await Products.findOne({
                where: {
                    cd_alimento: productId,
                },
            });

            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }

            await product.destroy();

            return res.status(200).json({ message: "Deleted product" })
        } catch (err) {
            return res.status(400).json({
                message: "Error",
                err
            });
        }
    }
}

module.exports = new ProductsController();
