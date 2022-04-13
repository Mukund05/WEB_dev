(function(){
    let btnaddfolder=document.querySelector("#addfolder");
    let btnaddfile=document.querySelector("#addtextfile");
    let breadcrumb=document.querySelector("#breadcrumb");
    let templates=document.querySelector("#templates");
    let container=document.querySelector("#container");
    let rootpath=breadcrumb.querySelector("a[purpose='path']");

    let divapp=document.querySelector("#app");
    let divapptitlebar=document.querySelector("#app-title-bar");
    let divapptitle=document.querySelector("#app-title");
    let divappmenubar=document.querySelector("#app-menu-bar");
    let divappbody=document.querySelector("#app-body");


    // let divfoldertemplate=templates.content.querySelector(".folder");
    // let divfolder=document.importNode(divfoldertemplate,true);
    let resource=[];
    let cfid=-1;
    let rid=0;
 
    btnaddfolder.addEventListener("click",addfolder);
    btnaddfile.addEventListener("click",addtextfile);
    rootpath.addEventListener("click",viewfolderbreadcrumb);

    function addfolder(){
        let fname=prompt("Enter folder name: ");
        if(fname!=null){
            fname=fname.trim();
        }
        if(!fname){
            alert("Name should be valid.");
            return;
        }
        let alreadyexit=resource.some(r=>r.rname==fname && r.pid==cfid);
        if(alreadyexit==true){
            alert(fname+" name folder is already exist try anything else.");
            return;
        }
        let fid=resource.length;
        let pid=cfid;
        
        addfolderhtml(fname,fid,pid);
        resource.push({
            rname:fname,
            rid:fid,
            rtype:"folder",
            pid:cfid,
        });
        savetostorage();
    }

    function addtextfile(){
        let fname=prompt("Enter folder name: ");
        if(fname!=null){
            fname=fname.trim();
        }
        if(!fname){
            alert("Name should be valid.");
            return;
        }
        let alreadyexit=resource.some(r=>r.rname==fname && r.pid==cfid);
        if(alreadyexit==true){
            alert(fname+" name folder is already exist try anything else.");
            return;
        }
        let fid=resource.length;
        let pid=cfid;
        
        addtextfilehtml(fname,fid,pid);

        resource.isbold=spanbold.getAttribute("pressed")=="true";
        resource.isitalic=spanitalic.getAttribute("pressed")=="true";
        resource.isunderline=spanunderline.getAttribute("pressed")=="true";
        resource.bgcolor=inputbgcolor.value;
        resource.textcolor=inputTextcolor.value;
        resource.font=selectFontFamily.value;
        resource.fontsize=selectFontSize.value;
        resource.text=textarea.value;
        resource.push({
            rname:fname,
            rid:fid,
            rtype:"text-file",
            pid:cfid,
            isbold:false,
            isitalic:false,
            isunderline:false,
            bgcolor:"white",
            textcolor:"black",
            font:"monospace",
            fontSize:"16",

        });
        savetostorage();
    }
    function addtextfilehtml(rname,rid,pid){
        let divtextfiletemplate=templates.content.querySelector(".text-file");
        let divtextfile=document.importNode(divtextfiletemplate,true);

        let srename=divtextfile.querySelector("[action=rename]");
        let sdelete=divtextfile.querySelector("[action=delete]");
        let sview=divtextfile.querySelector("[action=view]");
        let divfname=divtextfile.querySelector("[purpose=name]");
       
    
        srename.addEventListener("click",renametextfile);
        sdelete.addEventListener("click",deleteTextfile);
        sview.addEventListener("click",viewtextfile);

        // let divfname=divfolder.querySelector("[purpose=name]"); not inuse 
        divfname.innerHTML=rname;
        divtextfile.setAttribute("rid",rid);
        divtextfile.setAttribute("rpid",pid);

        container.appendChild(divtextfile);
    }

    function renametextfile(){
        let rfname=prompt("Enter folder name: ");
        if(rfname!=null){
            rfname=rfname.trim();
        }
        if(!rfname){
            alert("Name should be valid.");
            return;
        } 
        let renamef=this.parentNode;
        let divnameHTML=renamef.querySelector("[purpose='name']");
        let orname=divnameHTML.innerHTML;
        let ridTochanged=parseInt(renamef.getAttribute("rid"));
        if(rfname==orname){
            alert("Please enter a new name.")
            return;
        }

        let alreadyexistname=resource.some(r=>r.rname ==rfname && r.rpid==cfid);
        if(rfname==alreadyexistname){
            alert("Name is already exist try different.");
            return;
        }
        //now if all validation passed change tha name
        //changed in HTML
        divnameHTML.innerHTML=rfname;

        //update in resource array
        let resources=resource.find(r=>r.rid==ridTochanged);
        resources.rname=rfname;

        //save to storage
        savetostorage();
    }

    function deleteFolder(){
        let span=this;
        let divfolder=span.parentNode;
        let divname=divfolder.querySelector("[purpose='name']");

        let fidTBD=parseInt(divfolder.getAttribute("rid"));
        let fname=divname.innerHTML;

        let sure=confirm(`Are you sure you want to delete ${fname}`);
        if(!sure){
            return;
        }

        //delete from html
        container.removeChild(divfolder);

        //deleter from stored ram
        deletehelp(fidTBD);

        //delete from storage-or store the new array after deleting from array
        savetostorage();
    }

    function deletehelp(fidTBD){
        let children=resource.filter(r=>r.pid==fidTBD);
        for(let i=0;i<children.length;i++){
            deletehelp(children[i].rid);        //recursion 
        }

        let ridx=resource.findIndex(r=>r.rid==fidTBD);  //find the index to be deleted
        resource.splice(ridx,1);        //splice will remove from array
    }
    function deleteTextfile(){
        let span=this;
        let divfolder=span.parentNode;
        let divname=divfolder.querySelector("[purpose='name']");

        let fidTBD=parseInt(divfolder.getAttribute("rid"));
        let fname=divname.innerHTML;

        let sure=confirm(`Are you sure you want to delete ${fname}`);
        if(!sure){
            return;
        }

        //delete from html
        container.removeChild(divfolder);

        //have to delete it from resource array 
        let ridx=resource.findIndex(r=>r.rid==fidTBD);
        resource.splice(ridx,1);

        //delete from storage-or store the new array after deleting from array
        savetostorage();
    }
    function renamefolder(){
        let rfname=prompt("Enter folder name: ");
        if(rfname!=null){
            rfname=rfname.trim();
        }
        if(!rfname){
            alert("Name should be valid.");
            return;
        }

        let renamef=this.parentNode;
        let divnameHTML=renamef.querySelector("[purpose='name']");
        let orname=divnameHTML.innerHTML;
        let ridTochanged=parseInt(renamef.getAttribute("rid"));
        if(rfname==orname){
            alert("Please enter a new name.")
            return;
        }

        let alreadyexistname=resource.some(r=>r.rname ==rfname && r.rpid==cfid);
        if(rfname==alreadyexistname){
            alert("Name is already exist try different.");
            return;
        }
        //now if all validation passed change tha name
        //changed in HTML
        divnameHTML.innerHTML=rfname;

        //update in resource array
        let resources=resource.find(r=>r.rid==ridTochanged);
        resources.rname=rfname;

        //save to storage
        savetostorage();

    }
    function viewfolder(){
        let span=this;
        let divfolder=span.parentNode;
        let divname=divfolder.querySelector("[purpose='name']");

        let fname=divname.innerHTML;
        let fid=parseInt(divfolder.getAttribute("rid"));

        let apathTemplate=templates.content.querySelector("a[purpose='path']");
        let apath=document.importNode(apathTemplate,true);
       

        apath.innerHTML=fname;
        apath.setAttribute("rid",fid);
        apath.addEventListener("click",viewfolderbreadcrumb);
        breadcrumb.appendChild(apath);

        cfid=fid;
        container.innerHTML="";
        for(let i=0;i<resource.length;i++){
            if(resource[i].pid==cfid){
                if(resource[i].rtype=="folder"){
                    addfolderhtml(resource[i].rname,resource[i].rid,resource[i].pid);
                }else if(resource[i].rtype=="text-file"){
                    addtextfilehtml(resource[i].rname,resource[i].rid,resource[i].pid);
                }
            }
        }

    }

    function viewfolderbreadcrumb(){
        let apath=this;
        let fid=parseInt(apath.getAttribute("rid"));

        //set breadcrumb
        while(apath.nextSibling){
            apath.parentNode.removeChild(apath.nextSibling);
        }

        //set container
        cfid=fid;
        container.innerHTML="";
        for(let i = 0; i < resource.length; i++){
            if(resource[i].pid==cfid){
                if(resource[i].rtype=="folder"){
                    addfolderhtml(resource[i].rname,resource[i].rid,resource[i].pid);
                }else if(resource[i].rtype=="text-file"){
                    addtextfilehtml(resource[i].rname,resource[i].rid,resource[i].pid);
                }
            }
        }


    }
    function viewtextfile(){
        let spanview=this;
        let divtextfile=spanview.parentNode;
        let divname=divtextfile.querySelector("[purpose=name]");
        let fname=divname.innerHTML;
        let fid=parseInt(divtextfile.getAttribute("rid"));

        let divNotepadmenutamplete=templates.content.querySelector("[purpose=notepad-menu]");
        let divnotepadbodymenu=document.importNode(divNotepadmenutamplete,true);
        divappmenubar.innerHTML="";
        divappmenubar.appendChild(divnotepadbodymenu);

        let divnotepadbodytemplate=templates.content.querySelector("[purpose=notepad-body]");
        let divnotepadbody=document.importNode(divnotepadbodytemplate,true);
        divappbody.innerHTML="";
        divappbody.appendChild(divnotepadbody);

        divapptitle.innerHTML=fname;
        divapptitle.setAttribute("rid",fid);

        let spansave=divappmenubar.querySelector("[action=save]");
        let spanbold=divappmenubar.querySelector("[action=bold]");
        let spanitalic=divappmenubar.querySelector("[action=italic]");
        let spanunderline=divappmenubar.querySelector("[action=underline]");
        let inputbgcolor=divappmenubar.querySelector("[action=bg-color]");
        let inputTextcolor=divappmenubar.querySelector("[action=fg-color]");
        let selectFontFamily=divappmenubar.querySelector("[action=font-family]");
        let selectFontSize=divappmenubar.querySelector("[action=font-size]");
        let textarea=divappbody.querySelector("textarea");

        spansave.addEventListener("click",savenotepad);
        spanbold.addEventListener("click",bold);
        spanitalic.addEventListener("click",italic);
        spanunderline.addEventListener("click",underline);
        inputbgcolor.addEventListener("change",inputbgcl);
        inputTextcolor.addEventListener("change",inputtextcl);
        selectFontFamily.addEventListener("change",fontfamily);
        selectFontSize.addEventListener("change",fontsize);

        let resources=resource.find(r=>r.rid==fid);

        spanbold.setAttribute("pressed",!resources.isbold);
        spanitalic.setAttribute("pressed",!resources.isitalic);
        spanunderline.setAttribute("pressed",!resources.isunderline);
        inputbgcolor.value=resources.bgcolor;
        inputTextcolor.value=resources.textcolor;
        selectFontFamily.value=resources.font;
        selectFontSize.value=resources.fontsize;
        textarea.value=resources.text;

        spanbold.dispatchEvent(new Event("click"));
        spanitalic.dispatchEvent(new Event("click"));
        spanunderline.dispatchEvent(new Event("click"));
        inputbgcolor.dispatchEvent(new Event("change"));
        inputTextcolor.dispatchEvent(new Event("change"));
        selectFontFamily.dispatchEvent(new Event("change"));
        selectFontSize.dispatchEvent(new Event("change"));
    }
    function savenotepad(){
        let fid=parseInt(divapptitle.getAttribute("rid"));
        let resources=resource.find(r=>r.rid==fid);

        // let spansave=divappmenubar.querySelector("[action=save]");
        let spanbold=divappmenubar.querySelector("[action=bold]");
        let spanitalic=divappmenubar.querySelector("[action=italic]");
        let spanunderline=divappmenubar.querySelector("[action=underline]");
        let inputbgcolor=divappmenubar.querySelector("[action=bg-color]");
        let inputTextcolor=divappmenubar.querySelector("[action=fg-color]");
        let selectFontFamily=divappmenubar.querySelector("[action=font-family]");
        let selectFontSize=divappmenubar.querySelector("[action=font-size]");
        let textarea=divappbody.querySelector("textarea");

        resources.isbold=spanbold.getAttribute("pressed")=="true";
        resources.isitalic=spanitalic.getAttribute("pressed")=="true";
        resources.isunderline=spanunderline.getAttribute("pressed")=="true";
        resources.bgcolor=inputbgcolor.value;
        resources.textcolor=inputTextcolor.value;
        resources.font=selectFontFamily.value;
        resources.fontsize=selectFontSize.value;
        resources.text=textarea.value;
        savetostorage();
    }
    function bold(){
        let textarea=divappbody.querySelector("textarea");
        let ispressed=this.getAttribute("pressed")=="true";
        if(ispressed==false){
            this.setAttribute("pressed",true);
            textarea.style.fontWeight="bold";
        }else{
            this.setAttribute("pressed",false);
            textarea.style.fontWeight="normal";
        }

    }
    function italic(){
        let textarea=divappbody.querySelector("textarea");
        let ispressed=this.getAttribute("pressed")=="true";
        if(ispressed==false){
            this.setAttribute("pressed",true);
            textarea.style.fontStyle="italic";
        }else{
            this.setAttribute("pressed",false);
            textarea.style.fontStyle="normal";
        }

    }
    function underline(){
        let textarea=divappbody.querySelector("textarea");
        let ispressed=this.getAttribute("pressed")=="true";
        if(ispressed==false){
            this.setAttribute("pressed",true);
            textarea.style.textDecoration="underline";
        }else{
            this.setAttribute("pressed",false);
            textarea.style.textDecoration="none";
        }

    }
    function inputbgcl(){
        let color=this.value;
        let textarea=divappbody.querySelector("textarea");
        textarea.style.backgroundColor=color;
    }
    function inputtextcl(){
        let fontcolor=this.value;
        let font=divappbody.querySelector("textarea");
        font.style.color=fontcolor;
    }
    function fontfamily(){
        let font=this.value;
        let textarea=divappbody.querySelector("textarea");
        textarea.style.fontFamily=font;
    }
    function fontsize(){
        let fontsize=this.value;
        let textarea=divappbody.querySelector("textarea");
        textarea.style.fontSize=fontsize;
    }

    function savetostorage(){
        let rjson=JSON.stringify(resource);
        localStorage.setItem("data",rjson);
        
    }
    function addfolderhtml(rname,rid,rpid){
        let divfoldertemplate=templates.content.querySelector(".folder");
        let divfolder=document.importNode(divfoldertemplate,true);

        let srename=divfolder.querySelector("[action=rename]");
        let sdelete=divfolder.querySelector("[action=delete]");
        let sview=divfolder.querySelector("[action=view]");
        let sname=divfolder.querySelector("[purpose=name]");
       
    
        srename.addEventListener("click",renamefolder);
        sdelete.addEventListener("click",deleteFolder);
        sview.addEventListener("click",viewfolder);

        let divfname=divfolder.querySelector("[purpose=name]");
        divfname.innerHTML=rname;
        divfolder.setAttribute("rid",rid);
        divfolder.setAttribute("rpid",rpid);

        container.appendChild(divfolder);
    }
    function loadfromstorage(){
        let rjson=localStorage.getItem("data");
        if(!rjson){
            return;
        }
        resource=JSON.parse(rjson);
        for(let i=0;i<resource.length;i++){
            if(resource[i].pid==cfid){
                if(resource[i].rtype=="folder"){
                    addfolderhtml(resource[i].rname,resource[i].rid,resource[i].pid);
                }else if(resource[i].rtype=="text-file"){
                    addtextfilehtml(resource[i].rname,resource[i].rid,resource[i].pid);
                }
                
            }


            if(resource[i].rid>rid){
                rid=resource[i].rid;
            }
                

        }
        
    }
    loadfromstorage();


})();