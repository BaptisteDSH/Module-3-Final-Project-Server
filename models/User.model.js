const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
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
    age: {
      type: Number,
    },
    description: {
      type: String,
    },
    picture: {
      type: String,
      default: "http://surl.li/yamehb",
    },
    phone: {
      type: Number,
    },
    // Updated pet field to support multiple pets
    pet: [
      {
        petType: {
          type: String,

          enum: [
            "dog",
            "cat",
            "bird",
            "snake",
            "spider",
            "hamster",
            "ferret",
            "fish",
            "guinea pigs",
          ],
        },
        petName: {
          type: String,
        },
        petDescription: {
          type: String,
        },
        petPicture: {
          type: String,
          default:
            "https://st3.depositphotos.com/2850099/15302/v/450/depositphotos_153029080-stock-illustration-vector-silhouette-of-dog.jpg",
        },
      },
    ],
    //this will be an objectId
    userEvents: { type: String },
    userAdoption: { type: String },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
