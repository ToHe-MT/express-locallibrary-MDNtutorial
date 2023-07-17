const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({ // reference to the associated book
    name: { type: String, required: true, minLength: 3, maxLength: 100}, // reference to the associated book
});

// Virtual for GenreSchema's URL
GenreSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);
