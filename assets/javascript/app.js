$(document).ready(function(){
	// 1. Link to Firebase
	const trainData = new Firebase("https://inclasswork-a665b.firebaseio.com/");

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function(){

		// Grabs user input and assign to variables
		const trainName = $("#trainNameInput").val().trim();
		const lineName = $("#lineInput").val().trim();
		const destination = $("#destinationInput").val().trim();
		const trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		const frequencyInput = $("#frequencyInput").val().trim();

		// Test for variables entered
		console.log(trainName);
		console.log(lineName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		const newTrain = {
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
		const fbName = childSnapshot.val().name;
		const fbLine = childSnapshot.val().line;
		const fbDest = childSnapshot.val().destination;
		const fbTTI = childSnapshot.val().trainTime;
		const fbfreq = childSnapshot.val().frequency;
		
		const diffTime = moment().diff(moment.unix(fbTTI), "minutes");
		const timeRemainder = moment().diff(moment.unix(fbTTI), "minutes") % fbfreq ;
		const minutes = fbfreq - timeRemainder;

		const nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
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
