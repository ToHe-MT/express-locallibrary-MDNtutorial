const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
    imprint: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Maintenance",
    },
    due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_format").get(function () {
    if (this.due_back) {
        var currentMonth=('0'+(this.due_back.getMonth()+1)).slice(-2)
        var currentDate=('0'+(this.due_back.getDate())).slice(-2)
        return `${this.due_back.getFullYear()}-${currentMonth}-${currentDate}`
    }
    return "No Death Data"
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
