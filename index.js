const $boardField = document.querySelectorAll('.game-box__moves-board--item')
const $switcher = document.querySelector('.start-box__player--input-switcher')
const $switcher2 = document.querySelector('.start-box__player--input-switcher-2')

let movePlayer = 'X'

function toggleMove(){
    if (movePlayer == 'X'){
        movePlayer = 'O'
    } else {
        movePlayer = 'X'
    }
}

for (let contador = 0; contador < $boardField.length ; contador++) {

    const field = $boardField[contador]

    $boardField[contador].onclick = function (){
        if ($boardField[contador].innerHTML != ''){
            return
        }

        $boardField[contador].innerHTML = movePlayer
        toggleMove()
    }
}

$switcher.addEventListener('click', function (){
    $switcher.classList.toggle('start-box__player--input-switcher-toggle')
})

$switcher2.addEventListener('click', function (){
    $switcher2.classList.toggle('start-box__player--input-switcher-toggle')
})