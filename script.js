let main = document.querySelector('main');
let body = document.querySelector('body');
let addButton = document.querySelector('#add-button');
let modalCard = document.querySelector('.modal-card');
let modalCloseButton = document.querySelector('.modal-close-button');
let modalCancelButton = document.querySelector('.modal-cancel-button');
let modalOverlay = document.querySelector('.modal-overlay');
let modalForm = document.querySelector('.modal-form');
let modalAddButton = document.querySelector('.modal-add-button');
let modalAuthorName = document.querySelector('#author-name-input');
let modalBookName = document.querySelector('#book-name-input');
let modalPageInput = document.querySelector('#page-input');
const readRadio = document.querySelector('#read-status-input');
const unreadRadio = document.querySelector('#unread-status-input');
const toggleAllBooks = document.querySelector('.toggle-all-books');
const toggleReadBooks = document.querySelector('.toggle-read-books');
const toggleUnreadBooks = document.querySelector('.toggle-unread-books');
let radioCheck;
let editing = false;
let addingBook = false;
let singleEditing = false;
let bookIndex;
let currentBook = null;
let infoToEdit = null;
let pageDivToEdit = null;
let statusInfoArray = null;
let bookId;
let singleEditArray = [];
let singlePageCountArray = [];
let singleCardStatus = null;
let singleStatus = null;
let overTotal = document.querySelector('.over-total-count');
let overRead = document.querySelector('.over-read-count');
let overUnread = document.querySelector('.over-unread-count');
let readCardsHolderArray = [];
let unreadCardsHolderArray = [];
function Book(name, author, pages, status){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    const id = crypto.randomUUID();
    this.id = id;
    
};
const savedBooks = [];
function createBook(name, author, pages, status){
    const curBook = new Book(name, author, pages, status);
    savedBooks.push(curBook);
};
function displayBook(bookArray){
    for(let i = 0; i < bookArray.length; i++){
        let card = document.createElement('div');
        let imgHolder = document.createElement('div');
        imgHolder.classList.add('img-holder');
        let img1 = document.createElement('img');
        img1.setAttribute('src', 'pictures/Neon No Cover Placeholder Card.png');
        imgHolder.append(img1);
        let bookInfoHolder = document.createElement('div');
        bookInfoHolder.classList.add('book-info-holder');
        let buttonHolder = document.createElement('div');
        buttonHolder.classList.add('button-holder');
        let bookName = document.createElement('p');
        bookName.classList.add('book-name');
        let authorName = document.createElement('p');
        authorName.classList.add('author-name');
        let bookPageCount = document.createElement('p');
        bookPageCount.classList.add('book-page-count');
        
        let pageInfoHolder = document.createElement('div');
        pageInfoHolder.classList.add('page-info-holder');
        let pageIcon = document.createElement('img');
        
        let statusDiv = document.createElement('div');
        let statusInfo = document.createElement('p');
        let hr1 = document.createElement('hr');
        let greenDot = document.createElement('img');
        
        pageIcon.setAttribute('src', 'icons/notebook-text.png');
        pageIcon.setAttribute('alt', 'Page icon');
        greenDot.setAttribute('src', 'icons/green_dot-removebg-preview.png');
        greenDot.setAttribute('alt', 'Green dot');
        let redDot = document.createElement('img');
        redDot.setAttribute('src', 'icons/red_dot-removebg-preview.png');
        redDot.setAttribute('alt', 'red dot');
        bookPageCount.textContent = bookArray[i].pages;
        authorName.textContent = bookArray[i].author;
        bookName.textContent = bookArray[i].name;
        
        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.classList.add('card-button');
        editButton.textContent = 'Edit';
        
        let removeButton = document.createElement('button');

        removeButton.classList.add('remove-button');
        removeButton.classList.add('card-button');
        removeButton.textContent = 'Remove';
        buttonHolder.append(editButton, removeButton);
        removeButton.addEventListener('click', (e) => {
            let bookIndex = savedBooks.indexOf(bookArray[i]);
            savedBooks.splice(bookIndex, 1);
            main.removeChild(card);
            overView();
        })
        
        statusDiv.classList.add('status-div')
        if(bookArray[i].status == 'read'){
            statusInfo.append(`Read`);
            statusDiv.append(greenDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(7, 23, 29); color: rgb(24, 231, 79)');
        }else if(bookArray[i].status == 'unread'){
            statusInfo.append(`Unread`);
            statusDiv.append(redDot, statusInfo);
            
            statusDiv.setAttribute('style', 'background-color: rgb(22, 13, 30); color: rgb(247, 42, 77)');
        }
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            statusInfoArray = Array.from(statusDiv.childNodes);
            statusInfoArray.push(statusDiv);
            
            modalAddButton.textContent = 'Update';
            modalCard.classList.add('active');
            modalOverlay.classList.add('active');
            bookIndex = savedBooks.indexOf(bookArray[i]);
            currentBook = bookArray[bookIndex]
            modalBookName.value = bookArray[bookIndex].name;
            modalAuthorName.value = bookArray[bookIndex].author;
            modalPageInput.value = bookArray[bookIndex].pages;
            if(bookArray[bookIndex].status === 'read'){
                readRadio.checked = true;
            }else if(bookArray[bookIndex].status === 'unread'){
                unreadRadio.checked = true;
            }
            editing = true;
            let parentEle = e.target.parentElement;
            let grandPaEle = parentEle.parentElement;
            let mainChild = grandPaEle.childNodes[1];
            const pareChildEle = Array.from(parentEle.childNodes);
            infoToEdit = Array.from(mainChild.childNodes);
            pageDivToEdit = Array.from(infoToEdit[3].childNodes);
            
        })
        pageInfoHolder.append(pageIcon, bookPageCount);
        bookInfoHolder.append(bookName, authorName, hr1, pageInfoHolder, statusDiv)
        card.append(imgHolder, bookInfoHolder, buttonHolder);
        card.classList.add('card');
        main.append(card);
    }
    overView();
};
function displaySingleBook(bookArray){
    let card = document.createElement('div');
        let imgHolder = document.createElement('div');
        imgHolder.classList.add('img-holder');
        let img1 = document.createElement('img');
        img1.setAttribute('src', 'pictures/Neon No Cover Placeholder Card.png');
        imgHolder.append(img1);
        let bookInfoHolder = document.createElement('div');
        bookInfoHolder.classList.add('book-info-holder');
        let buttonHolder = document.createElement('div');
        buttonHolder.classList.add('button-holder');
        let bookName = document.createElement('p');
        let authorName = document.createElement('p');
        let pageCountHolder = document.createElement('div');
        pageCountHolder.classList.add('page-count-holder');
        let bookPageCount = document.createElement('p');
        bookPageCount.classList.add('book-page-count');
        let statusDiv = document.createElement('div');
        let statusInfo = document.createElement('p');
        statusInfo.classList.add('status-info')
        let hr1 = document.createElement('hr');
        let greenDot = document.createElement('img');
        let pageIcon = document.createElement('img');
        pageIcon.setAttribute('id', 'single-page-icon');
        pageIcon.setAttribute('src', 'icons/notebook-text.png');
        pageIcon.setAttribute('alt', 'Page icon');
        greenDot.setAttribute('src', 'icons/green_dot-removebg-preview.png');
        greenDot.setAttribute('alt', 'Green dot');
        let redDot = document.createElement('img');
        redDot.setAttribute('src', 'icons/red_dot-removebg-preview.png');
        redDot.setAttribute('alt', 'red dot');
        authorName.textContent = bookArray.at(-1).author;
        bookName.textContent = bookArray.at(-1).name;
        bookPageCount.textContent = bookArray.at(-1).pages;

        let randomId = document.createElement('p');
        randomId.textContent = bookArray.at(-1).id;
        randomId.style.display = 'none';
        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');    
        editButton.classList.add('card-button');
        editButton.textContent = 'Edit';
        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.classList.add('card-button');
        removeButton.textContent = 'Remove';
        buttonHolder.append(editButton, removeButton);
        removeButton.addEventListener('click', (e) => {
            main.removeChild(card);
            overView();
        })
        statusDiv.classList.add('status-div')
        if(bookArray.at(-1).status == 'read'){
            statusInfo.append(`Read`);
            statusDiv.append(greenDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(7, 23, 29); color: rgb(24, 231, 79)');
        }else{
            statusInfo.append(`Unread`);
            statusDiv.append(redDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(22, 13, 30); color: rgb(247, 42, 77)');
        }
        editButton.addEventListener('click', (e) => {

            e.stopPropagation();
            modalAddButton.textContent = 'Update';
            modalCard.classList.add('active');
            modalOverlay.classList.add('active');
            let parentEle = e.target.parentElement;
            let mainParent = parentEle.parentElement;
            let cardArray = Array.from(mainParent.childNodes);
            let editArray = Array.from(cardArray[1].childNodes);
            bookId = editArray[5].textContent;
            singleEditArray = editArray;
            singlePageCountArray = Array.from(pageCountHolder.childNodes);

            let single = Array.from(editArray[4].childNodes);
            singleCardStatus = single;
            singleStatus = editArray[4];
            
            modalBookName.value = bookName.textContent;
            modalAuthorName.value = authorName.textContent;
            modalPageInput.value = bookPageCount.textContent;
            if(statusInfo.textContent === 'Read'){
                readRadio.checked = true;
            }else if(statusInfo.textContent === 'Unread'){
                unreadRadio.checked = true;
            }
            singleEditing = true;
        })

        pageCountHolder.append(pageIcon, bookPageCount);
        bookInfoHolder.append(bookName, authorName, hr1, pageCountHolder, statusDiv, randomId)
        card.append(imgHolder, bookInfoHolder, buttonHolder);
        card.classList.add('card');
        main.append(card);
};
readRadio.addEventListener('change', () => {
    if (readRadio.checked) {
        radioCheck = 'read';
    }
});

unreadRadio.addEventListener('change', () => {
    if (unreadRadio.checked) {
        radioCheck = 'unread';
    }
});
addButton.addEventListener('click', (e) =>{
    e.stopPropagation();
    modalAddButton.textContent = 'Add Book';
    modalCard.classList.add('active');
    addingBook = true;
    modalOverlay.classList.add('active');
});

modalCloseButton.addEventListener('click', () => {
    modalCard.classList.remove('active');
    modalOverlay.classList.remove('active');
    for(let i = 0; i < modalForm.length; i++){
        modalForm[i].value = ''; 
        modalForm[i].checked = false;
    }
});
modalCancelButton.addEventListener('click', () => {
    modalCard.classList.remove('active');
    modalOverlay.classList.remove('active');
    for(let i = 0; i < modalForm.length; i++){
        modalForm[i].value = ''; 
        modalForm[i].checked = false;
    }
});
modalOverlay.addEventListener('click', (e) => {
    if(modalCard.contains(e.target) === false){
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = ''; 
            modalForm[i].checked = false;
        }
    }
});
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(editing){
        createBook(modalBookName.value, modalAuthorName.value, modalPageInput.value, radioCheck);
        savedBooks[bookIndex].name = modalBookName.value;
        savedBooks[bookIndex].author = modalAuthorName.value;
        savedBooks[bookIndex].pages = modalPageInput.value;
        
        infoToEdit[0].textContent = modalBookName.value;
        infoToEdit[1].textContent = modalAuthorName.value;
        pageDivToEdit[1].textContent = modalPageInput.value;
        
        if(radioCheck === 'read'){
            statusInfoArray[1].textContent = 'Read';
            statusInfoArray[0].src = 'icons/green_dot-removebg-preview.png';
            statusInfoArray[2].style.backgroundColor = 'rgb(7, 23, 29)';
            statusInfoArray[2].style.color = 'rgb(24, 231, 79)';     
            savedBooks[bookIndex].status = 'read';      
        }else if(radioCheck === 'unread'){
            statusInfoArray[1].textContent = 'Unread';
            statusInfoArray[0].src = 'icons/red_dot-removebg-preview.png';
            statusInfoArray[2].style.backgroundColor = 'rgb(22, 13, 30)';
            statusInfoArray[2].style.color = 'rgb(247, 42, 77)';  
            savedBooks[bookIndex].status = 'unread'; 

        }
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = '';
            modalForm[i].checked = false;
        }
        editing = false;
    }
    else if(addingBook == true){
        createBook(modalBookName.value, modalAuthorName.value, modalPageInput.value, radioCheck);
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        displaySingleBook(savedBooks);
        
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = ''; 
            modalForm[i].checked = false;
        }
        addingBook = false;
        overView();
    }else if(singleEditing == true){
        e.preventDefault();
        
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        for(let i = 0; i < savedBooks.length; i++){
            if(savedBooks[i].id != bookId){
                continue;
            }else if(savedBooks[i].id == bookId){
                savedBooks[i].name = modalBookName.value;
                savedBooks[i].author = modalAuthorName.value;
                
                singleEditArray[0].textContent = modalBookName.value;
                singleEditArray[1].textContent = modalAuthorName.value;
                singlePageCountArray[1].textContent = modalPageInput.value;
                if(radioCheck === 'read'){
                    singleCardStatus[1].textContent = 'Read';
                    singleCardStatus[0].src = 'icons/green_dot-removebg-preview.png';
                    singleStatus.style.backgroundColor = 'rgb(7, 23, 29)';
                    singleStatus.style.color = 'rgb(24, 231, 79)';     
                }else if(radioCheck === 'unread'){
                    singleCardStatus[1].textContent = 'Unread';
                    singleCardStatus[0].src = 'icons/red_dot-removebg-preview.png';
                    singleStatus.style.backgroundColor = 'rgb(22, 13, 30)';
                    singleStatus.style.color = 'rgb(247, 42, 77)';  

                }
            }
        }
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = ''; 
            modalForm[i].checked = false;
        }
        singleEditing = false;
    }
    
});
createBook('Meditations', 'Marcus Aurelius', 200, 'read'.toLowerCase());
displayBook(savedBooks);
function overView(){
    let mainChildrenCards = [];
    mainChildrenCards = Array.from(main.childNodes);
    let a = 0;
    let b = 0;
    let c = 0;
    for(let i = 0; i < mainChildrenCards.length; i++){
        a++;
        let cardArray = mainChildrenCards[i].childNodes;    
        let infoHolderArray = cardArray[1].childNodes;
        let statusHolderArray = infoHolderArray[4].childNodes;
        if(statusHolderArray[1].textContent == 'Read'){
            b++;
        }
        else if(statusHolderArray[1].textContent == 'Unread'){
            c++;
        }
    }
    console.log(a);
    overTotal.textContent = a;
    overRead.textContent = b;
    overUnread.textContent = c;
}

