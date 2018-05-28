ToDo Backend:
Banning controller
Banning middleware
Truncate user input length on smaller pwd,name,etc
Do you need to check url params/ip length?
Support non token boards
Delete routes might need some attention
Make sure thread_post_id exists in comments::createcomment sql
Similar sql error to above in reports::createReport sql
Restrict file type upload
Redirect unknowns to frontend
Thread/comments/etc not sending back banned posts
Tests for all the above and auth
Rename backend routes to differ than frontend ReactRouter routes for clarity
Sync up sql responses with just stuff clients end up using
Binding to sigint in dbconfig seems to stall exiting so have to call it manually. Might be windows thing. Fix it.


ToDo frontend:
Private route fix
Login redirect
Report interface
Super basic skeleton with basically just routing, no validation
need to fix and update to most recent webpack version (move hard css from uploads)
Add prop types
Remove localhost and use relative path
Put all reducers in reducer.js file like sagas
Protected routes
Find someone intrested in front end to flush this out & do tests