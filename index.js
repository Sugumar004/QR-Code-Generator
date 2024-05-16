let qrContentInput = document.getElementById("qr-content");
let qrForm = document.getElementById("qr-form");
let qrCode;

function generateQrCode(qrContent) {
    return new QRCode("qr-code", {
        text: qrContent,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

let errMsg = document.getElementById("err");

qrForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let qrContent = qrContentInput.value;
  let urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?'+ 
    '(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 

  if (!urlPattern.test(qrContent)) {
    errMsg.style.display = "inline";
    // qrContentInput.value = ""; // clear the input box
    return;
  }

  errMsg.style.display = "none"; // hide the error message

  if (qrCode == null) {
    qrCode = generateQrCode(qrContent);
  } else {
    qrCode.makeCode(qrContent);
  }
});