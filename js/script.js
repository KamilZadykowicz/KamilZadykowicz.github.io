// BATTERY

if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
    var target = document.getElementById('target');
  
    function handleChange(change) {
      var timeBadge = new Date().toTimeString().split(' ')[0];
      var newState = document.createElement('p');
      newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
      target.appendChild(newState);
    }
    
    function onChargingChange() {
    //   handleChange('Battery charging changed to <b>' + (this.charging ? 'charging' : 'discharging') + '</b>')
        console.log(this.charging);
        if(this.charging == true) {
            console.log("charging");
            document.getElementById('battery-charging').style.display = "block";
        }
        else {
            console.log("not charging");
            document.getElementById('battery-charging').style.display = "none";
        }
    }
    function onChargingTimeChange() {
    //   handleChange('Battery charging time changed to <b>' + this.chargingTime + ' s</b>');
        
    }
    function onDischargingTimeChange() {
    //   handleChange('Battery discharging time changed to <b>' + this.dischargingTime + ' s</b>')
        
    }
    function onLevelChange() {
    //   handleChange('Battery level changed to <b>' + this.level + '</b>');
      document.getElementById('level').innerHTML = Math.round(this.level * 100) + "%";
      document.getElementById('battery-lev').style.height = this.level*100 + "%";
    }
  
    var batteryPromise;
    
    if ('getBattery' in navigator) {
      batteryPromise = navigator.getBattery();
    } else {
      batteryPromise = Promise.resolve(navigator.battery);
    }
    
    batteryPromise.then(function (battery) {
    //   document.getElementById('charging').innerHTML = battery.charging ? 'charging' : 'discharging';
    //   document.getElementById('chargingTime').innerHTML = battery.chargingTime + ' s';
    //   document.getElementById('dischargingTime').innerHTML = battery.dischargingTime + ' s';
    if(battery.charging == true) {
        document.getElementById('battery-charging').style.display = "block";
    }
    else {
        document.getElementById('battery-charging').style.display = "none";
    }
      document.getElementById('level').innerHTML = Math.round(battery.level * 100) + "%";
      document.getElementById('battery-lev').style.height = battery.level*100 + "%";
      battery.addEventListener('chargingchange', onChargingChange);
    //   battery.addEventListener('chargingtimechange', onChargingTimeChange);
    //   battery.addEventListener('dischargingtimechange', onDischargingTimeChange);
      battery.addEventListener('levelchange', onLevelChange);
    });
  }





// VIBRATION

$('#btn-vibrate1').click(function(){
    navigator.vibrate([100,300,100,300,100,300,100,300,100,300,100,300]);
});
$('#btn-vibrate2').click(function(){
    navigator.vibrate([200,200,200,200,200,200,200,200,200,200,200,200,200,200]);
});
$('#btn-vibrate3').click(function(){
    navigator.vibrate([100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,100,100,100,500,]);
});
$('#btn-vibrate4').click(function(){
    navigator.vibrate([100,100,100,100,100,100,100,100,100,100,1000,100,100,100,100,100,100,100,100,100,100,1000,100,100,100,100,100,100,100,100,100,100,1000,100,100,100,100,100,100,100,100,100,100,1000,100,100,100,100,100,100,100,100,100,100,1000,]);
});
$('#btn-vibrate5').click(function(){
    navigator.vibrate([1000,1000,1000,100,100,100,100,100,1000,1000,1000,100,100,100,100,100,1000,1000,1000,100,100,100,100,100,1000,1000,1000,100,100,100,100,100,1000,1000,1000,100,100,100,100,100,1000,1000,1000,100,100,100,100,100,1000,1000,1000,100,100,100,100,100,]);
});

// MEMORY

document.getElementById('memory').innerHTML = navigator.deviceMemory || 'unknown'



// STREAM

function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }
  
  var pc1;
  var pc2;
  var theStreamB;
  
  function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
    
    var constraints = {
      video: true
    };
    getUserMedia(constraints, function (stream) {
      addStreamToVideoTag(stream, 'localVideo');
  
      // RTCPeerConnection is prefixed in Blink-based browsers.
      window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
      pc1 = new RTCPeerConnection(null);
      pc1.addStream(stream);
      pc1.onicecandidate = event => {
        if (event.candidate == null) return;
        pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
      };
  
      pc2 = new RTCPeerConnection(null);
      pc2.onaddstream = event => {
        theStreamB = event.stream;
        addStreamToVideoTag(event.stream, 'remoteVideo');
      };
      pc2.onicecandidate = event => {
        if (event.candidate == null) return;
        pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
      };
  
      pc1.createOffer({offerToReceiveVideo: 1})
        .then(desc => {
          pc1.setLocalDescription(desc);
          pc2.setRemoteDescription(desc);
          return pc2.createAnswer({offerToReceiveVideo: 1});
        })
        .then(desc => {
          pc1.setRemoteDescription(desc);
          pc2.setLocalDescription(desc);
        })
        .catch(err => {
          console.error('createOffer()/createAnswer() failed ' + err);
        });
    }, function (err) {
      alert('Error: ' + err);
    });
  }
  
  function addStreamToVideoTag(stream, tag) {
    var mediaControl = document.getElementById(tag);
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    }
  }


  // service worker

if ('serviceWorker' in navigator) {
navigator.serviceWorker
            .register('js/service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
}

let deferredPrompt;

var btnAdd = document.getElementById('install-app');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });