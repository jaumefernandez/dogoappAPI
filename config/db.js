const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://dogo:dogo1234@cluster0.pobsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;