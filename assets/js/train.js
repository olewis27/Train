var trainCounter = 0;
$(document).on("click", '#addTrain', function() {

    //Create row to attach all train related information to
    var row = $('<tr>');

    //Gather Train name from trainName div and append to row
    var trainName = $('<td>');
    trainName.text($('#trainName').val().trim());
    row.append(trainName);

    //Gather Train Place from from place div and append to row
    var trainPlace = $('<td>');
    trainPlace.text($('#place').val().trim());
    row.append(trainPlace);

    //Gather Inital Time Given and Frequency
    var timeGiven = $('#trainTime').val().trim();
    var freqGiven = parseInt($('#freq').val().trim());

    //Train Math
    var firstTimeConverted = moment(timeGiven, "HH:mm");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemaining = diffTime % freqGiven;
    var minTilTrain = freqGiven - timeRemaining;
    var nextTrain = moment().add(minTilTrain, "minutes");

    //Build Train Time Items to append to row
    var trainTime = $('<td>');
    moment(firstTimeConverted).format("HH:mm");
    trainTime.text(firstTimeConverted);
    row.append(trainTime);

    var trainFreq = $('<td>');
    trainFreq.text(freqGiven);
    row.append(trainFreq);

    var minutesUntilNext = $('<td>');
    minutesUntilNext.text(minTilTrain);
    row.append(minutesUntilNext);

    //Setting local storage to contain train information
    var trainLocalStorage = row.prop('outerHTML');
    localStorage.setItem("data-train-" + trainCounter, trainLocalStorage);

    //Resetting input fields to be blank
    $('#trainName').val("");
    $('#place').val("");
    $('#trainTime').val("");
    $('#freq').val("");

    //Adding train to train table and updating train counter
    $('#trainTable').append(trainLocalStorage);
    trainCounter++;

    return false;

});

$(document).ready(function() {
    //On Document ready add all trains from local storage to the table and update train counter accordingly
    for (var i = 0; i < localStorage.length; i++)
        $('#trainTable').append(localStorage.getItem("data-train-" + trainCounter++));
})
