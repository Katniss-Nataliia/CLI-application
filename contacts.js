const fs = require('fs');
const path = require('path');

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
        
        contacts.map(contact => {
            if(contact.id === contactId){
                delete contact;
                return contact
            }
            console.log(contact)
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
    })
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact

}