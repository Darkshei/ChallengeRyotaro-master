$(document).ready(function () {
    $("#fetcher").click(function () {
        document.location.replace("/repos/"+$("#username_input:text").val());
    });
});