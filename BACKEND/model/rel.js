const Usuario = require('./Usuario')
const Compra = require('./Compra')
const Produto = require('./Produto')

Usuario.hasMany(Compra, {
    foreignKey: 'cod_usuario',
    as: 'compraUsuario',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Usuario, {
    foreignKey: 'cod_usuario',
    as: 'usuarioCompra',
    allowNull: false
})

Produto.hasMany(Compra, {
    foreignKey: 'cod_produto',
    as: 'compraProduto',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Produto, {
    foreignKey: 'cod_produto',
    as: 'produtoCompra',
    allowNull: false
})

module.exports = { Usuario, Produto, Compra }