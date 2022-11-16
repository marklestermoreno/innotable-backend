
const db = require("../models");
const Notes = db.notes;
const Op = db.sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "Notes cannot be empty"
        })
        return;
    }

    const notes = {
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId,
        passwordProtected: req.body.passwordProtected ? req.body.passwordProtected : false,
        password: req.body.password,
    };

    Notes.create(notes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the notes"
            })
        })
}

exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Notes.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving notes"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Notes.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(400).send({
                    message: `Cannot find note with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving note with id=" + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id;
    Notes.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Note has been updated successfully"
                })
            }
            else {
                res.send({
                    message: `Cannot update note with id=${id}. Maybe note was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating note with id=" + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Notes.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Note has been deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete note with id=${id}. Maybe note was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete note with id=" + id
            });
        });
};

exports.findAllPasswordProtected = (req, res) => {
    Notes.findAll({ where: { passwordProtected: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving notes"
            })
        })
}