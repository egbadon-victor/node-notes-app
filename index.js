import yargs from "yargs";

import { addNote, deleteNote, listNotes, readNote } from "./notes.js";

const argv = yargs(process.argv.splice(2))

//Add a note
argv.command({
    command: "add",
    describe: "Add a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"Note Body",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        addNote(argv.title, argv.body)
    }
})

//Delete a note
argv.command({
    command: "delete",
    describe: "Delete a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        deleteNote(argv.title)
    }
})

//List notes
argv.command({
    command: "list",
    describe: "List all notes",
    handler(argv){
        listNotes()
    }
})

//Read a note
argv.command({
    command: "read",
    describe: "Read the contents of a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        readNote(argv.title)
    }
})

argv.parse()