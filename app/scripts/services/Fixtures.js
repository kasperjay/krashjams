(function() {
     function Fixtures() {
         var Fixtures = {};

         var albumTerry = {
             title: 'Red Handed EP',
             artist: 'Myke Terry',
             label: 'Break Entertainment',
             year: '2015',
             albumArtUrl: '/assets/images/album_covers/001.png',
             songs: [
                 { title: 'Whatcha Think About That', duration: '3:33', audioUrl: '/assets/music/whatcha-think' },
                 { title: 'Underage', duration: '3:25', audioUrl: '/assets/music/underage' },
                 { title: 'Slide', duration: '3:19', audioUrl: '/assets/music/slide' },
                 { title: 'F\'d Up Girl Across the Street', duration: '3:10', audioUrl: '/assets/music/fd-up-girl' },
                 { title: 'Red Handed', duration: '4:23', audioUrl: '/assets/music/red-handed' },
                 { title: 'Just Distance', duration: '2:53', audioUrl: '/assets/music/just-distance' },
                 { title: 'Come As You Are', duration: '2:24', audioUrl: '/assets/music/come' },
             ]
         };

         Fixtures.getAlbum = function() {
           return albumTerry;
         };

         Fixtures.getCollection = function(numberOfAlbums) {
           var albumCollection = [];
           for (var i=0; i < numberOfAlbums; i++) {
              albumCollection.push(angular.copy(albumTerry));
            }
            return albumCollection;
          };

         return Fixtures;
     }

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
