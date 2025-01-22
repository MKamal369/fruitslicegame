// // --------------------------Variables--------------------------------------
//
// let play = false;
// let x = 60;
//
// let score = 0;
// let first_value;
// let second_value;
// let correctAnswer
//
//
// //---------------------------Operation-------------------------------
//
// $("#start_reset").click(function (){
//     if( play === true){
//         location.reload();
//     }else{
//
//         $("#start_reset").text("Reset Game");
//         $("#time_remaining").css({
//             "display": "block"
//         })
//         play = true;
//         QuestionGenerator();
//
//
//
//     }
// })
//
// // --------------------------Timer-----------------------------------
//
// let startCountdown = setInterval(function(){
//     x--;
//     $("#time_remaining_value").text(x);
//     if(x === 0){
//         clearInterval(startCountdown);
//         $("#game_over").css("display", "block");
//         $("#time_remaining").css("display", "none")
//
//     }
// }, 1000);
//
// // -------------------------------Question Generator---------------------------
//
// function QuestionGenerator(){
//     first_value = 1+Math.round(10*Math.random());
//     second_value = 1+Math.round(10*Math.random());
//     correctAnswer = first_value * second_value;
//
//     $("#question").text(first_value + " x " + second_value + " = ?");
//
//     let randomPosition = 1+Math.round(3*Math.random());
//
//     $("#box"+ randomPosition).text(correctAnswer);
//     // alert(option1);
//
//     for(let i = 0; i < 5; i++){
//         if(i !== randomPosition) {
//             let incorrectAnswer = GenerateIncorrectAnswer();
//             $("#box" + i).text(incorrectAnswer);
//         }
//     }
// }
//
//
//
//
//
// //-------------------Incorrect Question Generator-----------------------
//
// function GenerateIncorrectAnswer(){
//     let incorrectAnswer = (1 + Math.round(10*Math.random()))*(1+Math.round(10*Math.random()));
//     while (incorrectAnswer === correctAnswer){
//         incorrectAnswer = 1 + Math.round(10*Math.random());
//
//     }
//     return incorrectAnswer;
// }
//
// document.getElementById("final_score").innerHTML = score;
//
//
//
// //----------------------------The Game Loop------------------------------------
//
//
// for(let e=1; e<5; e++){
//     document.getElementById("box"+e).onclick = function(){
//
//         //check if we are playing
//         if(play){
//             if(parseInt(this.innerHTML) === parseInt(correctAnswer)){
//                 score++;
//                 document.getElementById("score_value").innerHTML = score;
//                 document.getElementById("wrong").style.display = "none";
//                 document.getElementById("correct").style.display = "block";
//                 document.getElementById("final_score").innerHTML = " "+score;
//                 setTimeout(function(){
//                     document.getElementById("correct").style.display = "none";
//                 }, 1000);
//                 //Generate new Question and Answer
//                 QuestionGenerator();
//             }else{
//                 document.getElementById("correct").style.display = "none";
//                 document.getElementById("wrong").style.display = "block";
//                 setTimeout(function(){
//                     document.getElementById("wrong").style.display = "none";
//                 }, 1000);
//             }
//         }
//     }
// }
//
let action;
let step;
let list_fruits = ['apple', 'banana', 'enemy_1', 'enemy_2', 'pineapple', 'ship', 'watermelon']
let heart_left;
let score;
let play = false;


$(function(){
    $('#start_reset').click(()=>{
        if(play ===true){
            location.reload();
            $("#game_over").html("hi");

        }else{
            play = true;
            score = 0;
            $("#game_over").hide();
            $("#score_value").html(score);
            $("#chances").show();
            heart_left = 3;
            $("#final_score").innerHTML = score;
            add_hearts();

            $("#start_reset").html('Reset Game');


            /*_________________Sending Items Fromm Top___________________*/
            startAction();
        }
    });
});


function add_hearts(){
    $("#chances").empty();
    for(let i = 0; i < heart_left;i++){
        $("#chances").append(" <i style='color: red;' class='fa fa-heart'></i>");
}

}

$("#fruit_1").mouseover(()=>{
    score ++;
    $("#final_score").innerHTML = score;
    // $("#scorevalue").html(score); //update score
// document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    $("#score_value").html(score);
    clearInterval(action);
    $("#fruit_1").hide("explode", 200);
    setTimeout(startAction, 300)
})

stopAction();



function startAction(){

    $("#fruit_1").show();
    chooseRandom();
    $("#fruit_1").css({'left': Math.round(550*Math.random()), 'top': -80});


    step = 1 + Math.round(5*Math.random());

    $("#final_score").innerHTML = score;
    action = setInterval(()=>{
        $("#fruit_1").css('top', $("#fruit_1").position().top + step)

    //     if slow fruit
        if($("#fruit_1").position().top > $("#fruit_container").height()){
            if(heart_left > 1){
                $("#fruit_1").show();
                chooseRandom();
                $("#fruit_1").css({'left': Math.round(550*Math.random()), 'top': -80});

                step = 1 + Math.round(10*Math.random());
                heart_left --;
                add_hearts();

            }else{
                play = false;
                $("#start_reset").html('Start Game');
                // $("#final_score").innerHTML = score;
                // $("#game_over").html(<p>hi</p>);
                $("#game_over").show();
                $("#chances").hide();
                $("#game_over").html('<br />Game Over <br /><br /> Your Score is '+ score)
                stopAction();
            }
        }
    }, 10);


}


function stopAction(){
 clearInterval(action);
 $("#fruit_1").hide();
}

function chooseRandom(){
    let random = Math.round(6*Math.random());
    $("#fruit_1").attr('src', 'png/' + list_fruits[random] + '.png');
    // window.alert(random)
}


// window.alert($("#fruit_1").position().left)
