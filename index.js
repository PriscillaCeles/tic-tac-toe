const $boardField = document.querySelectorAll('.game-box__moves-board--item')

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