const Donor = require('../models/Donor.js')

exports.postDonor = async(req, res) => {
    const donorData = new Donor({
        ...req.body
    })

    donorData.save((err, donor) => {
        if (err) {
            res.status(400).json({
                ok: false,
                msg: err,
            });
        }
        res.json({
            ok: true,
            donor: donorData,
        })
    });
};

exports.getDonors = async(req, res) => {

    try {
        const donors = await Donor.find();
        res.status(200).json({
            ok: true,
            donors
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            msg: err
        });
    }
};

exports.getDonorById = async(req, res) => {
    const idDonor = req.params.id
    try {
        const results = await Donor.findOne({uid: idDonor}).exec();
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

exports.updateDonor = async(req, res) => {
    try {
        const updated = await Donor.findByIdAndUpdate(req.params.id, req.body);
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

exports.getDonorsCount = async(req, res) => {
    try{
        const totalDonors = await Donor.countDocuments();

        res.json({
            totalDonors
        })
    } catch(err){
        res.json({
            ok: false,
            msg: err
        })

    }
};

exports.deleteDonor = async(req, res) => {
    const idDonor = req.params.id
    console.log(idDonor);
    try{
       const deleted = await Donor.deleteOne({_id: idDonor});
        res.status(200).json({
            msg: `El usuario ${idDonor} fue eliminado`,
            
        });
    }catch(err){
        res.status(400).json({
            error: err,
            msg:`El usuario ${idDonor} no pudo ser eliminado`
        })
    }
}