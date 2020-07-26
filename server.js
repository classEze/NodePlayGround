const serverCreator=require('http');
const {parse}=require('querystring');

//NOW CREATE SERVER
serverCreator.createServer(requestHandler).listen(3030, ()=>console.log('Listening on port 3030'));

//CALLBACK THAT WAS PASSED TO createServer
function requestHandler(request,response){
   if (request.url=='/' && request.method=='GET')
   {    
    response.write(`
    <!DOCTYPE html>
      <html>
        <head><title>WelcomeAnonymous</title></head>
         <h1> Hello World, Welcome to WeJapa Internships</h1>
         <p> Please enter your name and click Submit</p>
    </html>`
    );
    response.end(`<form action='/' method='POST'>
    	<input type='text' name='userName' />
    	<button type='submit'> Submit</button>
    	</form>
       `);
    console.log(` You just made a GET request to ${request.url}`)
      } 
else if(request.method=='POST'){
let body='';
request.on('data', chunk=> body+=chunk
);
request.on('end', ()=>{ 
   const parsedBody=parse(body);
   response.writeHead(200,{'Content-Type':'text/html'});
   	response.write(`<html>
   		<title> userWelcome</title>
   		<h3> Hello ${parsedBody.userName}, Welcome to WeJapa Internships. </h3>
         </html>`)
         response.end();
   	 console.log(`  You just sent  a post request to ${request.url} `)
});  	
}
else{
        response.writeHead(200, {'Content-Type':'text/html'})
        response.write( 
            `<html> <h1 style="text-align:center; vertical-align:center"> I WOULD HAVE SAID 404, but MISTER/MADAM THIS PAGE DOES NOT EXIST, OKAY???</h1></html>`
         );
        response.end();  
	}
}