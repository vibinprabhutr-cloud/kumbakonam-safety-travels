(function(){
  var FORM_EMAIL = "kumbakonamsafetytravels@gmail.com";
  var form = document.getElementById("booking-form");
  if(!form) return;
  var status = document.getElementById("bf-status");
  var submitBtn = form.querySelector("button[type=submit]");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    status.dataset.state = "";
    status.textContent = "Sending...";
    submitBtn.disabled = true;
    fetch("https://formsubmit.co/ajax/" + FORM_EMAIL, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    }).then(function(res){
      if(!res.ok) throw new Error("bad response");
      return res.json();
    }).then(function(){
      status.dataset.state = "ok";
      status.textContent = "Request sent — we'll call you shortly.";
      form.reset();
    }).catch(function(){
      status.dataset.state = "err";
      status.textContent = "Couldn't send that — please call or WhatsApp us instead.";
    }).finally(function(){
      submitBtn.disabled = false;
    });
  });
})();
