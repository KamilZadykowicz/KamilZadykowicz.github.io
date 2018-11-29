// BATERIA

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

//   END BATTERY

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