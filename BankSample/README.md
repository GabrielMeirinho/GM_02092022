# BankSample
  Bank Sample

# To run the project it is required to deploy both ( Server and Portal ) solutions.
# Required to deploy server side using uvicorn at the server side
  uvicorn main:app --reload
  
  After installation of all required ( node js and python, angular cli and update dependencies ) it is just required to run the portal deploying by ng serve.
  
  Python version used ( 3.8 )
  
  The pages have a simple menu of accounts list and creation of accounts ( no validation for accounts creation, just removal of duped accounts ) 
  The pages require some pretify and js/bootstrap. ( just the basic functionality is there ).
  
  The backend is deployed with docs so after deployment ( use /docs after port number, to have similar swagger features )
  
  The frontend is deployed at 4200 ( pattern of angular 14. ) 
  
  
  That is all required to run the application.

