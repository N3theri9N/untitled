
// conatiner 태그에 1개를 추가한다 그런데 이를 100회 넘게 한다 1~151 회

/*const newImg = document.createElement('img');
newImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
container.appendChild(newImg);*/

const container = document.querySelector('#container');
const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
/*
위의 과정을 151 회 반복
for(let i = 1 ; i < 151 ; i++){
    const newImg = document.createElement('img');
    newImg.src = `${baseUrl}${i}.png`
    container.appendChild(newImg);
}

*/

// 이미지 밑에 번호를 넣는 기능을 추가해본다.
/*
dom 구조는
<div>
    <img>
        <span>#</span>
</div>
*/

for(let i = 1 ; i <= 151 ; i++){
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon'); // 클래스 설정, pokemon 클래스에 인라인 align 설정이 있어서 보기좋게 나온다.

    const newImg = document.createElement('img');
    newImg.src = `${baseUrl}${i}.png`;

    const label = document.createElement('span');
    label.innerText = `#${i}`;

    pokemon.appendChild(newImg);
    pokemon.appendChild(label);
    container.appendChild(pokemon);

}