@isTest
public class LeadsControllerTestClasses {

    @isTest static void testGetLeads(){
        Lead l = new Lead(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-6789', company = 'New Company');

        insert l;

        List<Lead> lead_list = TestLeadsController.getTestLeads('Test', 'Test', 'test@testemail.com', '555', 'New Company');

        System.assert(lead_list.size() > 0, 'No Leads found');
    }

    @isTest static void testLeadFirstName(){
        Lead l = new Lead(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-6789', company = 'New Company');

        insert l;

        List<Lead> lead_first = TestLeadsController.getTestLeads('Test', null, null, null, null);
        
        System.assert(lead_first.size()> 0, 'No lead first name found'); 
    }

    @isTest static void testLeadLastName(){
        Lead l = new Lead(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-6789', company = 'New Company');

        insert l;

        List<Lead> lead_last = TestLeadsController.getTestLeads(null, 'Test', null, null, null);

        System.assert(lead_last.size() > 0, 'No lead last name found');
    }

    @isTest static void testLeadEmail(){
        Lead l = new Lead(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-6789', company = 'New Company');

        insert l;

        List<Lead> lead_email = TestLeadsController.getTestLeads(null, null, 'test@testemail.com', null, null);

        System.assert(lead_email.size()> 0, 'NO lead email found');
    }

    @isTest static void testLeadPhone(){
        Lead l = new Lead(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-6789', company = 'New Company');

        insert l;

        List<Lead> lead_phone = TestLeadsController.getTestLeads(null, null, null, '555', null);

        System.assert(lead_phone.size()>0, 'No lead phone found');
    }

    @isTest static void testLeadCompany(){

        Lead l = new Lead(firstname = 'Test', lastname = 'Test', email = 'test@testemail.com', phone = '(555) 555-6789', company = 'New Company');

        insert l;

        List<Lead> lead_company = TestLeadsController.getTestLeads(null, null, null, null, 'New');

        System.assert(lead_company.size()>0, 'No lead company found'); 
    }

}
