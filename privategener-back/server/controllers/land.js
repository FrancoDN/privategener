const Land = require('../models/Land.js')

exports.postLand = async(req, res) => {
    const landData = new Land({
        ...req.body
    })

    landData.save((err, land) => {
        if (err) {
            res.status(400).json({
                ok: false,
                msg: err,
            });
        }
        res.json({
            ok: true,
            donor: landData,
        })
    });
};

exports.getLands = async(req, res) => {

    try {
        const lands = await Land.find();
        res.status(200).json({
            ok: true,
            lands
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            msg: err
        });
    }
};

exports.getLandById = async(req, res) => {
    const idLand = req.params.id
    try {
        const results = await Land.findById(idLand).exec();
        res.status(200).json(
            results
        )
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
};

exports.updateLand = async(req, res) => {
    try {
        const updated = await Land.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            updated,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
};

exports.getLandsCount = async(req, res) => {
    try{
        const totalLands = await Land.countDocuments();

        res.json({
            totalLands
        })
    } catch(err){
        res.json({
            ok: false,
            msg: err
        })

    }
};

exports.deleteLand = async(req, res) => {
    const idLand = req.params.id
    console.log(idLand);
    try{
       const deleted = await Land.deleteOne({_id: idLand});
        res.status(200).json({
            msg: `La land con ID:${idLand} fue eliminada`,
            
        });
    }catch(err){
        res.status(400).json({
            error: err,
            msg:`La land con ID: ${idLand} no pudo ser eliminada`
        })
    }
};