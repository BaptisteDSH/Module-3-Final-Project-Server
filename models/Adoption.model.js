const { Schema, model } = require("mongoose");

const adoptionSchema = new Schema(
  {
    datePosted: { type: Date, default: Date.now },
    description: { type: String, required: true, trim: true },
    pet: { name: { type: String, required: true } },
    pictures: { type: [String], required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const AdoptionModel = model("Adoption", adoptionSchema);

module.exports = AdoptionModel;
