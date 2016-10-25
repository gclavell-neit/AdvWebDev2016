/* GET About page */
module.exports.about = function(req, res){
  res.render('about', {
      title : "About",
      ipsum : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in bibendum ex. Curabitur fringilla tellus eget sollicitudin molestie. Nam cursus est tortor, et pellentesque nisl tincidunt in. Nulla auctor tempus scelerisque. Phasellus convallis nec nisl vel faucibus."
    });
};