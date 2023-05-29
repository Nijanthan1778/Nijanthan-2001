'use strict';

const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelectorAll(".dice");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const buttonNew = document.querySelector(".btn--new");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let current0 = 0;
let current1 = 0;
score0.textContent = 0;
score1.textContent = 0;

// for (let i = 0; i < dice.length; i++)
//     dice[i].classList.add("hidden");

// let randomNO = Math.trunc(Math.random() * 6) + 1;
// console.log(randomNO)

const action = function () {
    if (player0.classList.contains("player--active")) {

        let randomNO = Math.trunc(Math.random() * 6) + 1;
        current0 += randomNO;
        document.getElementById("current--0").textContent = current0;


        if (randomNO === 1) {
            dice[0].classList.remove("hidden");
            dice[1].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
            document.getElementById("current--0").textContent = 0;
            player0.classList.remove("player--active")
            player1.classList.add("player--active")
            current0 = 0;

        }
        else if (randomNO === 2) {
            dice[1].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
        }
        else if (randomNO === 3) {
            dice[2].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[1].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
        }
        else if (randomNO === 4) {
            dice[3].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[1].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
        }
        else if (randomNO === 5) {
            dice[4].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[1].classList.add("hidden");
            dice[5].classList.add("hidden");

        } else if (randomNO === 6) {
            dice[5].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[1].classList.add("hidden");
        }

    } else if (player1.classList.contains("player--active")) {

        let randomNO = Math.trunc(Math.random() * 6) + 1;
        current1 += randomNO;
        document.getElementById("current--1").textContent = current1;

        if (randomNO === 1) {
            dice[0].classList.remove("hidden");
            dice[1].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
            document.getElementById("current--1").textContent = 0;
            player1.classList.remove("player--active")
            player0.classList.add("player--active")
            current1 = 0;
        }

        else if (randomNO === 2) {
            dice[1].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
        }
        else if (randomNO === 3) {
            dice[2].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[1].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
        }
        else if (randomNO === 4) {
            dice[3].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[1].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[5].classList.add("hidden");
        }
        else if (randomNO === 5) {
            dice[4].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[1].classList.add("hidden");
            dice[5].classList.add("hidden");

        } else if (randomNO === 6) {
            dice[5].classList.remove("hidden");
            dice[0].classList.add("hidden");
            dice[2].classList.add("hidden");
            dice[3].classList.add("hidden");
            dice[4].classList.add("hidden");
            dice[1].classList.add("hidden");
        }
    }
};

buttonRoll.addEventListener("click", action);

buttonHold.addEventListener("click", function () {
    if (player0.classList.contains("player--active")) {
        score0.textContent = Number(score0.textContent) + current0;
        document.getElementById("current--0").textContent = 0;
        current0 = 0;
        player0.classList.remove("player--active")
        player1.classList.add("player--active")


    } else if (player1.classList.contains("player--active")) {
        score1.textContent = Number(score1.textContent) + current1;
        document.getElementById("current--1").textContent = 0;
        current1 = 0;
        player0.classList.add("player--active")
        player1.classList.remove("player--active")

    }

    if (Number(score0.textContent) + current0 >= 100) {
        player0.classList.add("player--winner");
        player0.classList.remove("player--active");
        player1.classList.remove("player--active");

    } else if (Number(score1.textContent) >= 100) {
        player1.classList.add("player--winner");
        player0.classList.remove("player--active");
        player1.classList.remove("player--active");
    }


    dice[0].classList.add("hidden");
    dice[1].classList.add("hidden");
    dice[2].classList.add("hidden");
    dice[3].classList.add("hidden");
    dice[4].classList.add("hidden");
    dice[5].classList.add("hidden");

});


buttonNew.addEventListener("click", function () {

    score0.textContent = 0;
    score1.textContent = 0;
    document.getElementById("current--0").textContent = 0;
    document.getElementById("current--1").textContent = 0;
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    dice[0].classList.add("hidden");
    dice[1].classList.add("hidden");
    dice[2].classList.add("hidden");
    dice[3].classList.add("hidden");
    dice[4].classList.add("hidden");
    dice[5].classList.add("hidden");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");

});








