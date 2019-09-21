window.addEventListener("load", () => {

  document.getElementById("generateBtn").addEventListener("click", () => {
    console.log("generateUrl function");

    let yourUrl = document.getElementById("yourUrl").value;
    let video = document.getElementById("video").value;
    let heading = document.getElementById("heading").value;
    let tracking = document.getElementById("tracking").value;

    let radios = document.getElementsByName("sfmAssetVideo");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        var sfmAssetVideo = radios[i].value;
        break;
      }
    }

    document.getElementById("postUrl").innerHTML = yourUrl + "?video=" + video + "&?heading=" + heading + "&?t=" + tracking + "&?sfm=" + sfmAssetVideo
    document.getElementById("postUrlDiv").classList.add("alert-success");
  });

});
