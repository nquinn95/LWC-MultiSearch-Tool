import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import { getRecord } from 'lightning/uiRecordApi';
//going to need to import track and toast


export default class TestSearchForm extends LightningElement {

    //need track variables for each of the possible inputs, first name, last name, email, phone number, contacts
    @track contactFirstName = '';
    @track contactLastName = '';
    @track contactEmail = '';
    @track contactCompany= '';
    @track contactPhone = '';


    //created handlers for each field
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

    //need an onClick handler for the submit button.

    searchComponents(){
        
        //fires off a custom event everytime the search button is clicked.  the event give the contactLastName to the e
        const searchRelated = new CustomEvent("getsearchlast", {
            detail: {
                firstName: this.contactFirstName,
                lastName: this.contactLastName,
                email: this.contactEmail,
                company: this.contactCompany,
                phone: this.contactPhone

        }});

        //dispatches the event so it can be read in the parent
        this.dispatchEvent(searchRelated);
    
    }

    //going to need a contact found component here? possibly


    //toast notification here
    showToast(title, message, variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        })
        this.dispatchEvent(evt);
    }

}