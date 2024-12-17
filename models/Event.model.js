const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: { type: String, required: [true, "Event title is required."] },
    location: {
      type: String,
      enum: [
        "Álava",
        "Albacete",
        "Alicante",
        "Almería",
        "Asturias",
        "Ávila",
        "Badajoz",
        "Barcelona",
        "Burgos",
        "Cáceres",
        "Cádiz",
        "Cantabria",
        "Castellón",
        "Ciudad Real",
        "Córdoba",
        "Cuenca",
        "Girona",
        "Granada",
        "Guadalajara",
        "Gipuzkoa",
        "Huelva",
        "Huesca",
        "Jaén",
        "La Coruña",
        "León",
        "Lleida",
        "Lugo",
        "Madrid",
        "Málaga",
        "Murcia",
        "Navarra",
        "Ourense",
        "Palencia",
        "Pontevedra",
        "Salamanca",
        "Segovia",
        "Sevilla",
        "Soria",
        "Tarragona",
        "Teruel",
        "Toledo",
        "Valencia",
        "Valladolid",
        "Vizcaya",
        "Zamora",
        "Zaragoza",
      ],
      required: [true, "Province is required"],
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Date is required"],
    },
    description: { type: String },
    pictures: { type: [String], default: ["https://shorturl.at/I39cR"] },
    price: { type: Number, default: 0 },
    organizerId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const EventModel = model("Event", eventSchema);

module.exports = EventModel;
