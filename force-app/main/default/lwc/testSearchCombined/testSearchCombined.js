import { LightningElement, track } from 'lwc';
//import { showToastEvent } from 'lightning/platformShowToastEvent';
import getContactList from '@salesforce/apex/TestContactsController.getContactList';
import getTestLeads from '@salesforce/apex/TestLeadsController.getTestLeads';
import getTaskList from '@salesforce/apex/TestTasksController.getTaskList';
import createNewTask from '@salesforce/apex/TestCreateNewTaskController.createNewTask'; 
import { NavigationMixin } from 'lightning/navigation';

//import { getRecord, getRecordNotifyChange } from 'lightning/uiRecordApi';
//import apexUpdateRecord from '@salesforce/apex/Controller.apexUpdateRecord';
 
const columnContacts = [
  {
    label: "View",
    type: "button-icon",
    initialWidth: 75,
    typeAttributes: {
      iconName: "action:preview",
      title: "Preview",
      variant: "border-filled",
      alternativeText: "View",
      disabled: false,
    }
  },
  { label: "First Name", fieldName: "FirstName" },
  { label: "Last Name", fieldName: "LastName" },
  { label: "Email", fieldName: "Email", type: "Email" },
  { label: "Account Name", fieldName: "Account.Name", type: "text" },
  { label: "Phone", fieldName: "Phone", type: "Phone" },
  { label: "Mobile Phone", fieldName: "MobilePhone", type: "Phone" },
  { label: "Other Phone", fieldName: "OtherPhone", type: "Phone" }
];

const columnLeads = [
    {
        label: "View",
        type: "button-icon",
        initialWidth: 75,
        typeAttributes: {
          iconName: "action:preview",
          title: "Preview",
          variant: "border-filled",
          alternativeText: "View",
          disabled: false,
        }
      },
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type: 'Email' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'Phone'}
]

const columnTasks = [
    { label: 'Subject', fieldName: 'Subject'},
    { label: 'Status', fieldName: 'Status'},
    { label: 'Due Date', fieldName: 'ActivityDate', type:'Date'},
    { label: 'Contact Name', fieldName: 'ContactName' },
    { label: 'Account Name', fieldName: 'AccountName' },
    { label: 'Assigned To', fieldName: 'OwnerName'}
]

const comboboxOptions = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 11, value: 11 },
    { label: 12, value: 12 },
    { label: 13, value: 13 },
    { label: 14, value: 14 },
    { label: 15, value: 15 },
    { label: 16, value: 16 },
    { label: 17, value: 17 },
    { label: 18, value: 18 },
    { label: 19, value: 19 },
    { label: 20, value: 20 },
    { label: 21, value: 21 },
    { label: 22, value: 22 },
    { label: 23, value: 23 },
    { label: 24, value: 24 },
    { label: 25, value: 25 },
    { label: 26, value: 26 },
    { label: 27, value: 27 },
    { label: 28, value: 28 },
    { label: 29, value: 29 },
    { label: 30, value: 30 },

]


export default class TestSearchCombined extends NavigationMixin(LightningElement) {

    //declaring our columns for the data tables
    @track columnContacts = columnContacts;
    @track columnLeads = columnLeads;
    @track columnTasks = columnTasks;
    
    //
    @track contacts;
    @track leads;
    @track tasks;



    //boolean to show modal
    @track newTaskModal = false;

    //our variables for our search forms
    contactFirstName;
    contactLastName;
    contactEmail;
    contactPhone;
    contactCompany;

    //variables for the input for creating a new task
    newTaskSubject;
    newTaskStatus;
    newTaskPriority;
    newTaskContact;
    newTaskWhatId;
    newTaskUserId;


    //combobox vars
    comboboxOptions = comboboxOptions; 
    daysValue; 

    //variable for the user input for searching tasks
    searchTask;

    //label name
    @track accountLabel = 'Account';
    @track contactLabel= 'Contact';
    @track ownerLabel= 'Task Owner';
    


    
    //declared variable for whether we are displaying data or not
    @track booleanShowContacts = false;
    @track booleanShowLeads = false;


    @track booleanShowTasks= false;


    //handlers for each input field
    contactFirstNameChangeHandler(event){
        this.contactFirstName = event.target.value;
    }
    contactLastNameChangeHandler(event){
        this.contactLastName = event.target.value;
    }
    contactEmailChangeHandler(event){
        this.contactEmail = event.target.value;
    }
    contactCompanyChangeHandler(event){
        this.contactCompany = event.target.value;
    }
    contactPhoneChangeHandler(event){
        this.contactPhone = event.target.value;
    }

    //handler for looking up tasks
    taskSearchChangeHandler(event){
        this.searchTask = event.target.value;
    }


    //handlers for the input fields when creating a new task
    taskSubjectChangeHandler(event){
        this.newTaskSubject = event.target.value;

        console.log(this.newTaskSubject);
    }
    taskStatusChangeHandler(event){
        this.newTaskStatus = event.target.value;
    }

    taskPriorityChangeHandler(event){
        this.newTaskPriority = event.target.value;
    }


