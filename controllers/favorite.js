const db = require(`../models`);

// GET INDEX
const index = (req,res) => {
  db.Favorite.find({}, (error, allFavorites) => {
    if (error) return console.log(error);
    res.json({
      status: 200,
      count: allFavorites,
      dateRequested: new Date().toLocaleString(),
    });
  });
} 

// // populate
// app.get('/api/v1/user', (req, res) => {
//   db.User.find({})
//       .populate('Favorite')
//       .exec((error, allUsers) => {
//           if (error) return console.log(error);
//           res.json({
//               status: 200,
//               count: allUsers.length,
//               data: allUsers,
//               requestedAt: new Date().toLocaleString()
//           });
//       })
// });

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

const destroy = (req,res) => {g
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