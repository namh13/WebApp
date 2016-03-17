var fs = require('fs-extra');
var path = require('path');
var Resource = require('../datasets/resources');
var User = require('../datasets/users');

module.exports.postResource = function(req,res){
    var file = req.files.file;
    var userId = req.body.userId;

    console.log("User " + userId + " is submitting ", file);
    var uploadDate = new Date(); //.toISOString;
    uploadDate = uploadDate.toString;

    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/" + userId + uploadDate + file.name);
    var savePath = "/uploads/" + userId + uploadDate + file.name;
 
    fs.rename(tempPath, targetPath, function(err){
        if(err){
            console.log(err)
        } else{
            //console.log("file moved");
            User.findById(userId, function(err, userData){
                var user = userData;
                var resource = new Resource();
                resource.user = user.username || user.email;
                resource.userId = user._id;
                resource.userImage = user.image;
                resource.video = savePath;
                resource.save(function(err){
                    if(err){
                        console.log("failed to save");
                        res.json({status: 500})
                    } else{
                        console.log("save successful");
                        res.json({status: 200})
                    }
                })
            })
        }
    })
}; 

module.exports.getResource = function(req, res){
    Resource.find({})
        .sort({date: -1})
        .exec(function(err, allResources){
            if(err){
                res.error(err)
            }else{
                res.json(allResources);
                console.log(allResources)
            }
        })
}