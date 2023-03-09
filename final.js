const puppeteer = require('puppeteer');
const express = require('express')
const path = require('path')
const app = express();
const url = require('url')
const axios = require('axios')
app.use(express.urlencoded({extended:true}))

const {join} = require('path');


/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res) => {
  res.render('view')
})
const PORT = process.env.PORT || 3030;


app.post ('/', async(req,res)=> {

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    var url = req.body.link
    const k = new URL(url)

    await page.goto(url, { waitUntil: 'networkidle0' });
    var time =0;
    if ( k.hostname==='maps.app.goo.gl'){
      time=6000;
      setTimeout(async()=> {
        // console.log(time)
        // console.log(k.hostname)
        const currentUrl = await page.url();
        // console.log(url)
        // console.log(currentUrl);
        // console.log('\n')
        
  
  
        const { hash, hostname ,pathname,search} = new URL(currentUrl);
        if (hostname==='www.openstreetmap.org') {
          const array = hash.split('/')
        //   console.log(array);
          var latitude = array[1]
          var longitude = array[2]
        //   console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
        //   console.log(geo.href)
          res.redirect(geo.href)
  
        }
        else if (hostname==='captcha.2gis.ru') {
          const array = search.split('%2F')[7].split('%2C')
          var latitude = array[0]
          var longitude = array[1]
        //   console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
        //   console.log(geo.href)
          res.redirect(geo.href)
        }
        else if (hostname==='maps.apple.com'){
          const arr1 = search.split('=')
          const arr2 = arr1[2].split('%2C')
          const latitude = arr2[0]
          const longitude = arr2[1].split('&')[0]
        //   console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
        //   console.log(geo.href)
          res.redirect(geo.href)
        }
        else if (hostname==='www.google.com'){
          const array = pathname.split('@')[1].split(',')
          const latitude = array[0]
          const longitude = array[1]
        //   console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
        //   console.log(geo.href)
          res.redirect(geo.href)
        }
        else {
          console.log('err')
        }
      
      },time)
    }
    else if (k.hostname==='www.google.com' || k.hostname==='goo.gl' || k.hostname==='maps.apple.com') {
      time= 1500;
      setTimeout(async()=> {
        console.log(time)
        console.log(k.hostname)
        const currentUrl = await page.url();
        console.log(url)
        console.log(currentUrl);
        console.log('\n')
        
  
  
        const { hash, hostname ,pathname,search} = new URL(currentUrl);
        if (hostname==='www.openstreetmap.org') {
          const array = hash.split('/')
          console.log(array);
          var latitude = array[1]
          var longitude = array[2]
          console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
          console.log(geo.href)
          res.redirect(geo.href)
  
        }
        else if (hostname==='captcha.2gis.ru') {
          const array = search.split('%2F')[7].split('%2C')
          var latitude = array[0]
          var longitude = array[1]
          console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
          console.log(geo.href)
          res.redirect(geo.href)
        }
        else if (hostname==='maps.apple.com'){
          const arr1 = search.split('=')
          const arr2 = arr1[2].split('%2C')
          const latitude = arr2[0]
          const longitude = arr2[1].split('&')[0]
          console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
          console.log(geo.href)
          res.redirect(geo.href)
        }
        else if (hostname==='www.google.com'){
          const array = pathname.split('@')[1].split(',')
          const latitude = array[0]
          const longitude = array[1]
          console.log(latitude,longitude)
          const geo = new URL('geo://' + latitude + ',' + longitude)
          console.log(geo.href)
          res.redirect(geo.href)
        }
        else {
            
          console.log('err')
        }
      
      },time)
    }
    else {
        // console.log(k.hostname)
        // console.log(time)
        axios.get(url)
        .then(data => {
          const currentUrl = data.request.res.responseUrl
          const { hash, hostname ,pathname,search} = new URL(currentUrl);
            if (hostname==='www.openstreetmap.org') {
            const array = hash.split('/')
            // console.log(array);
            var latitude = array[1]
            var longitude = array[2]
            // console.log(latitude,longitude)
            const geo = new URL('geo://' + latitude + ',' + longitude)
            // console.log(geo.href)
            res.redirect(geo.href)
    
            }
            else if (hostname==='captcha.2gis.ru') {
            const array = search.split('%2F')[7].split('%2C')
            var latitude = array[0]
            var longitude = array[1]
            // console.log(latitude,longitude)
            const geo = new URL('geo://' + latitude + ',' + longitude)
            // console.log(geo.href)
            res.redirect(geo.href)
            }
            else if (hostname==='maps.apple.com'){
            const arr1 = search.split('=')
            const arr2 = arr1[2].split('%2C')
            const latitude = arr2[0]
            const longitude = arr2[1].split('&')[0]
            // console.log(latitude,longitude)
            const geo = new URL('geo://' + latitude + ',' + longitude)
            // console.log(geo.href)
            res.redirect(geo.href)
            }
   
        })
    }





  }

    catch (err){
    //   console.log(err)
    }
  })
app.listen(PORT,()=> {
  console.log(`Listening on ${PORT}`)
})


