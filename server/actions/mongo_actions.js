const mongoose = require('mongoose');
const faker = require('faker');
const Athlete = mongoose.model('Athlete');

saveAthlete = async (id, socketID) => {
    const newAthlete = new Athlete({
        id: id,
        socketID: socketID,
        name: faker.name.findName(),
    })

    try {
        await newAthlete.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {saveAthlete};