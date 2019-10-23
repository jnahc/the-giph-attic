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


const create = (req,res) => 
// {
//   console.log(`creating fav req`,req)
//   db.Favorite.findOne({ giphId:req.body.giphId }, (error, foundFavorite) => {
//     if (error) return res.status(500).json({
//       status: 500,
//       error: [{ message: 'Something went wrong, please try again...'}],
//   });
//     if (foundFavorite) {
//       return res.status(400).json({
//       status: 400,
//       error: [{ message: 'Invalid request, please try again...'}],
//   });
// } else 
      {
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
    // })
// }

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