const Crap = require("../models/crap.js");
const User = require("../models/user.js");


//get all aside ceu deja pris
const getAllCraps = async (req, res) => {
    try {
        const {query, lat, long, distance, show_taken } = req.query;
        let filter = { status: { $ne: "FLUSHED"}};
        if(show_taken === "true") delete filter.status;

        if(query){
            filter.$or = [
                {title: {$regex: query, $option: "i"}},
                {description: {$regex: query, $option: "i"}},
            ];
        }

        if (lat && long && distance){
            filter.location = {
                $near: {
                $geometry: {type: "Point", coordinates: [parseFloat(long), parseFloat(lat)]},
                $maxDistance: parseInt(distance),
                },
            };
        }

        const crapList = await Crap.find(filter)
            .populate("owner", "name")
            .select("-location -buyer -suggestion");
        
        res.json({data: crapList});
    }catch (erreur){
        res.status(500).json({erreur: "ERREUREE DANS LE SERVEUR"});
    }

};

//get un aek id
const getCrapById = async (req, res) =>{
    try{
        const crap = await Crap.findById(req.params.id).populate("owner", "name").populate("buyer", "name");

        if(!crap) return res.status(404).json({erreur: "NON TROUVER!"});

        const isOwnerOrBuyer = req.user && (req.user.id === String(crap.owner._id)|| req.user.id === String(crap.buyer));

        if(!isOwnerOrBuyer){
            crap.suggestion = undefined;
            crap.buyer = undefined;
            crap.location = undefined;
        }

        res.json({ data: crap});
    }catch (erreur) {
        res.status(500).json({erreur: "ERREUREE DANS LE SERVEUR"});
    }
};

//cree un
const createCrap = async (req, res) => {
    try{
        const newCrap = new Crap({...req.body, owner: req.user.id});
        await newCrap.save();
        res.status(201).json({data: newCrap});
    }catch(erreur){
        res.status(400).json({erreur: erreur.message});
    }
};

const getMyCrap = async (req, res) =>{
    try{
        const myCrap = await Crap.find({
            $or: [{owner: req.user.id}, {buyer: req.user.id}],
        }).populate("owner","name");

        res.json({data: myCrap});
    }catch(erreur){
        res.status(500).json({erreur: "ERREEUR DANS LE SERVEUR"});
    }
};

//mi a jur 1 seulmn (proprietrr)
const updateCrap = async (req, res) => {
    try{
        let crap = await Crap.findById(req.params.id);
        if(!crap) return res.status(404).json({erreur: "NON TROUVER"});

        if(!crap.owner.toString() !== req.user.id){
            return res.status(403).json({erreur: "I FORBID !!!"});
        }
        crap = await Crap.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({data: crap });
    }catch(erreur){
        res.status(400).json({erreur: erreur.message})
    }
};

//retir 1 (proprietrr)
const deleteCrap = async (req, res) => {
    try {
        const crap = await Crap.findById(req.params.id);
        if(!crap) return res.status(404).json({erreur: "CRAP NON TROUVER"});

        if(crap.owner.toString() !== req.user.id){
            return res.status(403).json({erreur: "I FORBID !!!"})
        }

        await crap.remove();
        res.json({data: "EFFACER"})
    }catch(erreur){
        res.status(500).json({erreur: "ERREUREE DANS LE SERVEUR"})
    }
}

const markInterested = async (req, res) => {
    try{
        const crap = await Crap.findById(req.params.id);
        if (!crap) return res.status(404).json({erreur: "CRAP NON TROUVER"});

        if(crap.status !== "AVAILABLE"){
            return res.status(400).json({erreur: "CRAP NON DISPONIBLE"});
        }

        crap.status = "INTERESTED";
        crap.buyer = req.user.id;
        await crap.save();

        res.json({data: crap});
    }   catch(erreur){
        res.status(500).json({erreur: "ERREUREE DANS LE SERVEUR"});
    }
};

