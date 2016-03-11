var Waste = require('../datasets/wastes');

module.exports.postWaste = function(req,res){
    var waste = new Waste(req.body);
    waste.save();
    
    Waste.find({})
        .sort({date: -1}).exec(function(err, allWastes){
        if(err){
            res.error(err);
        }else{
            res.json(allWastes);
        }
    });
}

module.exports.getWastes = function(req, res) {
    console.log(req.body);// new line
    if (!req.body.following) {//new line
        Waste.find({})
            .sort({date: -1})
            .exec(function (err, allWastes) {
                if (err) {
                    res.error(err)
                } else {
                    res.json(allWastes);
                }
            })
    }

//new lines
else {
        var requestedWastes = [];
        for (var i = 0, len = req.body.following.length; i < len; i++) {
            requestedWastes.push({userId: req.body.following[i].userId});
        }
        Waste.find({$or: requestedWastes})
            .sort({date: -1})
            .exec(function (err, allWastes) {
                if (err) {
                    res.error(err)
                } else {
                    res.json(allWastes);
                }
            })
    };
}