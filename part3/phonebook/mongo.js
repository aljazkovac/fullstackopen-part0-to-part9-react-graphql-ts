const mongoose = require('mongoose')


const password = process.argv[2]

const url = `mongodb+srv://aljaz:${password}@cluster0.l8aozni.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const entrySchema = new mongoose.Schema({
  name: [String],
  number: Number,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length > 3 && process.argv.length < 5) {
    console.log("Please provide a phone number!")
}
if (process.argv.length >= 5) {
    mongoose
        .connect(url)
        .then((result) => {
        console.log('connected')
        const entry = new Entry({
            name : process.argv.slice(3, -1),
            number: process.argv.at(-1)
        })
        return entry.save()
        })
        .then(() => {
        console.log('Entry saved!')
        return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}
if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then(() => {
            Entry.find({}).then(result => {
            result.forEach(entry=> {
            console.log(entry)
            })
            mongoose.connection.close()
        })})
}