const suggestPickup = async (req, res) =>{
    try{
        const {address, date, time } = req.body;
        const crap = await Crap.findById(req.params.id);

        if(!crap) return res.status(404).json({erreur: "CRAP NON TROUVER"});
        if(crap.status !== "INTERESTED") return res.status(400).json({erreur: "not INTERESTED"})
        if(crap.owner.toString() !== req.user.id) return res.status(403).json({erreur: "I FORBID !!!"})

        crap.status = "SCHEDULED";
        crap.suggestion = {address, date, time};
        await crap.save();

        res.json({data: crap});
    }   catch(erreur){
        res.status(500).json({erreur: "ERREUREE DANS LE SERVEUR"});
    }
};

const agreeToPickup = async (req, res)=>{
    try{
        const crap = await Crap.findById(req.params.id);
        if(!crap) return res.status(404).json({erreur: "CRAP NON TROUVER"});
        if(crap.status !== "SCHEDULED") return res.status(400).json({erreur: "not SCHEDULED"});
        if(crap.buyer.toString() !== req.user.id) return res.status(403).json({erreur: "I FORBIT !!!"});

        crap.status = "AGREED";
        await crap.save();

        res.json({data: crap});
    }catch (erreur){
        res.status(500).json({erreur: "ERREUREE DANS LE SERVEUR"});
    }
};

const disagreeToPickup = async (req, res) => {
    try{
        const crap = await Crap.findById(req.params.id);
        if(!crap) return res.status(404).json({erreur: "CRAP NON TROUVER"});
        if(crap.status !== "SCHEDULED") return res.status(400).json({erreur: "NOT SCHEDUlED"});
        if(crap.buyer.toString() !== req.user.id) return res.status(403).json({erreur: "I FORBID !!!"});

        crap.status = "INTERESTED";
        crap.suggestion = null;
        await crap.save();

        res.json({data: crap});
    }catch(erreur){
        res.status(500).json({erreur: "ERREURREE DANS LE SERVEUR"});
    }
};

const resetCrapFlow = async (req, res) => {
    try{
        const crap = await Crap.findById(req.params.id);
        if(!crap) return res.status(404).json({erreur: "CRAP NON TROUVER"});
        if(crap.status !== "FLUSHED") return res.status(400).json({erreur: "DEJA FLUSHEDD"});
        if(crap.buyer.toString() !== req.user.id) return res.status(403).json({erreur: "I FORBID !!!"});

        crap.status = "AVAILABLE";
        crap.suggestion = null;
        await crap.save();

        res.json({data: crap});
    }catch(erreur){
        res.status(500).json({erreur: "ERREURREE DANS LE SERVEUR"});
    }
};

const flushCrap = async (req, res) => {
    try {
      const crap = await Crap.findById(req.params.id);
      if (!crap) return res.status(404).json({ error: "CRAP NON TROUVER" });
      if (crap.status !== "AGREED") return res.status(400).json({ error: "CRAP NON ACCEPTER" });
      if (crap.owner.toString() !== req.user.id) return res.status(403).json({ error: "Only owner can flush" });
  
      crap.status = "FLUSHED";
      await crap.save();
  
      res.json({ data: crap });
    } catch (erreur) {
      res.status(500).json({ error: "ERREURREE DANS LE SERVEUR" });
    }
  };


module.exports = {
    getAllCraps,
    getMyCrap,
    getCrapById,
    createCrap,
    updateCrap,
    deleteCrap,
    markInterested,
    suggestPickup,
    agreeToPickup,
    disagreeToPickup,
    resetCrapFlow,
    flushCrap
  };

//je cache les info sensibl comme buyer, locati, sugges, if user is not
//si thing dont marche retour erreur pour toute
//buyer want status to INTER - assigns buyer
//seller suges pick ststus to SCHE - set date+tim
//buyer aggre stusts to AGGRE - confir pickup
//buyer disagre status ststus INTERE  - rm suggestion
//seler flushe sttus FLUSHED - mark as gon