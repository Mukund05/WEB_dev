//install puppeteer to interact with browsers like chrome or chromium
//node .\webautomation.js --url=https://www.hackerrank.com --credential=credential.json
//npm install puppeteer -core
let puppeteer=require("puppeteer");
let minimist =require("minimist");
let fs=require("fs");

let input =minimist(process.argv);

let config=fs.readFileSync(input.credential,"utf-8");
let configjso=JSON.parse(config);

async function run(){
    //start the browser
    let browser=await puppeteer.launch({
        headless:false,
        input:[
            '--start-maximized'
        ],
        defaultViewport: null
    });

    //
    let pages = await browser.pages();
    let page = pages[0];

    //open url in the tab
    await page.goto(input.url); 

    //click on login button
    await page.waitForSelector("a[href='https://www.hackerrank.com/access-account/']"); //wait till the button comes
    await page.click("a[href='https://www.hackerrank.com/access-account/']");           //click the button
    await page.waitFor(2000);                                                           //wait till timer i.e 2sec

    //click on login button
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");
    await page.waitFor(2000);

    //type userid and password
    await page.waitForSelector("input[name='username']");                               //wait for username attribute
    await page.type("input[name='username']",configjso.username);                       //type in username attribute
    
    await page.waitForSelector("input[name='password']");                               //wait for password attribute
    await page.type("input[name='password']",configjso.password);                       //type in password attribute
    await page.waitFor(2000);                                                           //wait for 3sec

    //click on login button
    // await page.waitForSelector("button[data-analytics='LoginPassword']");  
    //don't wait for login as it will depends on username if that comes then login will already there             
    await page.click("button[data-analytics='LoginPassword']");
    await page.waitFor(2000);     


    //goto compete page
    await page.waitForSelector("a[class='nav-link contests']");
    await page.click("a[class='nav-link contests']");
    await page.waitFor(2000);     

    //click on manage contest
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");
    await page.waitFor(2000);

    //count the no. of pages of contest
    await page.waitForSelector("a[data-attr1='Last']");                                 //wait till the attribute load
    let numpage=await page.$eval("a[data-attr1='Last']",function(pa){                  //$eval will work like query selector and get tje query to numpage after excuting the function
        let totalpage=parseInt(pa.getAttribute("data-page"));                           //take the element from the given attribute data-page and convert to int and give it to totpage
        return totalpage;                                                               //the number you get is transfer to numpage
    })
    
    for(let i=0;i<numpage-1;i++){
        await page.waitForSelector("a.backbone.block-center");
        let contesturls=await page.$$eval("a.backbone.block-center", function(returnpromiseurl){
            let saveurl=[];

            for(let i=0;i<returnpromiseurl.length;i++){
                let fetchurl=returnpromiseurl[i].getAttribute('href');
                saveurl.push(fetchurl);
            }
            return saveurl;
        });
        // for(let i=1;i<=contesturls.length;i++){
        //     handlecontest(browser,page,)
        // }
        

    }

    //to close the browser
    browser.close();                                                                    //close the browser
    
}

run();