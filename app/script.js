var movimento = "ArrowRight";
var tempoMovimentaCobra, tempoGeraComida;
var velocidadeCobra = 100;
var pontos = 0;
window.addEventListener('load', iniciaCobra);
document.body.addEventListener('keydown', capturaTecla);



function iniciaCobra() {
    const snake = document.querySelectorAll('.snake');

    for (let index = 0; index < snake.length; index++) {
        if (snake[index].id) {
            snake[index].style.left = `${snake[index].offsetWidth * (snake.length - 1)}px`;
        } else {
            snake[index].style.left = `${snake[0].offsetLeft - (snake[0].offsetWidth * index)}px`;
        }
    }
}

function capturaTecla(ev) {
    clearTimeout(tempoMovimentaCobra);
    document.body.focus();
    switch (ev.code) {
        case "ArrowLeft":
            if (movimento != "ArrowRight") {
                movimento = ev.code;
            }
        break;
        case "ArrowUp":
            if (movimento != "ArrowDown") {
                movimento = ev.code;
            }
        break;
        case "ArrowRight":
            if (movimento != "ArrowLeft") {
                movimento = ev.code;
            }
        break;
        case "ArrowDown":
            if (movimento != "ArrowUp") {
                movimento = ev.code;
            }
        break;
    }

    movimentaCobra();
}

function movimentaCobra() {
    const snake = document.querySelectorAll('.snake');
    const terreno = document.querySelector('.terreno');
    let larguraTerreno = terreno.offsetWidth;
    let alturaTerreno = terreno.offsetHeight;
    let larguraParteCobra = snake[0].offsetWidth;
    let parteCobraX, parteCobraY, auxX, auxY;

    for (let index = 0; index < snake.length; index++) {
        auxX = parteCobraX;
        auxY = parteCobraY;
        parteCobraX = snake[index].offsetLeft;
        parteCobraY = snake[index].offsetTop;

        if (index > 0) { // encerraJogo
            if (snake[0].offsetLeft == parteCobraX && snake[0].offsetTop == parteCobraY) {
                document.body.innerHTML = `Game Over! <br> Você marcou ${pontos} pontos.`;
                document.body.style.fontSize = "3rem";
                document.body.style.textAlign = "center";
            }
        }

        if (document.querySelector('.comida') != null) { // adicionaCorpo
            const alimento = document.querySelector('.comida');
            if (snake[0].offsetLeft == alimento.offsetLeft && snake[0].offsetTop == alimento.offsetTop) {
                const novaParteCorpo = document.createElement('span');
                novaParteCorpo.classList.add("snake");
                novaParteCorpo.style.left = `${snake[snake.length - 1].offsetLeft}px`;
                novaParteCorpo.style.top = `${snake[snake.length - 1].offsetTop}px`;
                velocidadeCobra -= 3;
                if (velocidadeCobra < 3) {
                    velocidadeCobra = 3;
                }

                const caixaPontos = document.querySelector('.pontos');
                pontos += 100;

                caixaPontos.textContent = "Pontos: "+ pontos;
                terreno.appendChild(novaParteCorpo);
                alimento.remove();
            }
        }

        switch (movimento) {
            case "ArrowLeft":
                if (snake[index].offsetLeft < larguraParteCobra) {
                    snake[index].style.left = `${larguraTerreno - larguraParteCobra}px`;
                } else {
                    if (snake[index].id) {
                        snake[index].style.left = `${parteCobraX - larguraParteCobra}px`;
                    } else {
                        snake[index].style.left = `${auxX}px`;
                        snake[index].style.top = `${auxY}px`;
                    }
                }
            break;
            case "ArrowUp":
                if (snake[index].offsetTop < larguraParteCobra) {
                    snake[index].style.top = `${alturaTerreno - larguraParteCobra}px`;
                } else {
                    if (snake[index].id) {
                        snake[index].style.top = `${parteCobraY - larguraParteCobra}px`;
                    } else {
                        snake[index].style.left = `${auxX}px`;
                        snake[index].style.top = `${auxY}px`;
                    }
                }
            break;
            case "ArrowRight":
                if (snake[index].offsetLeft > larguraTerreno - larguraParteCobra * 2) {
                    snake[index].style.left = "0px";
                } else {
                    if (snake[index].id) {
                        snake[index].style.left = `${parteCobraX + larguraParteCobra}px`;
                    } else {
                        snake[index].style.left = `${auxX}px`;
                        snake[index].style.top = `${auxY}px`;
                    }
                }
            break;
            case "ArrowDown":
                if (snake[index].offsetTop > alturaTerreno - larguraParteCobra * 2) {
                    snake[index].style.top = "0px";
                } else {
                    if (snake[index].id) {
                        snake[index].style.top = `${parteCobraY + larguraParteCobra}px`;
                    } else {
                        snake[index].style.left = `${auxX}px`;
                        snake[index].style.top = `${auxY}px`;
                    }
                }
            break;
        }
    }

    tempoMovimentaCobra = setTimeout(movimentaCobra, velocidadeCobra);
}

function geraComida() {
    if (document.querySelector('.comida') != null) {
        return;
    } else {
        const terreno = document.querySelector('.terreno');
        const alimento = document.createElement('span');
        alimento.classList.add('comida');

        let posX = parseInt(Math.random() * 100);
        let posY = parseInt(Math.random() * 100);

        if (posX > 90) {
            posX = 90;
        }

        if (posX < 10) {
            posX = 10;
        }

        if (posY > 90) {
            posY = 90;
        }

        if (posY < 10) {
            posY = 10;
        }

        let comidaX = parseInt(terreno.offsetWidth * posX / 100);
        let comidaY = parseInt(terreno.offsetHeight * posY / 100);

        const snake0Largura = document.getElementsByClassName('snake')[0].offsetWidth;

        while(comidaX % snake0Largura != 0) {
            comidaX++;
        }

        while(comidaY % snake0Largura != 0) {
            comidaY++;
        }
    
        alimento.style.left = `${comidaX}px`;
        alimento.style.top = `${comidaY}px`;
        terreno.appendChild(alimento);
    }
}

tempoGeraComida = setInterval(geraComida, 1000);