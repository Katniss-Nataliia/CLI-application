const { error } = require('console');
const fs = require('fs');
const path = require('path');
const { constrainedMemory } = require('process');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if(err){
            console.error(err);
            return
        }
        const contacts = JSON.parse(data);
        console.log(contacts)
    })
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data)=>{
        if(err){
            console.err(err);
            return
        }
        const contacts = JSON.parse(data);
        const contact = contacts.find(c=>c.id === contactId);

        if(contact){
            console.table([contact]);
        }else{
            console.log(`Contact with this id: ${contactId} does not exist`);
        }
    })
  }
  
  function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data)=>{
        if (err){
            console.err(err);
            return;
        }
        const contacts = JSON.parse(data);
        
        const contact = contacts.filter(c=>c.id === contactId);
        fs.writeFile(contactsPath, JSON.stringify(contact, null, 2), err => {
            if(err){
                console.error(err);
            }
            console.log(`contact with ID:${contactId} removed successfully`)
        })
    })


  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf-8', (err, data)=>{
        if(err){
            console.err(err);
            return;
        }
        const contacts = JSON.parse(data);
        const newContact = {name, email, phone};

        contacts.push(newContact);
        console.log(contacts)
    fs.writeFile(contactsPath, JSON.stringify(contacts), err=>{
        if(err){
            console.log(err)
        }
        console.log('The file has been saved!');

    })
    })
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact

}