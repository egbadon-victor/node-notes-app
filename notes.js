import chalk from "chalk";
import fs from "fs";

const getNotes = ()=>{
    //returns notes as an array of objects from the notes.json file
    try{
       const dataBuffer =  fs.readFileSync("notes.json");
       const dataJSON = dataBuffer.toString();
       const data = JSON.parse(dataJSON)
       return data;
    }catch(e){
        return []
    }
}
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON)
}

const isDuplicateNote = (title)=>{
   const notes = getNotes()

   return notes.find((note)=> note.title === title);
}

export const addNote = (title, body)=>{
    
    if (isDuplicateNote(title)){
        console.log(chalk.yellow("Note title taken"))
    } else{
        const notes = getNotes()
        notes.push({
            title, body
        })
        saveNotes(notes);
        console.log(chalk.green("Note added successfully"))
    }
}

export const deleteNote = (title) => {
    const notes = getNotes()
    const newNotes = notes.filter((note)=> {
        return note.title !== title 
    })

    if (newNotes.length !== notes.length){
        saveNotes(newNotes)
        console.log(chalk.green("Note deleted successfully"))
    } else{
        console.log(chalk.red("Note does not exist"))
    }
}

export const listNotes = () =>{
    const notes = getNotes();

    console.log(chalk.gray.bold("Here are your notes...\n"))
    notes.forEach((note)=>{
        console.log(chalk.yellow(note.title))
    })
}

export const readNote = (title) =>{
    const notes =  getNotes();

    const note = notes.find((note)=> note.title === title )

    console.log(chalk.inverse.gray(chalk.bold(note.title.toUpperCase())))
    console.log(note.body)
}


