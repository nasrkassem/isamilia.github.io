// registeration for service worker : with load event for window 
let postselect,postcontainer;
window.addEventListener('load',async function(){
    // register service worker  : test SW Availability on current browser 
    // 1- test service worker avaolability inside browser : BOM : navigator: 

    // select set of DOm Elements 
    postselect=this.document.getElementById('postsselects');
    postcontainer=this.document.getElementById('postscontainer');
    postselect.addEventListener('change',await displaypostdetails);
    await fillselect();
    if(this.navigator.serviceWorker){
        // sw supported
        console.log("Service worker Supported");
        // 1- registeration for sw 
        // register with seviceworker object inside navigator 
        try{
        await this.navigator.serviceWorker.register('./sw.js');
        console.log("SW Registered");
    }catch(error){
        console.log("SW Not Registered",error);
    }
    }else{
        // sw not supported
        console.log("Service worker Not Supported");
    }
});//end of load
async function fillselect(){
    // loading posts from https://jsonplaceholder.typicode.com/posts
    let resp=await fetch("https://jsonplaceholder.typicode.com/posts");
    let jsobjects=await resp.json();
    // console.log(jsobjects);
    postselect.innerHTML=jsobjects.map(post=>{
        return `<option value="${post.id}">${post.title}</option>`
    })
}
async function displaypostdetails(event){
// console.log(event.target.value);
let targetpostresp = await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`);
let postasjs=await targetpostresp.json();
postcontainer.innerHTML=`
    <div style="border:2px solid black;padding:10px;background-color:lightpink;margin:10px auto;width:80%">
        <h2 style="padding:10px;border:2px solid black;text-align:center;background-color:lightgray;">${postasjs.title}</h2>
        <p style="margin:10px auto;text-align:center;background-color:lightyellow;">${postasjs.body}</p>
    </div>
`;
}