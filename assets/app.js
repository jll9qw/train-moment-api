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
  var trainFreq = "";

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

    dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      trainFreq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    resetFields();
  });
  // reset function
  function resetFields() {
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  }

  dataRef.ref().on(
    "child_added",
    function(snapshot) {
      var nextTrain = calculateTimes(
        snapshot.val().trainTime,
        snapshot.val().trainFreq
      );

      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().trainFreq);

      // Output to HTML
      $("#train-schedule").append(
        "<tr><th> " +
          snapshot.val().trainName +
          " </th><td> " +
          snapshot.val().destination +
          " </td><td> " +
          snapshot.val().trainTime +
          " </td><td> " +
          snapshot.val().trainFreq +
          " </td><td>  " +
          nextTrain +
          "</td></tr>"
      );
    },

    // Handle the errors
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});

function calculateTimes(firstTrain, trainFreq) {
  var currentTime = moment();
  var stationStart = moment(firstTrain, "HH:mm");

  var minutesTilNextTrain = 0;

  if (stationStart > currentTime) {
    minutesTilNextTrain = stationStart.diff(currentTime, "minutes");
  } else {
    // Otherwise, get minutes past first time
    var minutesPast = currentTime.diff(stationStart, "minutes");
    // Find the result of minutesPast % trainFreq
    var remainder = minutesPast % trainFreq;
    // Subtract the remainder from the trainFreq
    minutesTilNextTrain = trainFreq - remainder;
  }

  return minutesTilNextTrain;
}
