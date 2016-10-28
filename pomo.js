/**
 * Created by christopherli on 10/24/16.
 */
$(document).ready(function(){

    var sLength = 25,
        bLength = 5,

        totalSessionResume,
        totalBreakResume,

        currentSessionResume,
        currentBreakResume,


    //initial = -1, start = 0, stop = 1, resume = 2
        flag = -1;

    function Timer(){
        var timerId, initSession, initBreak, totalSessionLength, totalBreakLength, currentSessionLength, currentBreakLength;

        this.setInitSession = function(initSessionInput){
            initSession = initSessionInput;
        };

        this.setInitBreak = function(initBreakInput){
            initBreak = initBreakInput;
        };

        this.setTotalSessionLength = function(newTotalSessionLength){
            totalSessionLength = newTotalSessionLength;
        };

        this.setTotalBreakLength = function(newTotalBreakLength){
            totalBreakLength = newTotalBreakLength;
        };

        this.getTotalSessionLength = function(){
            return totalSessionLength;
        };

        this.getTotalBreakLength = function() {
            return totalBreakLength;
        };

        this.setCurrentSessionLength = function(newCurrentSessionLength){
            currentSessionLength = newCurrentSessionLength;
        };

        this.setCurrentBreakLength = function(newCurrentBreakLength){
            currentBreakLength = newCurrentBreakLength;
        };

        this.getCurrentSessionLength = function(){
            return currentSessionLength;
        };

        this.getCurrentBreakLength = function(){
            return currentBreakLength;
        };

        this.pause = function(){
            window.clearTimeout(timerId);
        };

        this.resume = function(){
            timerId = window.setInterval(startCountdown, 1000);
        };

        var convert = function(d){
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
            return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
        };

        var startCountdown = function(){

            if(initSession === 1 && currentSessionLength !== 0){
                initSession = 0;

                $('#displayTitle').text('Session');
                $('#displayTimer').text(convert(currentSessionLength));
                console.log(convert(currentSessionLength));
            }

            else if(currentSessionLength > 0 && currentBreakLength > 0){
                currentSessionLength--;

                $('#displayTimer').text(convert(currentSessionLength));
                console.log(convert(currentSessionLength));
            }

            else if(currentSessionLength === 0 && initBreak === 1){
                audio.play();
                initBreak = 0;
                
                $('#displayTitle').text('Break');
                $('#displayTimer').text(convert(currentBreakLength));
                console.log(convert(currentBreakLength));
            }

            else if(currentSessionLength === 0 && currentBreakLength > 0){
                currentBreakLength--;

                $('#displayTimer').text(convert(currentBreakLength));
                console.log(convert(currentBreakLength));
            }

            else if(currentSessionLength === 0 && currentBreakLength === 0){
                audio.play();

                currentSessionLength = totalSessionLength;
                currentBreakLength = totalBreakLength;
                initBreak = 1;
                
                $('#displayTitle').text('Session');
                $('#displayTimer').text(convert(currentSessionLength));
                console.log(convert(currentSessionLength));
            }
        };
    }

    var timer = new Timer();
    var audio = new Audio('sound/bell.mp3');

    $('#start').click(function(){

        if(flag === -1 || flag === 1) {

            flag = 0;

            timer.setTotalSessionLength(sLength * 60);
            timer.setTotalBreakLength(bLength * 60);

            timer.setCurrentSessionLength(sLength * 60);
            timer.setCurrentBreakLength(bLength * 60);

            timer.setInitSession(1);
            timer.setInitBreak(1);

            timer.resume();

        }
    });

    $('#stop').click(function(){

        if(flag === 0 || flag === 2) {

            flag = 1;

            totalSessionResume = timer.getTotalSessionLength();
            totalBreakResume = timer.getTotalBreakLength();

            currentSessionResume = timer.getCurrentSessionLength();
            currentBreakResume = timer.getCurrentBreakLength();

            timer.pause();

        }

    });
    
    $('#resume').click(function(){

        if(flag === 1) {

            flag = 2;

            timer.setTotalSessionLength(totalSessionResume);
            timer.setTotalBreakLength(totalBreakResume);

            timer.setCurrentSessionLength(currentSessionResume);
            timer.setCurrentBreakLength(currentBreakResume);

            timer.setInitSession(1);
            timer.setInitBreak(1);
            timer.resume();

        }
        
    });

    $('#s-incr').click(function(){
        sLength++;
        $('#session').text(sLength);
    });

    $('#s-decr').click(function(){
        if(sLength > 1){
            sLength--;
        }
        $('#session').text(sLength);
    });

    $('#b-incr').click(function(){
        bLength++;
        $('#break').text(bLength);
    });

    $('#b-decr').click(function(){
        if(bLength > 1){
            bLength--;
        }
        $('#break').text(bLength);
    })
});