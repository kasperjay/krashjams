(function() {
  function LandingCtrl() {
    this.heroTitle = "Music is life";
    }

  angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);
})();
