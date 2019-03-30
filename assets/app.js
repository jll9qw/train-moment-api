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

    dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      trainFreq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

     
    });

    resetFields();
});

    function resetFields() {
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");
      }



      function calculateTimes(trainFreq, trainTime) {
        var tfreq = trainFreq;

        var firstTime = trainTime;

        var firstTimeConverted = moment(firstTime, "H HH").subtract(
          1,
          "years"
        );
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("H HH"));

        var diffTime = moment().diff(moment(firstTimeConverted), "m mm");
        console.log("DIFFERENCE IN TIME: " + diffTime);

 
        var tRemainder = diffTime % tfreq;
        console.log(tRemainder);

   
        var tMinutesTillTrain = tfreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 

        var nextTrain = moment().add(tMinutesTillTrain, "m mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("H HH"));

        return {
          arrival: moment(nextTrain).format("H HH"),
          minutesAway: tMinutesTillTrain
        };

        // if (firstTime > currentTime) {
        //     nextTrain = firstTime;
        //   } else {
        //     // Otherwise, get minutes past first time
        //     var minutesPast = currentTime.diff(firstTime, 'minutes');
        //     // Find the result of minutesPast % frequency
        //     var remainder = minutesPast % frequency;
        //     // Subtract the remainder from the frequency
        //     var minutesTilNextTrain = frequency - remainder;
        //     // Set nextTrain to the currentTime + `minutesTilNextTrain` minutes
        //     nextTrain = currentTime.add(minutesTilNextTrain, 'minutes');
        //   }
      
      
      }

      dataRef.ref().on(
        "child_added",
        function(snapshot) {
          console.log(snapshot.val().name);
          console.log(snapshot.val().destination);
          console.log(snapshot.val().frequency);

          var times = calculateTimes(
            snapshot.val().frequency,
            snapshot.val().time
          );

          // Output to HTML
          $("#results-table").append(
            "<tr><td> " +
              snapshot.val().trainName +
              " </td><td> " +
              snapshot.val().destination +
              " </td><td> " +
              snapshot.val().trainTime +
              " </td><td> " +
              snapshot.val().trainFreq +
              " </td><td> " +
              times.arrival +
              "</td><td>  " +
              times.minutesAway +
              "</td></tr>"
          );

        },


          // Handle the errors
        function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
)});



    
