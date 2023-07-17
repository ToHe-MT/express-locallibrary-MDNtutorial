const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
    // To avoid errors in cases where an author does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});
AuthorSchema.virtual("birth_date").get(function () {
    if (this.date_of_birth) {
        var currentMonth=('0'+(this.date_of_birth.getMonth()+1)).slice(-2)
        var currentDate=('0'+(this.date_of_birth.getDate())).slice(-2)
        return `${this.date_of_birth.getFullYear()}-${currentMonth}-${currentDate}`
    }
    return "No Birth Data"
});
AuthorSchema.virtual("death_date").get(function () {
    if (this.date_of_death) {
        var currentMonth=('0'+(this.date_of_death.getMonth()+1)).slice(-2)
        var currentDate=('0'+(this.date_of_death.getDate())).slice(-2)
        return `${this.date_of_death.getFullYear()}-${currentMonth}-${currentDate}`
    }
    return "No Death Data"
});

AuthorSchema.virtual("lifespan").get(function () {
    if (this.date_of_death && this.date_of_birth) {
        return `${this.date_of_death.getFullYear() - this.date_of_birth.getFullYear()}`;
    }
    return
})



// Export model
module.exports = mongoose.model("Author", AuthorSchema);
