/* GET home page */
module.exports.index = function(req, res){
  res.render('index', { 
      title: 'Lab 4',
      ipsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in bibendum ex. Curabitur fringilla tellus eget sollicitudin molestie. Nam cursus est tortor, et pellentesque nisl tincidunt in. Nulla auctor tempus scelerisque. Phasellus convallis nec nisl vel faucibus. Donec ultrices nisl eu risus commodo ullamcorper. Suspendisse sollicitudin magna eget elementum tincidunt. Pellentesque viverra ligula sed varius placerat. Mauris porta urna quis arcu suscipit, ut ornare urna bibendum. Phasellus eu pretium nisl, et finibus risus. Morbi porta vestibulum tortor, sed volutpat tellus lacinia in. Duis convallis, odio ac convallis bibendum, dolor nisi efficitur sapien, quis viverra massa augue ac mi. Nulla facilisi. Sed ultrices tincidunt est, sit amet congue ligula iaculis sed.'
  });
};