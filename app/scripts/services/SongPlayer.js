(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

  // stores album information to be accessed by the SongPlayer service
    var currentAlbum = Fixtures.getAlbum();

    var currentBuzzObject = null;

    /* @function setSong
       @desc Stops currently playing song and loads new audio file as currentBuzzObject
       @param {Object} song */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }


      /* @desc Buzz object audio file
         @type {Object} */
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
             //auto play next song
             if (currentBuzzObject.isEnded()) {
                SongPlayer.next();
            }
         });
     });

      SongPlayer.currentSong = song;
    };

    /* @function playSong
       @desc plays song and sets song.playing to true so album.html changes play/pause icon
       @param {Object} song */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    /* @function pauseSong
       @desc pauses song at its current point
       @param {Object} song */
    var pauseSong = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    /* @function stopSong
       @desc stops and clears the currently playing song */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /* @function getSongIndex
      @desc returns index of song from currentAlbum
      @param {Object} song */
    var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
    };

    SongPlayer.currentSong = null;

    /*
    @desc Current playback time (in seconds) of currently playing song
     @type {Number} */
    SongPlayer.currentTime = null;

    /* @desc Current song volume with a value between 0 and 100
      @type {Number} */
    SongPlayer.volume = 75;

    /* @function SongPlayer.play(song)
       @desc resume playback of a paused song or otherwise start playback from the beginning. sets song.playing to true
       @params {Object} song */
    SongPlayer.play = function(song) {
     song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
        song.playing = true;
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
            playSong(song);
        }
      }
    };

    /* @function SongPlayer.pause(song)
       @desc pauses playback at the current time elapsed. sets song.playing to false
       @param song */
    SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
      pauseSong(song);
      song.playing = false;
    };

    /* @function Songplayer.previous
       @desc starts playback of the previous song on album. if current song is the first on the album, pressing previous stops playback */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /* @function SongPlayer.next
       @desc skip to the next song on the album. if current song is the last on the album, pressing next stops playback. */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > Object.keys(currentAlbum).length) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /*  @function setCurrentTime
      @desc Set current time (in seconds) of currently playing song
      @param {Number} time */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
          SongPlayer.volume = volume;
        };

    SongPlayer.toggleMute = function () {
    	 if (SongPlayer.volume === 0) {
    			SongPlayer.muted = false;
    			SongPlayer.setVolume(SongPlayer.prevVolume);
    	 } else {
    			SongPlayer.prevVolume = SongPlayer.volume;
    			SongPlayer.muted = true;
    			SongPlayer.setVolume(0);
    		}
    }

    return SongPlayer;
  }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
