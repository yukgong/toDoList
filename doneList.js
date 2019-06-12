const doneListItem = document.querySelector('.doneList');

function paintDoneToDos(text, id){
    const doneLi = document.createElement('li');
    doneLi.classList.add('doneList');
    
    doneLi.id = id + 1;

    const doneToDoText = document.createElement('span');
    doneToDoText.innerText = text;
    doneToDoText.classList.add('doneText');

    const doneDeleteBtn = document.createElement('button');
    doneDeleteBtn.innerText = '❌';
    doneDeleteBtn.addEventListener('click', deleteDoneToDo);

    const toDoBtn = document.createElement('button');
    toDoBtn.classList.add('doneBtn');
    toDoBtn.innerText = '☑️';

    doneLi.appendChild(toDoBtn);
    doneLi.appendChild(doneToDoText);
    doneLi.appendChild(doneDeleteBtn);
    doneList.appendChild(doneLi);

}


// 로컬에 저장된 done to do 아이템을 확인하여, 아이템이 있으면 화면에 출력.
function loadDoneToDos(){
    // 변수 loadedDoneToDos는 '로컬에 저장된 DONE_ITEM 배열을 불러온다.
    const loadedDoneToDos = localStorage.getItem(DONE_ITEM);

    // 만약 로컬에 저장된 loadedDoneToDos는 배열이 비어있지 않으면,
    if(loadedDoneToDos !== null){
        //로컬 저장소의 배열 속에 저장된 할일을 문자형태에서 객체로 정의한다.
        const changeStringToObj = JSON.parse(loadedDoneToDos);

        //객체형태로 변환된 할일 각각에 paintDoneToDos 함수를 실행시킨다.
        changeStringToObj.forEach(function(text, id){
            paintDoneToDos(text.text, id,id);
        });
    }
}

function init (){
    loadDoneToDos();
}

init();