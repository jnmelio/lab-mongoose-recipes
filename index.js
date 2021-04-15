const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(
      {
        // TODO: write the schema
        title: "Kimchi Pancakes",
        level: "Easy Peasy",
        ingredients: ["kimchi", "flour", "scallions", "sugar","water","vegetable oil"],
        cuisine: "Korean",
        dishType: "other",
        image: "https://www.koreanbapsang.com/wp-content/uploads/2010/02/DSC0780-2.jpg",
        duration: 15,
        creator: "Chief Maria and Chief Julie",
      }
    )

  })
  .then((singleTitle) =>{
    console.log(singleTitle.title)
    return Recipe.insertMany(data)
  })
  .then((allRecipes)=>{
  allRecipes.forEach(recipe => {
    console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title :  "Rigatoni alla Genovese"}, {duration:100})
  })
  .then(()=>{
    console.log('Yay duration is done')
    return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then(()=>{
    console.log('The carrot cake is dead! Long live the carrot cake!!')
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 

