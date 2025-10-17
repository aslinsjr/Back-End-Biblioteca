const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    id: {type: Number, required: true, min: 1},
    titulo: {type: String, required: true, minlength: 3, maxlength: 100},
    autor: {type: String, maxlength: 200},
    valor: {type: Number, required: true, min: 0}
});

module.exports = mongoose.model("livros", produtoSchema);
