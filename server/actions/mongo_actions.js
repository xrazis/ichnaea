const mongoose = require('mongoose');
const faker = require('faker');
const Athlete = mongoose.model('Athlete');

saveAthlete = async (mac, socketID) => {
    const newAthlete = new Athlete({
        id: mac,
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