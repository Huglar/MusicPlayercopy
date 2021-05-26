/* const variables with '.querySelector' as a method which has a class
'.music container' in the string '' as a parameter
for containter(classes) with '.', for buttons(id) with '#' */
const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
/*for audio tag, see below*/
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
/*#title for song`s titles and #cover for song`s images*/
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles, songs in array should match the names of songs in a folder
const songs = ['hey', 'summer', 'ukulele']

//Keep track of songs, we set Ukulele to default as 3d(2) element in array
let songIndex = 2

//Initially load song into DOM (Document Object Model)
/*we call fucntion loadSong
with songs array(with whatever songIndex inside) as argument*/
loadSong(songs[songIndex])

// Update song details
/*we create function loadSong with parameter 'song',
in the code block of function {} we update title, actual audio source and img source
we set title tag to song, we use backticks `` for value of audio tag
inside of `` we have template literal ${} for a song
we set audio and img tags to our folders where songs/images are*/
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}
// pauseSong and playSong functions
/*we are gonna add play class, so we take musicContainer and classList and add(using
add() method) a 'play' class*/
 function playSong() {
  musicContainer.classList.add('play')
  /*to change the icon we use querySelector() method and choose 'i' tag with the class 'fas'
  and remove a class of 'play' because it is playing now. We add class 'fa-pause'
  add() method returns the first element that matches the specified selectors. */
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  /*'audio' tag has its own methods(API).
  To play a song we add 'audio' tag and 'play()' method*/
  audio.play()
 }
 /*for the function below we do opposite as for function above because we
 want to see an icon 'fa-play' displayed on the screen when song is paused*/
 function pauseSong() {
   musicContainer.classList.remove('play')
   playBtn.querySelector('i.fas').classList.add('fa-play')
   playBtn.querySelector('i.fas').classList.remove('fa-pause')
   /*To pause a song we add 'audio' tag and 'pause()' method*/
   audio.pause()
 }

 function prevSong() {
   /*to choose prev song we need to decrease songIndex by 1 using '--' operator*/
   songIndex--
   /*we want to check if songIndex is less than 0 because if it is we want it
   to loop to the beginning
   if we click prev btn having there the first song we want to go to the end song*/
   if(songIndex < 0) {
     /*if it is less than 0, we go to last song, which has 2nd position
     we use 'songs' array counting the songs by length method and substract 1
     total 2 which means 3d element in the array, 3d song, because we start from 0 in array
     length counts how many elements are in the array or string*/
     songIndex = songs.length - 1
   }
   /*load the Song, then we pass in songs with songIndex
   which is goona be 1 less than whatever song were on. Then we wanna play the song*/
   loadSong(songs[songIndex])

   playSong()
 }

 function nextSong() {
   /*to choose next song we need to increase songIndex by 1 using '++' operator*/
   songIndex++

   if(songIndex > songs.length - 1) {
    /*if songIndex is more than 2( >songs.length - 1) so we are at the end and
    we go to the first element or first song with number 0 as below*/
     songIndex = 0
   }

   loadSong(songs[songIndex])

   playSong()
 }

 function updateProgress(e) {
   /*this function takes an event object 'e' as an argument
   on this object we can get the duration and the current time
   we make a variable and assign to it:
   e. which is on source element
   and deconstruct two values 'duration' and 'current time' into curly braces {}*/
   const { duration, currentTime } = e.srcElement
   /*in the variable progressPercent we made a math:
   time is divided by duration and multiplied by 100 to give us decimal*/
   const progressPercent = (currentTime / duration) * 100
   /*To set width of progress to whatever this percent progress is,
   we take progress and set .style.width and set it equal to progressPercent*/
   progress.style.width = `${progressPercent}%`
 }

 function setProgress(e) {
   /*we pass event object 'e' as a parameter of function
   and set width to this.clientWidth*/
   const width = this.clientWidth
   /*we create const clickX and assign 'e' which we can get from offsetX
   it will show exactly where you are clicking on progress bar*/
   const clickX = e.offsetX
   /*To get complete duration, we create const variable and assign it to
   audio element with duration*/
   const duration = audio.duration
   /*we can set the current time and put it where we want
   for this purpose we create audio.currentTime which is assigned to
   clickX(it is a place whereever we click on X-axis on bar) which we devide by
   width and myltiply by duration
   it should set current time to place, which we click on on the progress bar
   we click on progress bar and we can go to any part of song on progress bar*/
   audio.currentTime = (clickX / width) * duration


 }

//Event listeners
/*for play btn we add .addEventListener method (in which first parameter is
a type of event and second is a function which is called after event was fulfilled)
because we want to listen on the 'click', when it is gonna happen we
run the function, thats gonna decide wheather we are gonna play or pause.
we add isPlaying variable and want to see if classList contains a class of 'play'
then we know it is playing*/
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  /*if (isPlaying) we want to pause the song, we call function 'pauseSong()'
  else we want to play song, so we call 'playSong()' function*/
  if(isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

  //Change song events
  // calling prevSong and nextSong functions
  prevBtn.addEventListener('click', prevSong)
  nextBtn.addEventListener('click', nextSong)
  //progress line on the progress bar
  /*Add eventListener to audio and with HTML5 audio tag with the API
  there is an event called time update, which will be constantly called
  when song is playing
  We call a function called updateProgress*/
  audio.addEventListener('timeupdate', updateProgress)
  /*To click on the progress bar and go to that point of the song,
  we add EventListener to progressContainer, with a 'click' and setProgress parameters
  if we are gonna click on progress container, it will call setProgress function */
  progressContainer.addEventListener('click', setProgress)
  /*To make the song playing one by one we create audio API with addEventListener
  we can listen for 'ended' and when song ends it will call nextSong function*/
  audio.addEventListener('ended', nextSong)
