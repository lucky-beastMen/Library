function Book(name, author, pages){
    this.name = name;
    this.author = author;
    this.pages = pages;
    const id = crypto.randomUUID();
    this.id = id;
}
const savedBooks = [];
function createBook(name, author, pages){
    const curBook = new Book(name, author, pages);
    savedBooks.push(curBook)
}
createBook('Meditations', 'Marcus Aurelius', 200);
createBook('The art of war', 'Sun Tzu', 300);

console.log(savedBooks);
