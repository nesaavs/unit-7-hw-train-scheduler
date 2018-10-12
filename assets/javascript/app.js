$(document).ready(function(){
	// 1. Link to Firebase
	var trainData = new Firebase("https://inclasswork-a665b.firebaseio.com/");

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function(){

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var lineName = $("#lineInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		// Test for variables entered
		console.log(trainName);
		console.log(lineName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		var newTrain = {
			name:  trainName,
			line: lineName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		// pushing trainInfo to Firebase
		trainData.push(newTrain);

		// clear text-boxes
		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		// Prevents page from refreshing
		return false;
	});

	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var fbName = childSnapshot.val().name;
		var fbLine = childSnapshot.val().line;
		var fbDest = childSnapshot.val().destination;
		var fbTTI = childSnapshot.val().trainTime;
		var fbfreq = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(fbTTI), "minutes");
		var timeRemainder = moment().diff(moment.unix(fbTTI), "minutes") % fbfreq ;
		var minutes = fbfreq - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + fbName + "</td><td>" + fbLine + "</td><td>"+ fbDest + "</td><td>" + fbfreq + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});