    //lookup selection handler
    handleContactSelection(event){
        this.newTaskName = event.detail;
    }

    handleUserSelection(event){
        this.newTaskUserId = event.detail;
        console.log(this.newTaskUserId);
    }

    handleAccSelection(event){
        this.newTaskWhatId = event.detail;
    }

    //handler for the combobox change
    assignmentDaysChangeHandler(event){
        this.daysValue = event.detail.value;
    }

    
    //one function to handle both the leads and contact list search
    searchComponents(){


        getContactList({searchTerm: this.contactFirstName, searchTerm2: this.contactLastName, searchTerm3: this.contactEmail, searchTerm4: this.contactPhone})
        .then(result =>{

            console.log(result);
            this.contacts = result;
            console.log('this.contacts:'+ this.contacts)

            if(this.contacts.length > 0){
                this.booleanShowContacts = true; 
            } else{
                this.booleanShowContacts = false; 
            }
        })
        .catch(error =>{
            this.errorMsg = error;
            this.booleanShowContacts = false;
            console.log(this.booleanShowContacts);
            console.error(this.errorMsg)
        })

        getTestLeads({searchTerm: this.contactFirstName, searchTerm2: this.contactLastName, searchTerm3: this.contactEmail, searchTerm4: this.contactPhone, searchTerm5: this.contactCompany})
        .then(result => {
            this.leads = result; 
            
            if(this.leads.length > 0){
                this.booleanShowLeads = true;
            } else{
                this.booleanShowLeads = false;
            }

        })
        .catch(error => {
            this.errorMsg = error;
            this.booleanShowLeads = false;
            console.error(this.errorMsg);
        })
  }

  //function that lets us search for tasks on button click, right now configured to search by subject
  taskSearchButton(){
    getTaskList({searchTerm : this.searchTask})
    .then(result => {



        let flatData = [];
        //create  for loop here to get around nested objects not being supported by datatables
        for(let i =0; i < result.length; i++ ){
            let currentObj = 
            { 
                Subject: result[i].Subject,
                Status: result[i].Status,
                ActivityDate: result[i].ActivityDate,
                ContactName: result[i].Who.Name,
                AccountName: result[i].What.Name,
                OwnerName: result[i].Owner.Name
            };
            flatData.push(currentObj);
            console.log(flatData);

        }
        this.tasks = flatData;

        if(this.tasks.length > 0){
            this.booleanShowTasks=true; 
        } else{
            this.booleanShowTasks = false;
        }




        console.log(this.searchTask + ' AFTER IF STATEMENT') 

    })
    .catch(error => {
        this.errorMsg = error;
        this.booleanShowTasks = false;
        console.error(this.errorMsg);
    })
  }





  //button press for creating a new contact
    createNewContact(){
    console.log('createNewContact has been clicked')
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes:{
            objectApiName: 'Contact',
            actionName: 'new'
        }
    });
}

    //button press for creating a new lead
    createNewLeads(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Lead',
                actionName: 'new'
            }
        });
    }

    //button press for opening the modal to create a new task
    createNewTaskOpen(){
        //code goes in here for creating a new task on button click
        this.newTaskModal = true;


        console.log("open sesame");
    }

    //this is the function that runs on the cancel button, just closes the modal
    createNewTaskClose(){
        this.newTaskModal = false;
    }


    //here is the function that runs on the save button in the modal, creates a new task and then closes the modal
    createNewTaskSaveClose(){
        createNewTask({taskSubject: this.newTaskSubject, taskStatus: this.newTaskStatus, contactId: this.newTaskName, userId: this.newTaskUserId, accId: this.newTaskWhatId, taskPriority: this.newTaskPriority, taskDueDate: this.daysValue});
        this.newTaskModal = false; 
    }

    //end task modal functions 

    
    //funciton to open up the standard record page for Contact using navigationmixin
    getContactId(event){

        this.contactObj = JSON.parse(JSON.stringify(event.detail.row)); 
        //console.log(this.contactId);
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId: this.contactObj.Id,
                objectApiName: 'Contact',
                actionName: 'view',
            }
        });
    }

    //funciton to open up the standard record page for Leads using navagationmixin, getting the record ids from each row
    getLeadId(event){
        
        this.leadObj = JSON.parse(JSON.stringify(event.detail.row));
        console.log(this.leadObj);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId: this.leadObj.Id,
                objectApiName: 'Lead',
                actionName: 'view',
            }
        });
    }
}



//____________________________________________________________________________
//NEW TASK
// ___________________________________________________________________________
//using "task" standard object
//add a button with the name of new task
//click on button and show the UI where the user can put in information
//then click on save button and we can scroll through a list of tasks that are created.  create a new, new task button in the same page as what I have been doing.  
//add a a new datatable with tasks, including a new task button like with contacts and leads



//maybe start with a list of all users that have tasks, and then the searchbar can be used to filter them

//can get around date select by having an input box for each of yyyy-dd-mm

//for getting contact id, create a new apex controller function where you use a contact name and then use that to grab the contact Id and then feed that back into the the search