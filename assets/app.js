$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBjDeq8y9qIOwqjCbPsRhNluUKswD1MADE",
    authDomain: "train-moment-api.firebaseapp.com",
    databaseURL: "https://train-moment-api.firebaseio.com",
    projectId: "train-moment-api",
    storageBucket: "",
    messagingSenderId: "463851362909"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();
  var trainName = "";
  var destination = "";
  var trainTime = "";
  var trainFreq = 0;

  $("#submit-button").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name-input")
      .val()
      .trim();
    destination = $("#destination-input")
      .val()
      .trim();
    trainTime = $("#first-time-input")
      .val()
      .trim();
    trainFreq = $("#frequency-input")
      .val()
      .trim();
    // Code for the push
    dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      trainFreq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    
// // Assumptions
// var frequency = 3;

// // First train of the day is at 3:30 AM
// var firstTime = moment("03:30", 'HH:mm');

// // Get the current time
// var currentTime = moment();

// // Create a variable to store the next train time
// var nextTrain;

// // If the first time is in the future, set next train to then
// if (firstTime > currentTime) {
//   nextTrain = firstTime;
// } else {
//   // Otherwise, get minutes past first time
//   var minutesPast = currentTime.diff(firstTime, 'minutes');
//   // Find the result of minutesPast % frequency
//   var remainder = minutesPast % frequency;
//   // Subtract the remainder from the frequency
//   var minutesTilNextTrain = frequency - remainder;
//   // Set nextTrain to the currentTime + `minutesTilNextTrain` minutes
//   nextTrain = currentTime.add(minutesTilNextTrain, 'minutes');
// }

// // Print and format the new train time
// console.log('Next Train Arrival Time:', nextTrain.format('hh:mm A')});
