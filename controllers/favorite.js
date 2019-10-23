const db = require(`../models`);

// GET INDEX
const index = (req,res) => {
  db.Favorite.find({ userId: req.params.userId }, (error, allFavorites) => {
    console.log(allFavorites);
    if (error) return console.log(error);
    res.json({
      status: 200,
      count: allFavorites.length,
      dateRequested: new Date().toLocaleString(),
      data: allFavorites,
    });
  });
} 



// POST FAVORITE ROUTE

const create = (req,res) => {
  db.Favorite.create(req.body, (error, newFavorite) => {
    if (error) return console.log(error);
    res.json({
      status: 201,
      count: 1,
      data: newFavorite,
      dateRequested: new Date().toLocaleString(),
    });
  });
}

const destroy = (req,res) => {
  db.Favorite.findByIdAndDelete(req.params.giphId, (error, deletedGiph) => {
    if (error) return console.log(error);
    res.json({
      status: 200,
      count: 1,
      data: deletedGiph,
      dateRequested: new Date().toLocaleString()
    })
  })
}

module.exports = {
  index,
  create,
  destroy
}