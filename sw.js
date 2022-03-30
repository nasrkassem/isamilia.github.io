// sw very fast : run in seperate thread : no relation between it ans js thread 
// sw : you can't deal with DOM
// SW Event Driven : events : listen  handle
// install with service worker  : : set caches 
/*
    caches resources : 
    create cach with name static-cach : (
        index.html
        contact.html
        up/1.jpg
        up/2.jpg
    )
caches (open (create cach) , match , delete , keys , put) API
*/

let cachname="static-cache";
let cachedassets=[
'./index.html',
'./contact.html',
'./UP/1.jpg',
'./UP/2.jpg',
'./style.css',
'./fallback.json'
];


self.addEventListener('install',async function(){
    // create cach
    // console.log("Install"); 
    let createdcach=await caches.open(cachname);
    await createdcach.addAll(cachedassets);
    // skipWaiting
    await self.skipWaiting();

});//end of install
// activate : clear cach
self.addEventListener('activate',async function(){
    // console.log("activate");

    // load all caches names 
    // loop over it : compare between current iterated cach name with opend cach : match : leav , mismatch : delete this cach
    // let allcaches=await caches.keys();
    // for(let i = 0 ; i < allcaches.length;i++){
    //     if(allcaches[i]!=cachname)
    //     {
    //         // remove old cachfiles
    //        await  caches.delete(allcaches[i]);
    //     }
    // }

});//end of activate
// fetch : fetch data : create dynamic cahc : save data 
self.addEventListener("fetch",async function(event){
    // console.log("Fetch",event.request);

    // cachfirst : load requests from cach : network

  //return  await event.respondWith(caches.match(event.request));// cache first
  // test : if online : fetch request from netwrok 
  // if offline : fetch request from cach
  // BOM : navigator.onLine
  if(!navigator.onLine){
      // offline : fetch data from cache
    //   return await event.respondWith(caches.match(event.request));
    return await event.respondWith(cachfirst(event.request));
  }else{
      //online ://  fetch data from netwrok
    //   return await event.respondWith(fetch(event.request));
    return await event.respondWith(netwrokfirst(event.request));
  }
});//end of fetch

async function cachfirst(req){
    return await caches.match(req)||await caches.match('fallback.json'); 
}
async function netwrokfirst(req){
    // from netwroking : cach any request : create anothercahc (dynamiccach : aching for any reuest from server)
    let dynamiccach=await caches.open('cache-dynamic');
    let resp=await fetch(req);
    await dynamiccach.put(req,resp.clone());
    return resp;
}




