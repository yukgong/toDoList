const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList'),
    doneList = document.querySelector('.js-doneList');

const TODOS_ITEM = 'toDos';
let toDos = [];

const DONE_ITEM = 'doneToDos';
let doneToDos = JSON.parse(localStorage.getItem(DONE_ITEM)) || [];

//done to do 목록 삭제 기능 정의.
function deleteDoneToDo(ev){
    const btn = ev.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
    
    const removeDoneToDo_LS = doneToDos.filter(function(doneToDo) {
        return doneToDo.id !== parseInt(li.id);
    });

    doneToDos = removeDoneToDo_LS;

    // 삭제 버튼을 누를때 마다 doneToDos의 전체 배열의 id 값이 -1씩 감소하라.
    const changeDoneToDo_LS = doneToDos.map(function(item) { 
        const liText = item.text;

        function makeNumber(){
            for(i = 1; i < doneToDos.length; i++){
                console.log(i)
            }
        } 
        
        for(i = 1; i < doneToDos.length; i++){}
        return doneToDos = {
            text: liText,
            id: makeNumber()
        }
    }

    });

    doneToDos = changeDoneToDo_LS;
    
    localStorage.setItem(DONE_ITEM, JSON.stringify(doneToDos));
}

// 완료 버튼 핸들러
function handleDoneList(ev){
    console.log('done button click...'); 
    const donebtn = ev.target;
    const listItem = donebtn.parentNode;
    listItem.classList.add('doneList');
    listItem.classList.remove('list');

    //html에 있는 done 아이템의 text와 id를 찾는다.
    const listItemChildText = listItem.childNodes[1].innerText;
    const listItemChildId = doneToDos.length + 1;

    // 찾은 개별 요소를 묶어준다.
     const doneObject = {
         text: listItemChildText,
         id: listItemChildId
     }; 
    // 로컬에 있는 doneToDos에 묶인 done 요소를 넣어준다.
    doneToDos.push(doneObject);
    
    //doneToDos 로컬 저장
    localStorage.setItem(DONE_ITEM, JSON.stringify(doneToDos));

    // doneToDos를 스크린에 보여준다.
    paintDoneToDos(listItemChildText, listItemChildId - 1);

    //로컬 저장소의 toDos 값에서 삭제된다.
    toDoList.removeChild(listItem);
    const removeAtLocalStorage = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(listItem.id);
    });
    toDos = removeAtLocalStorage;

    //toDos 로컬 저장
    saveToDos();

}

//to do 목록 삭제 기능 정의.
function deleteToDo(ev){
    const btn = ev.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);

    const removeAtLocalStorage = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });

    toDos = removeAtLocalStorage;
    saveToDos();
}

//to do 아이템을 로컬에 저장한다.
function saveToDos(){
    localStorage.setItem(TODOS_ITEM, JSON.stringify(toDos));
}

// 인풋에 입력한 문자를 화면에 리스트로 보여준다.
function paintToDos(text){
    const li = document.createElement('li'),
        newLiId = toDos.length + 1;
        li.classList.add('list');
    
    const toDoText = document.createElement('span');
        toDoText.innerText = text;
        toDoText.classList.add('toDoText');

    const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '❌';
        deleteBtn.addEventListener('click', deleteToDo);

    const doneBtn = document.createElement('button');
        doneBtn.classList.add('doneBtn');
        doneBtn.innerText = '✅';
        doneBtn.addEventListener('click', handleDoneList);

    li.appendChild(doneBtn);
    li.appendChild(toDoText);
    li.appendChild(deleteBtn);
    toDoList.appendChild(li);
    li.id = newLiId;
    
    const toDosObj = {
        text : text,
        id : newLiId
    }

    toDos.push(toDosObj);
    saveToDos();
}

// 인풋에 작성한 문자를 화면에 나타내고, 로컬에 저장하는 이벤트 정의.
function handleToDoSubmit(event){
    event.preventDefault();
    const currentToDoValue = toDoInput.value;
    paintToDos(currentToDoValue);
    toDoInput.value = '';
    saveToDos(currentToDoValue);
}

// 로컬에 저장된 to do 아이템을 확인하여, 아이템이 있으면 화면에 출력.
function loadToDos(){
    // 변수 loadedToDos는 '로컬에 저장된 currentToDos 배열을 불러온다.
    const loadedToDos = localStorage.getItem(TODOS_ITEM);

    // 만약 로컬에 저장된 currentToDos 배열이 비어있지 않으면,
    if(loadedToDos !== null){
        //로컬 저장소의 배열 속에 저장된 할일을 문자형태에서 객체로 정의한다.
        const changeStringToObj = JSON.parse(loadedToDos);

        //객체형태로 변환된 할일 각각에 paintToDos 함수를 실행시킨다.
        changeStringToObj.forEach(function(text){
            paintToDos(text.text);
        });
    }
}



// to do에 관한 초기 설정.
function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleToDoSubmit);
}

init();