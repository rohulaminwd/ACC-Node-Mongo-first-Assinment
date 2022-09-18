
const fs = require('fs');

let userData = []

fs.readFile("./data.json", (err, data) => {
    if(data){
        userData = JSON.parse(data);
    }else{
        console.log(`An Error has ocurred : ${err.message}`)
    }
});

// A random user.
module.exports.getRandomUser = (req, res) => {
    const random = Math.floor(Math.random() * userData.length)
    res.send(userData[random]);
}

// A list of random user.
module.exports.getAllUsers = (req, res) => {
    const limit = parseInt(req.query.limit);
    if(limit){
        res.send(userData.slice(0, limit));
    }else{
        res.send(userData);
    }
    
}

// Save a random user.
module.exports.saveUser = async (req, res) => {
    const data = req.body;
    if(data){
        userData.push(data);
        await fs.writeFileSync("./data.json", JSON.stringify(userData));
        res.send("Create a users");
    }else{
        res.send("User Data Missing"); 
    }
}

// Update a Ransom user.
module.exports.updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {gender, name, contact, address, photoUrl} = req.body;
    if(id){
        const existUser = userData.find(i => i?.id === id);
        existUser.gender = gender? gender : existUser.gender;
        existUser.contact = contact? contact : existUser.contact;
        existUser.name = name? name : existUser.name;
        existUser.address = address? address : existUser.address;
        existUser.photoUrl = photoUrl? photoUrl : existUser.photoUrl;
        await fs.writeFileSync("./data.json", JSON.stringify(userData));
        res.send("Update a user");
    }else{
        res.send("Id is missing");
    }
}

// Update multiple Random users.
module.exports.manyUpdateUser = async (req, res) => {
    const data = req.body;
    if(data){
        data.map(user => {
            const existUser = userData.find(i => i?.id === parseInt(user.id)); 
            existUser.gender = user?.gender? user?.gender : existUser.gender;
            existUser.contact = user?.contact? user?.contact : existUser.contact;
            existUser.name = user?.name? user?.name : existUser.name;
            existUser.address = user?.address? user?.address : existUser.address;
            existUser.photoUrl = user?.photoUrl? user?.photoUrl : existUser.photoUrl;
        })
        await fs.writeFileSync("./data.json", JSON.stringify(userData));
        res.send("Update Multiple users");
    }else{
        res.send("data is missing");
    }
}

// Delete a random user.
module.exports.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    if(id){
        const data = userData.filter(i => i?.id !== id);
        await fs.writeFileSync("./data.json", JSON.stringify(data));
        res.send("Delete a users Succesfuly");
    }else{
        res.send("Id is missing");
    }
}