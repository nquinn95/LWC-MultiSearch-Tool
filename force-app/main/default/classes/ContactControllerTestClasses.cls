@isTest
public class ContactControllerTestClasses{
     @isTest static void testGetContacts(){

        Contact r = new Contact(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-1234');

        insert r; 


        List<Contact> valid_list = TestContactsController.getContactList('Test', 'Test', 'test@testemail.com', '555');

        System.assert(valid_list.size() > 0, 'No contacts found');


    }

    @isTest static void testFirstNameContact(){

        Contact r = new Contact(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-1234');

        insert r; 


        List<Contact> first_name_list = TestContactsController.getContactList('Test', null, null, null);
        System.assert(first_name_list.size() > 0, 'Contact first name not found');
    }

    @isTest static void testLastNameContact(){
        Contact r = new Contact(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-1234');

        insert r; 

        List<Contact> last_name_list = TestContactsController.getContactList(null, 'Test' ,null, null);
        System.assert(last_name_list.size() > 0, 'Contact last name not found');
    }

    @isTest static void testEmailContact(){
        Contact r = new Contact(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-1234');

        insert r; 

        List<Contact> email_list = TestContactsController.getContactList(null, null, 'test@testemail.com', null);
        System.assert(email_list.size() > 0, 'Contact email not found');
    }

    @isTest static void testPhoneContact(){
        Contact r = new Contact(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-1234');

        insert r; 

        List<Contact> phone_number = TestContactsController.getContactList(null, null, null, '555');
        System.assert(phone_number.size() > 0, 'Contact phone number not found'); 
    }

}