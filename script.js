function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var format = '24';

    // Saat formatını belirleme
    if (localStorage.getItem('saatFormat')) {
        format = localStorage.getItem('saatFormat');
    }

    // 12 saatlik formatta ise PM/AM ekleyerek güncelle
    if (format === '12') {
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Saat 0 ise 12 olarak göster
    }

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = format === '12' ? hours + ':' + minutes + ':' + seconds + ' ' + ampm : hours + ':' + minutes + ':' + seconds;

    document.getElementById('saat').innerText = timeString;
}

function updateDate() {
    var now = new Date();
    var daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    var day = now.getDate();
    var month = now.getMonth() + 1; // Ay 0'dan başladığı için +1 ekleyerek düzelt
    var year = now.getFullYear();
    var dayOfWeek = daysOfWeek[now.getDay()];

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    var dateString = dayOfWeek + ', ' + day + '/' + month + '/' + year;

    document.getElementById('tarih').innerText = dateString;
}

function updateTimeZone() {
    var now = new Date();
    var timeZoneOffset = now.getTimezoneOffset();
    var timeZoneOffsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
    var timeZoneOffsetMinutes = Math.abs(timeZoneOffset % 60);
    var timeZoneSign = timeZoneOffset >= 0 ? '+' : '-';

    var timeZoneString = 'Saat Dilimi: UTC' + timeZoneSign + padZero(timeZoneOffsetHours) + ':' + padZero(timeZoneOffsetMinutes);

    document.getElementById('saatDilimi').innerText = timeZoneString;
}

function startCountdown() {
    var targetDate = new Date('2024-12-31T23:59:59');
    var now = new Date();
    var timeDifference = targetDate - now;

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    var countdownString = 'Geri Sayım: ' + days + ' gün, ' + padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);

    document.getElementById('geriSayim').innerText = countdownString;
}

function showWorldClocks() {
    var now = new Date();
    var utc = now.toUTCString().slice(-12, -7);
    var newYork = getWorldClockTime('America/New_York');
    var london = getWorldClockTime('Europe/London');
    var tokyo = getWorldClockTime('Asia/Tokyo');
    var sydney = getWorldClockTime('Australia/Sydney');

    var worldClockString = 'Dünya Saatleri:\nUTC: ' + utc + '\nNew York: ' + newYork + '\nLondon: ' + london + '\nTokyo: ' + tokyo + '\nSydney: ' + sydney;

    document.getElementById('dunyaSaatleri').innerText = worldClockString;
}

function getWorldClockTime(timezone) {
    var now = new Date();
    var options = { timeZone: timezone, hour12: false, hour: '2-digit', minute: '2-digit' };
    return now.toLocaleTimeString('en-US', options);
}

function setAlarm() {
    var alarmTime = document.getElementById('alarmTime').value;
    
    if (alarmTime) {
        var alarmDate = new Date();
        var currentTime = new Date();
        var [hours, minutes] = alarmTime.split(':');
        alarmDate.setHours(hours);
        alarmDate.setMinutes(minutes);
        alarmDate.setSeconds(0);

        var timeDifference = alarmDate - currentTime;

        if (timeDifference > 0) {
            setTimeout(function () {
                alert('Alarm!');
            }, timeDifference);
            alert('Alarm kuruldu!');
        } else {
            alert('Geçmiş bir zaman için alarm kuramazsınız.');
        }
    } else {
        alert('Lütfen bir alarm zamanı seçin.');
    }
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}

// Saati güncellemek için her saniyede bir updateClock fonksiyonunu çağır
setInterval(updateClock, 1000);

// Tarihi güncellemek için her dakikada bir updateDate fonksiyonunu çağır
setInterval(updateDate, 60000);

// Saat dilimini güncellemek için her saatte bir updateTimeZone fonksiyonunu çağır
setInterval(updateTimeZone, 3600000);

// Geri sayımı güncellemek için her saniyede bir startCountdown fonksiyonunu çağır
setInterval(startCountdown, 1000);

// Dünya saatlerini göstermek için her dakikada bir showWorldClocks fonksiyonunu çağır
setInterval(showWorldClocks, 60000);

// Sayfa yüklendiğinde saat, tarih, saat dilimi, geri sayım ve dünya saatlerini hemen göster
updateClock();
updateDate();
updateTimeZone();
startCountdown();
showWorldClocks();