toggleReadBooks.addEventListener('click', (e) => {
    let mainChildrenCards = [];
    mainChildrenCards = Array.from(main.childNodes);
    for(let i = 0; i < mainChildrenCards.length; i++){
        let cardArray = mainChildrenCards[i].childNodes;    
        let infoHolderArray = cardArray[1].childNodes;
        let statusHolderArray = infoHolderArray[4].childNodes;
        if(statusHolderArray[1].textContent == 'Read'){
            mainChildrenCards[i].style.display = 'grid';
        }
        if(statusHolderArray[1].textContent == 'Unread'){
            mainChildrenCards[i].style.display = 'none'
        }
        console.log(mainChildrenCards[i]);
        
    }
    
});
toggleUnreadBooks.addEventListener('click', (e) => {
    let mainChildrenCards = [];
    mainChildrenCards = Array.from(main.childNodes);
    for(let i = 0; i < mainChildrenCards.length; i++){
        let cardArray = mainChildrenCards[i].childNodes;    
        let infoHolderArray = cardArray[1].childNodes;
        let statusHolderArray = infoHolderArray[4].childNodes;
        if(statusHolderArray[1].textContent == 'Read'){
            mainChildrenCards[i].style.display = 'none';
        }
        if(statusHolderArray[1].textContent == 'Unread'){
            mainChildrenCards[i].style.display = 'grid';
        }
        console.log(mainChildrenCards[i]);
    }
});
toggleAllBooks.addEventListener('click', (e) => {
    let mainChildrenCards = [];
    mainChildrenCards = Array.from(main.childNodes);
    for(let i = 0; i < mainChildrenCards.length; i++){
        let cardArray = mainChildrenCards[i].childNodes;    
        let infoHolderArray = cardArray[1].childNodes;
        let statusHolderArray = infoHolderArray[4].childNodes;
        if(statusHolderArray[1].textContent == 'Read'){
            mainChildrenCards[i].style.display = 'grid';
        }
        if(statusHolderArray[1].textContent == 'Unread'){
            mainChildrenCards[i].style.display = 'grid';
        }
        console.log(mainChildrenCards[i]);
    }
})