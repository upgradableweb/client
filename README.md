# @upgradableweb/client

<h6>conpact fetch functionalities for react, react-native and nextjs with base url and custom header fuctinality</p>

<h2>Supported methods GET, POST, PUT, PATCH, DELETE</h1>

  
  <h4>Example and reference for how to use</h2>

  
  <h3>POST</h3>
  
    const data = await POST(/api/login, body)

 <p>Or</p>

    POST(/api/login, body)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })

  <p>Or</p>
        const onError = (err) =>{
          alert(err.message)
        }
      function onResonse(res){
        //your setData with formate response
        setData(res)
      }

       POST(/api/login, body,{ onResonse, onError })

<h3>GET</h3>
  
    const data = await GET(/api/login)

 <h2>Use same method FOR All http methods</h2>


<h1>Setting BASEURL & Headers</h1>

    import { fetchConfig } from '@upgradableweb/client'
    fetchConfig.baseUrl = 'https://api.example.com'

    fetchConfig.headers = { authorization: 'Bearer token' }
 
 <p>header asigning method { 'Content-Type': 'application/json', ...fetcher.headers, }</p>

<p>Package manager</p>
  Using npm
  
    $ npm install @upgradableweb/client
  
<h3>Other passing options</h3>
<code>fetchConfig.cache | one of "default", "force-cache", "no-cache", etc
  fetchConfig.next | for nextjs { revalidate: number, tags: [] }</code>


<h2>Default beavior</h2>
<code><h3>1. if url starts with http then baseUrl not taken as url</h3>
fetchConfig.baseUrl = 'https://example.com'
await GET('https://api.example.com/login')
//reqest to https://api.example.com/login</code>
<code><h3>2. if you set authorization while fetching time then default is overight</h3>
fetchConfig.headers = { authorization: 'Bearer token1' }  
await GET('https://api.example.com/login',{ authorization: 'Bearer token2'}) 
//Bearer token2 will be assigned</code>

### License

This software is licensed under the MIT License.

