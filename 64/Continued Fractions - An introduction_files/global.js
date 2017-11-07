var global_js_version="3Jul2017";  

// (c) Dr R D Knott  enquiry (AT) ronknott (DOT) com

var Phi = (Math.sqrt(5)+1)/2 ,  phi = (Math.sqrt(5)-1)/2, Pi=Math.PI,pi=Math.PI,piby2=Math.PI/2,Pi2=2*Math.PI;
var logPhi=Math.log(Phi),logphi=Math.log(phi),logRoot5=Math.log(5)/2;
var Istr="<b><i>i</i></b>";  
var complexI=Istr; // used when displaying complex numbers
var symbsty="'font-size:140%'",
  hashChr="&#35;",
  smalltimes=" <small>&times;</small> ",
  triangle="&#9650",
   elemof="&isin;",  
   mapsto='<span style='+symbsty+">&#8614;</span>",
   // tick='<span style='+symbsty+" class=red>&#10004;</span>",
    NatSet="<span style="+symbsty+">&#8469;</span>",
    ZSet="<span style="+symbsty+">&#8484;</span>",
    RealSet="<span style="+symbsty+">&#8477;</span>",
    RationalSet="<span style="+symbsty+">&#8474;</span>",
    ComplexSet="<span style="+symbsty+">&#8450;</span>";

function radicstr(n,opts){ //{...,format:"html" or "input" ...}
	if(arguments.length==1)opts={format:"html"};
	if(opts=="html")opts={format:"html"}
	if(opts=="input")opts={format:"input"};
	return (opts.format=='html'?"<span class=radic>&radic;</span><span class=overbar>"+n+"</span>"
		   :"sqrt("+n+")")
};

var unsure=0,present=1,absent=0; // states for searching

var myErr=false;
//self.onerror=function(ErrMsg,URL,LineNb){if(myErr){halt(ErrMsg+"\n ");return true}else{return false}};


var MAXINT=1;
for(var i=1;i<54;i++,MAXINT+=MAXINT);MAXINT--;
var MAXINTsqrt=Math.floor(Math.sqrt(MAXINT));

function halt(msg){if(msg&&msg.toString().length>0)alert(msg);ERROR()};
function DoERROR(){return false};
function resetERROR(){self.onerror=DoERROR;return true};
function HALT(msg){if(msg!="")alert("**Problem** "+msg);//self.onerror=resetERROR;
   ERROR();};
function STOP(){ERROR()};
function ignoreERROR(){self.onerror=function(){return true}};
//ignoreERROR()  SWITCHES OFF ALL ERRORS!!

function ERRoverflow(m){
  if(arguments.length==0)m="";
  HALT('*** Sorry, the calculations involve numbers that have become too large!\n '+m)
};

function getElementById(x){return document.getElementById(x)};

function showOBJ(O,eolchar,tab){
  if(arguments.length<2)eolchar="<br>";
  if(arguments.length<3)tab=""
  var s="";
  for(var n in O)s+=tab+n+"::"+typeof O[n]+":"+
      (typeof O[n]=="object"?"<br>"+showOBJ(O[n],eolchar,tab+"|_"):O[n])+eolchar
  return s
};

function lineStr(items,LL,opts){ //items is an Array of strings, LL the line length
//returns an Array of strings, each one line, ready to combine with join(linebreak)
 function nbchars(str){ //putmsg("nbchars "+str.slice(0,3)+" <- "+str.replace(/<[^>]+>/g,""));
   return str.replace(/<[^>]+>/g,"").length};
 if(arguments.length<2)LL=80;
 if(arguments.length<3)opts="indent";
 var indentQ=opts.indexOf("indent")>-1,indent="  ";
//   putmsg("$$linestr "+LL);
 var linestr="",lines=new Array(),next,ct,first=true;
 for(var i=0;i<items.length;i++)
  { if(typeof items[i]!="string")items[i]=items[i].toString();
  // putmsg(items[i].length+": "+nbchars(next=items[i])+"+"+nbchars(linestr));
   next=items[i];
   if(next==""){}
   else{if(!first){next=" = "+next}else{first=false};
       if(nbchars(next)+nbchars(linestr)>LL)
           {if(linestr!=""){lines.push(linestr)};
            linestr=(indentQ&&i>0?"  ":"")+next;}
       else{linestr+=next}}}; 
 if(linestr!="")lines.push(linestr);   
//  putmsg("$$linestr <-"+lines)
return lines
};

function identity(x){return x};

//---------------------------- ARRAY Utilities -------------

function isArray(ar){ return Object.prototype.toString.call( ar ) === '[object Array]'   }

function equalArrays(a1,a2,opts){//opts: shortest (ignore length check)
  var Opts=getopts(opts);
  if(!Opts.shortest  &&  a1.length!=a2.length)return false;
  var eq=true;
  for(var i=0;eq&&i<a1.length&&i<a2.length;i++)eq=a1[i]==a2[i];
  // putmsg('%%  equalArrays '+a1+(eq?" == ":" != ")+a2)
  //putmsg(a1.length+" : "+a2.length);
 return eq
};

function inArray(elt,A){
  var found=false;
  for(var i=0;!found && i<A.length;i++)
    found=A[i]==elt;
  return found
};

function FilterArray(A,F){var a=new Array();
  for(var i=0;i<A.length;i++)if(F(A[i]))a.push(a[i]);
  return a
};

//--------------- Other utilities -----------

function telltype(o){
  if(inArray(typeof(o),["undefined","number","string","boolean","function"]))
     return typeof(o);
  if(o.toN)return "DIGS";
  //if(BigNumber&&(o instanceof BigNumber))return "BigNumber";
  if(o.quot)return "QUOT";
  if(o.sign)return "sDIGS";
  if(o.num)return "RAT";
  return {}.toString.call(o).toLowerCase().replace("[object ","").replace("]","")  //will return Array, Date, Arguments or Object
  //to check is an Onject is of a particular Class, use obj instanceof CLASSGENERATORNAME
};


function ECHO(txt){alert(txt);return txt};

//  ARGUMENTS and Options
function getArgs(opts){
  if(arguments.length==0)opts=location.search.substring(1);
   //alert("getArgs "+opts);
  var args=new Object();
  var pairs=opts.split(",");
  //if(pairs.length>0)alert("getArgs "+pairs);
  for(var i=0;i<pairs.length;i++)
  { var pos=pairs[i].indexOf("=");
	if(pos==-1)args[pairs[i]]=true  //allow ids with no values
	else args[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);
   };
   return args
 };

var getOpts=getopts;
function getopts(opts){ //options as string of {,fld[=val]}*
  var args=new Object();
  //putmsg("getOpts "+opts);
  if(opts==undefined||opts=="")return args;
  var pairs=opts.split(",");
 // if(pairs.length>0)putmsg("getArgs "+pairs);
  for(var i=0;i<pairs.length;i++)
  { var pos=pairs[i].indexOf("=");
	if(pos==-1)args[pairs[i]]=true  //allow ids with no values
	else args[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);
   };
   return args
}

function objdump(obj,separator){var s="";
  if(arguments.length<2)separator="; ";
  for(var prop in obj)
    {//if(!confirm("<"+(typeof obj[prop])+">"))halt();
     if(typeof obj[prop]=="function"||  prop=="innerHTML")
         {} // s+=prop+": ["+(typeof obj[prop])+"];"
     else s+="'"+prop+"' "+(typeof obj[prop])+": "+obj[prop];
     s+=separator
    };
  return s
 };
 var dumpobj=objdump;
 
 
 function objNbProps(obj){var ct=0;
   for(var p in obj)ct++;
   return ct
};

//----------------  GET INPUT Utilities -----------

//SELECT and OPTIONS shortcut
function getId(id){
  var it= document.getElementById(id);
  if(!it||it==undefined)halt('@@ cannot getId '+id);
  return it
};

function getIdval(idnm,newval){
  var it=getId(idnm);
  var old=it.value;
  if(arguments.length==2)it.value=newval;
  return old
}

function setId(idnm,fldvals){ //fldvals: prop=val LIST
 var obj=document.getElementById(idnm);
 var pairs=fldvals.split(",");
  //if(pairs.length>0)alert("getArgs "+pairs);
 for(var i=0;i<pairs.length;i++)
  { var pos=pairs[i].indexOf("=");
    var p=(pos==-1?pairs[i]:pairs[i].substring(0,pos)),
        v=(pos==-1?true:pairs[i].substring(pos+1));
     //alert(idnm+" "+p+": "+obj[p]+" > "+v);
	 obj[p]=v  //allow ids with no values
	}
};

function getSEL(selIDname){
 var s=document.getElementById(selIDname);
 if(!s || !s.options)halt("@@ getSELval called on non-SELECT object id "+selIDname);
 s=s[s.selectedIndex];
 return s
};

function getSELval(selIDname){ return getSEL(selIDname).value};

function setSEL(selIDname,selval){
  var s=document.getElementById(selIDname);
  if(!s || !s.options)halt("@@ setSELval called on non-SELECT object id "+selIDname);
  var i=0,found=false;
  while(i<s.length&&!found)
     if(s[i].value==selval){found=true;s.selectedIndex=i}else i++;
  if(!found)halt('@@ setSELval '+selIDname+" does not have option: "+selval)
};
var setSELval=setSEL;

function getRADIOval(radName,errname){
  var r=document.getElementsByName(radName);
  for(var i=0; i<r.length; i++)
    if(r[i].checked){return r[i].value}
  if(arguments.length>1)HALT("!! Please click on a selection for "+errname)
  else return ""  // none checked
};

function checkRADIOval(radName,v){
  var r=document.getElementsByName(radName);
  if(!r)halt("!!No radio has name "+radName);
  //alert('checkRAD '+radName+" "+v);
  for(var i=0; i<r.length; i++)
    if(r[i].value==v)r[i].checked=true;
}

function setRADIOval(radName,v){
  var r=document.getElementsByName(radName);
  if(!r)halt("!!No radio has name "+radName);
  //alert('checkRAD '+radName+" "+v);
  for(var i=0; i<r.length; i++)
    if(r[i].value==v)r[i].checked=true;
}

function radioFocus(radName,focuson){ //focuson is input radio ID used to focus on LABEL with ID value+"LBL"
  var r=document.getElementsByName(radName);
  if(!r)halt("!!No radio has name "+radName);
  for(var i=0; i<r.length; i++)
    { //putmsg(r[i].value+" "+focuson+" "+(r[i].value==focuson));
     document.getElementById(r[i].value+"LBL").style.color=(r[i].value==focuson?'black':'silver')
     };
};


function hiliteRad(Fnm,hilitesty,lolitesty){
//needs radio buttons with name (Fnm+"RAD") and text fields with IDs (Fnm+"TXT"+value-of-that-rad-btn)
//when a radio button is selectd, its text will be hilited
  var r=document.getElementsByName(Fnm+"RAD")
  if(!r)halt("Cannot hilite RADIO button "+Fnm);
  if(arguments.length<2){hilitesty="hiliteRADSTY";lolitesty="loliteRADSTY"}
  for(var i=0;i<r.length;i++)
    {document.getElementById(Fnm+"TXT"+r[i].value).className=(r[i].checked?hilitesty:lolitesty);
     //alert(r[i].value+" "+r[i].checked+" "+(r[i].checked?hilitesty:lolitesty))
    }
}

//--------------- OUTPUT Utilities -----------
var outF;

function clearmsg(F){ if(arguments.length==0)F=outF;
   document.getElementById('msg'+F).innerHTML=''};

function putmsgto(outF,txt){
    if(arguments.length<2)txt="";
     var olist = getElementById('msg'+outF);  //alert("putmsg "+outF+" "+txt);
      if(!olist)alert("putmsg->> "+txt)
      else{  olist.innerHTML += txt+"<br>";
             olist.scrollTop = olist.scrollHeight;
             olist.scrollLeft=0};
};

function putmsg(txt,br){
   if(arguments.length==0)txt="";
   if(arguments.length<2)br=true;
   // if(arguments.length>1)txt=arguments().join("");
   var olist = getElementById('msg'+outF);  //alert("putmsg "+outF);
      if(!olist)alert("putmsg->> "+txt)
      else{  olist.innerHTML += txt+(br?"<br>":"");
             olist.scrollTop = olist.scrollHeight;
             olist.scrollLeft=0};
};
function tblstr(lines){if(!Array.isArray(lines))lines=[lines];
  return "<table class=pre><tr><td>"+lines.join("</td><td>")+"</td></tr></table>"
};
function tableIndStr(indices,elts,opts){// indicesrange=array, sme len as elts, opts::"class=XXX,indclass=XXX,eltcalss=XXX"
  var opts=getopts(arguments.length==3?opts:"");
  //putmsg([opts.class,opts.indclass,opts.eltclass])
  var s="<table "+(opts.class?"class="+opts.class:"")+"><tr "+(opts.indclass?"class="+opts.indclass:"")+">";
  for(var i=0;i<indices.length;i++)s+="<td>"+indices[i]+"</td>";
  s+="</tr><tr "+(opts.eltclass?"class="+opts.eltclass:"")+">";
  for(var i=0;i<elts.length;i++)s+="<td>"+elts[i]+"</td>";
  return s+"</tr></table>"
}

function echotype(v){return v+"::"+(typeof v)}

function clearForm(FormNm){
 var Form=document.getElementsByName(FormNm);
 //if(Form.length>0)halt("@@ "+FormNm+" is used more than once!");
 Form=Form[0];
 //putmsg(objdump(Form),"<br>");

 //alert("name: "+Form.name+" id: "+Form.id);
 //alert(Form.elements.length+" elemens");
 for(var i=0; i<Form.elements.length; i++)
   { //if(!confirm(Form.elements[i].type+": "+Form.elements[i].id+"="+Form.elements[i].name))halt()
     if(Form.elements[i].type=="text")
       Form.elements[i].value="";
   }
};

function clearId(Id){
  document.getElementById(Id).value=""
};
function clearIds(Ids){
  for(var i=0;i<Ids.length;i++)clearId(Ids[i])
};

function spn(clas,str){return (clas==""?str:"<span class='"+clas+"'>"+str+"</span>")};
function mathspan(str){return spn('math',str)};

function tenpow(r,nbdigs)
   {return r.toExponential(nbdigs).replace(/e([+-][0-9]+)/,"&times;10<sup>$1</sup>")}
function totenpow(str)
   {if(typeof str!="string")str=str.toString();
    return (str.indexOf("e")==-1?str:str.replace(/e([+-][0-9]+)/,"&times;10<sup>$1</sup>"))}

function coeffBN(n){ var s="";   // SIGNed,  "1" is not shown
  if(n.isZero())HALT("coeffBN  called on zero!")
  else {s=(n.isNeg() ? " - " : " + ");
        if(n.ne(1) && n.ne(-1)) s=s+n.abs()
        return s}
}
function coeff1BN(n){  var s="";  //only  - sign, 0 or 1 are not shown
  if(n.isZero())HALT("coeff1BN called on zero!")
  else {if(n.isNeg()) s="- ";
        if(n.abs().ne(1)) s=s+n.abs()
        return s
       }
}

function polyBNstr(Coeffs,varbl){  //putpoly
 //putmsg("polyBNstr("+Coeffs+","+varbl+")");
  function varpow(n){ //in is Int
    return (n==0?"":n==1?varbl: //n>1 || n<0
       varbl+"<sup>"+n+"</sup>")};
       
  var coeffs,i=0,s="";
  //find first non-0 coeff:
  while(i<Coeffs.length && (Coeffs[i]==0 || strip(Coeffs[i])==""))i++;
  coeffs=Coeffs.slice(i);
  if(0==coeffs.length)s= "0";
  else if(1==coeffs.length)s=coeffs[0].toString()
  else{s=coeff1BN(coeffs[0])+varpow(coeffs.length-1);
       for(var i=1;i<coeffs.length-1;i++)
          s=s+(!coeffs[i].isZero() ? coeffBN(coeffs[i])+varpow(coeffs.length-1-i) : "");
       if(coeffs[coeffs.length-1].ne(0))
          s=s+(coeffs[coeffs.length-1].gt(0)?" + ":" - ")
             +coeffs[coeffs.length-1].abs();  //signed, 1 visible
      };
  return s
};


//   ---------- MATHS FUNCTIONS --------

function mod(i,m){
  if(!isInt(i))HALT("Numbers have become too large for accurate mod computation");
  return i%m
};

function randint(lo,hi){
  if(lo>hi)alert("randint error: lo exceeds hi! "+lo+","+hi)
  else {do{var r=Math.floor(Math.random()*(hi-lo+1)+lo)}
        while(r>hi);  //random can return 1.00!!
        //alert("randint("+lo+","+hi+")="+r);
        return r
}      }

function round(x){return Math.floor(x+0.5)};

function randelt(vals){
   if(arguments.length==1)
      {     if(typeof vals == "object")return vals[randint(0,vals.length-1)]
       else if(typeof vals == "string")return randelt(vals.split(""));
      }
   else return arguments[randint(0,arguments.length-1)]
};

function randbool(){return randelt([true,false])};

function mediant(r1,r2){
   return new RAT(r1.num+r2.num,r1.den+r2.den);
};

function isInt(i){
   if(typeof i!="number"&&typeof i!="string")return false;
   var s=i.toString().toLowerCase().replace(/\s/g,"");
   return !isNaN(i) && isFinite(i) && s!="" && s.indexOf(".")==-1  && s.indexOf("e")==-1  &&  i<=MAXINT
}  ;
function isSqr(n){if(typeof n!="number"|| n<=0)return false;
  return Math.pow(Math.round(Math.sqrt(n)),2)==n};

function find2sqs(sum,orderedQ){//return a list of pairs whose squares give 'sum'
     var lim=Math.sqrt(sum),sumsqs=new Array();
     for(var p=0;p<=lim;p++)
       for(var q=(orderedQ?0:p+1);q<=lim;q++)
         if(p*p+q*q==sum)sumsqs.push([q,p]);
     return sumsqs
    };

function sqrfactor(n){var N=n;if(n==0)return 1;
  if(n<0)n=-n;
  var f=1,lim=Math.sqrt(n);
  //if(debug)DBG("\rsqrfactor of "+n+ " lim="+lim);
  //if(lim>100000)
  //   if(!confirm("To simplify the fraction may take a while - do you still want simplification?"))
  //       {return 1};
   while(n%4==0){f=f*4;n=Math.round(n/4)};
  //if(n<9)return f;
  for(var i=3,ii=9;n>=ii && i<=lim;i=i+2,ii=i*i)
     {//if(debug)DBG("sqrf i="+i+" ii="+ii+" n="+n);
      while(n>=ii && n%ii==0){f=f*ii;n=Math.round(n/ii)
      //if(debug)DBG(" ..f="+f+" n="+n)
     }};
  //if(debug)DBG("sqrfactor of "+N+" = "+f+" *"+n);
  return f
};

function isNb(r){
  return typeof r=="number"  &&isFinite(r)&&!isNaN(r)} //|| typeof r=="string"&&r!=""&&r.replace(/\s[0-9]\+-\./g,"")==""};
function sameNb(a,b,err){if(arguments.length<3)err=0.0000000001;
 return Math.abs(a-b)<err };
function realisint(r){return sameNb(r,Math.round(r))};
function log10(x){return Math.LOG10E*Math.log(x)};
function logB(B,x){if(B==10)return log10(x)
   return Math.log(x)/Math.log(B)};
var  logBase=logB;
function ln(x){return Math.log(x)};
var EulerGamma=0.57721566490153286061

function Herr(n)  // Harmonic number approx, see GKP Page 278
                  // return [value, max error]
{if(n<20)return [[1, 1.5, 1.833333333333333,
2.083333333333333, 2.283333333333333, 2.45,
2.592857142857143, 2.717857142857143, 2.828968253968254,
2.928968253968254, 3.019877344877345, 3.103210678210678,
3.180133755133755, 3.251562326562327, 3.318228993228993,
3.380728993228993, 3.439552522640758, 3.495108078196313,
3.547739657143682, 3.597739657143682][n-1],(n==1||n==2||n==6?1e-20:1e-15)]
 return [ln(n)+EulerGamma+1/(2*n)-1/(12*n*n),1/(120*n*n*n*n)]
}
// ------ - --------- - --------- - ------

function tenpowstr(p){var s="1";
  for(var i=0;i<p;i++)s+="0";
  return s};
  
function nbToVE(n){  // split a number into its value in range [1-10) and exponent
  if(!isNb(n))HALT("$$ nbToValE given a non-number "+n);
  var s=n.toExponential();var eat=s.indexOf("e");
  return {v:eval(s.slice(0,eat)),e:eval(s.slice(eat+1))}
};

function range(lo,hi){
  if(lo>hi)halt("@@ range called on illegal range params");
  var a=new Array(hi-lo+1);
  for(var i=lo;i<=hi;i++)a[i-lo]=i;
  return a
};

function chooseRfromRange(N,Lo,Hi,Pre,Process){// choose N items from array Items delivering an ARRAY of choices (array)
 // putmsg("choose "+N+" from "+Lo+rangech+Hi+" pre="+Pre);
  if(N==0) {Process(Pre);return};
  var nb=Hi-Lo+1,ans=new Array();
  if(N<0)halt("@@ setrem called with negative count");
  if(N>nb)return;
   for(var i=Lo;i<=Hi;i++)
    {//putmsg(" psh "+i);
     Pre.push(i)
     chooseRfromRange(N-1,i+1,Hi,Pre,Process);
     Pre.pop()
    }
};

function Ntobase(n,b){ //n::Int, b::Int -> Array[Int]
   var ds=new Array();
   //putmsg('Ntobase '+n+(isInt(n)?"int":"non-int")+" "+b);
   if(!isInt(n))HALT('?? Cannot base-change a non-integer: '+n);
   if(n<0)HALT('?? base-change -ve integer not implemented');
   if(!isInt(b))HALT('?? Cannot base-change to non-integer base');
   if(b<0)HALT('?? BASE cannot be negative');
   while(n>0){ds.unshift(n%b);n=(n-n%b)/b};
    if(ds.length==0)ds.push(0);
 // putmsg("<- "+ds);
   return ds
};

function basetoN(Digs,b){// Digs::Array[Int] powers increase to LEFT as usual notation, b::Int ->Int
  var s=0;
  for(var i=0;i<Digs.length;i++)s=add(mul(s,b),Digs[i])
  return s
};

function nth(n,typ){ //type::"th" | "words"
     if(arguments.length==1)typ="th";
     var s="";
     var digits=["zero","one","two","three","four","five","six","seven","eight","nine"],
         digths=["zeroth","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth"],
         tens=["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],
         tenths=["","tenth","twentieth","thirtieth","fortieth","fiftieth","sixtieth","seventieth","eightieth","nintieth"]
        teens=["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],
        teenths=["tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eigthteenth",
           "nineteenth"];
   var h=Math.floor((n%1000)/100),t=Math.floor((n%100)/10),u=n%10;
   if(n>=1000 || typ=="th") return n+(typ=="words"?"":"<sup>"+(t==1?"th":n%10==1?"st":n%10==2?"nd":n%10==3?"rd":"th")+"</sup>");
   if(h>0)s=digits[h]+" hundred"+(typ=="th"&&t==0&&u==0?"th":"");
   if(t>0){if(s!="")s+=" and ";
                if(t==1&&u!=0)return s+(typ=="th"?teenths[u]:teens[u])
           else if(u==0)return s+(typ=="th"?tenths[t]:tens[t])
           else //u!=0&&t>1
                s+=tens[t]
          };
   if(h>0&&u>0&&t==0)s+=" and ";
   if(u>0)s=s+(s!=""?(t>1&&u!=0?"-":" "):"")+(typ=="th"?digths[u]:digits[u])
   return (n==0?(typ=="th"?"zeroth":"zero"):s)
};

function numberword(n){return nth(n,"words")};

var fibmemo=new Array(0,1,1);
var i=2,FibMAXINTi=2;
 while(fibmemo[i].toString().indexOf(".")==-1
     &&(fibmemo[i-1]%10+fibmemo[i-2]%10)%10==fibmemo[i]%10)
   {i++;fibmemo[i]=fibmemo[i-1]+fibmemo[i-2];
    //parent.RESULTS.document.writeln(i,": ",fibmemo[i],"<br>")
   };
   
FibMAXINTi=i-1; //alert("fibMAXINTi="+FibMAXINTi+"["+fibmemo[FibMAXINTi]+"]");
function fib(i){if(i< -FibMAXINTi||i>FibMAXINTi)return Number.NaN;
 return (i>=0? fibmemo[i]: ((-i) % 2==1?fibmemo[-i]:-fibmemo[-i]))
};

var Fib=fib;
var F=fib;
function Luc(n){return fib(n-1)+fib(n+1)};
var L=Luc;
var luc=Luc;

function G(a,b,n){return a*fib(n-1)+b*fib(n)};
function fibIndex(n){ // return index of Fib nb >=n
  var i=Math.round((Math.log(n)+logRoot5)/logPhi);
  return i
}
function isFibr(n){  // only on non-neg n and return index >=0
  if(n<0)return -1;
  if(n==0)return 0;
  if(n==1)return 1;
  var i=Math.round(Math.log(n*Math.sqrt(5))/Math.log(Phi));
  return (fib(i)==n?i:-1)
};

function isFib(n){return isFibr(n)>=0};

// Block[{i = Round[Log[Phi, n Sqrt[5]]]}, n > 0 && n == F[i]]

function baseToString(digs,b,jch){
  if(arguments.length<3)(b<=10?jch="":jch=" ");
  return digs.join(jch)
}

function frombase(Dsarr,B){ //Dsarr is array of valid Base B digits (integers)
  var v=0,i=0;
  //putmsg('frombase '+Dsarr+' :'+Dsarr.length+': base='+B);
  while(i<Dsarr.length){v=v*B+Dsarr[i];i++};
  putmsg('frombase <- '+Dsarr+"("+B+")="+v);
  return v
};

function maxInArray(arr){
  if(arr.length==0)halt("@@ Empty array passed to maxinArray")
  var m=arr[0];
  for(var i=1;i<arr.length;i++)
    m=Math.max(m,arr[i])
  return m
};

function zeroArray(a,zero){ // all arrays are passed by reference
  if(arguments.length<2)zero=0;
  for(var i=0;i<a.length;i++)a[i]=zero
};

function cmp(n,m){//n>m:1, bn1=bn2:0 bn1<bn2:-1
  return (n>m?1:n==m?0:-1)
};

function cmpStrtoWords(bexpSTR){
  switch(bexpSTR){
  case "<=":return "not more than";
  case "<":return "less than";
  case "=":
  case "==":return "exactly";
  case ">":return "more than";
  case ">=":return "not less than";
  default:HALT("cmpStrtoWord does not recognize aith cmp op "+bexpSTR)
}  };

function gcd(a,b){
  if(!isInt(a)||!isInt(b))HALT("The numbers have become too large for accurate results.\nChange to real numbers (gcd)");
  return egcd((a==0?1:Math.abs(a)),(b==0?1:Math.abs(b))) [2] };
function gcd3(a,b,c){ return egcd(egcd(Math.abs(a),Math.abs(b))[2],Math.abs(c))[2]}
var GCD=gcd;


function egcd(x,y){var a0=1,a1=0,b0=0,b1=1,a2=x,b2=y,q,z;
  while(b2!=0)
     {q=Math.floor(a2/b2);
      z=a0-q*b0;a0=b0;b0=z;
      z=a1-q*b1;a1=b1;b1=z;
      z=a2-q*b2;a2=b2;b2=z
   // putmsg([a0,a1,a2]+" "+[b0,b1,b2]+" q="+q);
     };
  if(a2<0){a1=-a1,a2=-a2};
 // putmsg("egcd "+x+" "+y+" "+[a0,a1,a2]+" CHECK:"+(a0*x+a1*y)+"="+a2);
  return [a0,a1,a2] // ASSERT a0*x+a1*y==g==a2
};

//var test=new Array("gcd(0,2)","gcd(2,0)","gcd(12,15)","gcd(144,89)");
//for(var i=0;i<test.length;i++)alert(test[i]+" = "+eval(test[i]));

function lcm(a,b){
  if(arguments.length==2) return a/gcd(a,b)*b;
  if(arguments.length==1&&a instanceof Array)
  {var L=a[0],i;
   for(var i=1;i<a.length;i++)L=L/gcd(L,a[i])*a[i];
   return L}
};


function bincoeff(n,r){
  //putmsg("call bincoeff "+[n,r]);
  var b=1,s="";
  if(r>n||n<0)return 0;
  if(n-r>r)r=n-r;
  if(r==0)return 1;
  for(var i=n;i>r;i--){b*=i/(n+1-i)};
  //putmsg(n+"C"+r+"="+b);
  return b
};
var nCr=bincoeff, Bincoeff=bincoeff;

function sinh(x){with(Math){return (pow(E,2*x)-1)/(2*pow(E,x)) } };
function cosh(x){with(Math){return (pow(E,2*x)+1)/(2*pow(E,x)) } };
function tanh(x){with(Math){return (pow(E,2*x)-1)/(pow(E,2*x)+1)}};
function coth(x){return 1/tanh(x)};
function sech(x){return 1/cosh(x)};
function csch(x){return 1/cosh(x)};
function asinh(x){with(Math){return log(x+sqrt(x*x+1))}};
function acosh(x){if(x>=1){with(Math){return log(x+sqrt(x*x-1))}}
  else HALT("acosh called on argument<1: "+x)};
function atanh(x){with(Math){if(abs(x)<1)return log((1+x)/(1-x))/2
  else HALT("atanh called on argument <=-1 or >=1: "+x)}}
function asech(x){return acosh(1/x)};
function acsch(x){return asinh(1/x)};
function acoth(x){return atanh(1/x)};
function xydist(x,y,p,q){var ans;
 //   putmsg("xydist on "+[x,y,p,q]);
   if(arguments.length==2){p=y[0];q=y[1];y=x[1];x=x[0]};
   ans= Math.sqrt((p-x)*(p-x)+(q-y)*(q-y))
 //  putmsg("xydist "+[x,y,p,q]+"="+ans);
   return ans
};
function neg(a){return -a};

function mul(a,b){
  if(a==0||b==0)return 0;
  else if(isInt(a*b)){return a*b}else{ERRoverflow(a+" mul "+b)}
};
function mulR(a,b){if(isNb(a*b)){return a*b}else{ERRoverflow(a+" mulR "+b)}};

function add(a,b){if((a+b)-a!=b){ERRoverflow(a+" add "+b)}else{return a+b}
};

function PrPow(Pr,Pow){var v=Math.pow(Pr,Pow);
 if(!isInt(v))ERRoverflow("Prime to power");
 return v
};

function Polynb(n,r,corp){  // p_n(r) 2D figurate number, 'p'lain (default) or 'c'entred
      // n==0 is oblong polygon, ignore corp
  if(arguments.length<3)corp='p';
  var ans= (n==0?r*(r+1):corp=='p'?r*( (r-1)*n-2*r+4)/2:n*r*(r-1)/2+1)
if(!isInt(ans))ERRoverflow("")
return ans
};


function pnrstr(n,r,corp){
  if(arguments.length<3)corp='p';
   return (isInt(n)? (n==0?"oblong":corp+"<sub>"+n+"</sub>")+"("+r+")"
      :n=="pr"?"prime "+r
      :n=="re"?"nonprime "+r:"")
};


function Polyname(p,nb,short,corp){var ans;
  if(arguments.length<2)nb=2;
  if(arguments.length<3)short=false;
  if(arguments.length<4)corp='p'
  switch(p){
  case "pr":ans="Prime";break;
  case "re":ans="Nonprime";break;
  case 0: ans="Oblong";break;
  case 3: ans="Triangular";break;
  case 4: ans="Square";break;
  case 5: ans="Pentagonal"; break;
  case 6: ans="Hexagonal";break;
  case 7: ans="Heptagonal";break;
  case 8: ans="Octagonal";break;
  default: ans= p+"-gonal"
  };
  return (corp=='p'?"":"Centred-")+ans+(short?"":" number"+(nb==1?"":"s"))
};

function findPolyr(shape,pnr,corp){ // if p_shape(r) = pnr return r else return -1
  if(arguments.length<3)corp='p';  var ss,r;
  switch(corp){
  case 'p': if(shape==0)
               {r=Math.floor(Math.sqrt(pnr));return (r*(r+1)==pnr?r:-1)}
           ss=(shape-4)*(shape-4)+8*pnr*(shape-2);
           //putmsg(ss+" "+isSqr(ss));
           if(isSqr(ss)){r=(shape-4)+Math.sqrt(ss);
              //putmsg("shape="+shape+" pnr="+pnr+" "+r+" % "+(2*shape-4));
              if(r%(2*shape-4)==0)return r/(2*shape-4)}
            return -1;
  case 'c': if((pnr-1)%shape==0) return findPolyr(3,(pnr-1)/shape,'p')+1
            return -1}
};

function findPolyof(p,exclr2,corp){ //return a list of [n,r] for P_n(r)=p or C_n(r)=p
   if(arguments.length<3)corp='p';
   var res=new Array();
   switch(corp){
   case 'p':  var fs=factors(2*p),r,n,i;
             //putmsg("factors of "+(2*p)+" = "+fs);
             for(i=(exclr2?2:1);   r=fs[i],n=2*p/r,r<n;   i++)
                  if((n+2*r-4)%(r-1)==0)
                     res.push([(n+2*r-4)/(r-1),r])
             // putmsg("<- "+res.join(" | "))
             break;
    case 'c':
            var fs=factors(p-1),r,n,i;
            // putmsg("$$findPolyof C "+p+" : "+fs);
            for(i=0;   i<fs.length; i++)
            {n=fs[i];
             if((r=findPolyr(3,(p-1)/n,'p'))>0&&r>(exclr2?1:0)&&n>2) res.push([n,r+1])
            }
    }
    return res
};



function powmod(Base,Pow,Mod){
  var pm;
       if(Pow==0)pm= 1
  else if(Pow==1)pm= Base%Mod
  else if(Pow>1)
       {var s=powmod(Base,Math.round((Pow-Pow%2)/2),Mod);
        if(2*s>Mod)s=Mod-s
        var ss=s*s;
        if(isInt(ss))ss=ss%Mod
        else {//putmsg(s+"^2="+ss);
             halt("Sorry - the numbers have become too large for this calculator")};
        pm= (Pow%2==0 ? ss : (Base*ss)%Mod )  } ;
  //putmsg('powmod '+Base+'^'+Pow+"%"+Mod+" <- "+pm)
  return pm
};

function orderBASE(D,B,Dpfs){ // MMA: MultiplicativeOrder(D,B)
  // the smallest power I of D s.t.D^I=1 mod B
  //putmsg("orderBASE "+D+"   "+B+"  "+(arguments.length>2&&Dpfs.length>50?Dpfs.length+" fctrs":Dpfs));
  if(!isInt(D))HALT("orderBASE given a non-integer arg D:"+D);
  if(!isInt(B))HALT("orderBASE given a non-integer arg B:"+B);
  if(D==1)return 0;
  if(arguments.length==2)
     { if(gcd(D,B)!=1)HALT("orderBASE called on  numbers with a common factor: "+D+" "+B);
     };
  var fs=(arguments.length==3?factorspfs(EulerPhiPfs(D,Dpfs)):factors(EulerPhi(D))),    i,ans;
  //for(var i=0;i<fs.length;i++)while(B%fs[i]==0,B=Math.round(B/fs[i]));

 //putmsg("orderBASE: base="+B+" has "+fs.length+" factors ("+fs[fs.length-1]+" is largest) as powers mod "+D);
  i=0;
  while(ans=powmod(B,fs[i],D)!=1) 
  { //putmsg(fs[i]+" % "+D+" = "+ans);
      i++;
      if(i>fs.length)HALT("BUG found [overrun in order10] - sorry!.\n Please email your input numbers to enquiry@ronknott.com. Thank you.")
    };
//  putmsg('orderBASE  <- '+fs[i])
  return fs[i]
};


//------------ ZBAG -------------

function ordlistToZbag(L){
   var s=L[0],ct=1,i,z=[];
   for(var i=1;i<L.length;i++)
     if(L[i]==s)ct++
     else {z=z.concat([[s,ct]]);s=L[i];ct=1};
   z=z.concat([[s,ct]]);
    return z
};

function ZbagEltInOrder(A,B,F){  
  if(arguments.length==2)return (A[0]<B[0]?-1:A[0]==B[0]?0:1)
  else return F(A[0],B[0])  }

function ZbagEltFreq(Elt,B,eqFN){
  if(arguments.length<3)eqFN=EQ;
  for(var i=B.length-1;i>=0&&B.length&&!eqFN(B[i][0],Elt);i--);
  return (i<0?0:B[i][1])
};
function EQ(a,b){return a==b};

function Zbagintersect(B1,B2,eqFN){
   if(arguments.length<3)eqFN=EQ;
 var i1=0,i2=0,cmn=new Array();
  for(i1=0; i1<B1.length; i1++)
     {var f=ZbagEltFreq(B1[i1][0],B2,eqFN);
      if(f>0)cmn.push([B1[i1][0],Math.min(B1[i1][1],f)]);
     };
  return cmn
};

function Zbagdiff(A,B,eqFN){
   if(arguments.length<3)eqFN=EQ;
 var diff=new Array();
  for(var i=0;i<A.length;i++)
     {var f=ZbagEltFreq(A[i][0],B,eqFN);
      if(A[i][1]>f)diff.push([A[i][0],A[i][1]-f])
     };
  return diff
};


function Zbagremove(A,B,eqFN){  //from A take all Elts in B
  if(arguments.length<3)eqFN=EQ;
  var diff=new Array();
  for(var i=0;i<A.length;i++)
    if(ZbagEltFreq(A[i][0],B,eqFN)==0)diff.push(A[i]);
  return diff
};
var Zbagdelete=Zbagremove;

function ZbagIsSubset(A,B,eqFN){
  if(arguments.length<3)eqFN=EQ;
  for(var i=0,allin=true; i<B.length && allin; i++)
     allin=allin&&ZbagEltFreq(B[i][0],A,eqFN)>0;
  return allin
}

function Zbagunion(B1,B2,cmpFN){
  //putmsg("Zbag "+B1+" u "+B2);
  var i1=0,i2=0,unn=new Array();
  while(i1<B1.length && i2<B2.length)
    switch((arguments.length==2?ZbagEltInOrder(B1[i1],B2[i2]):ZbagEltInOrder(B1[i1],B2[i2],cmpFN)))
    {case -1: unn.push(B1[i1++]);break;
     case  0: unn.push([B1[i1][0],B1[i1][1]+B2[i2][1]]);i1++;i2++;break;
     case  1: unn.push(B2[i2++])
    };
  while(i1<B1.length)unn.push(B1[i1++]);
  while(i2<B2.length)unn.push(B2[i2++]);
  return unn
};

function Zbagpowerset(Zb){
  //putmsg("ZbagPowSet "+Zb);
  var ans=[[]];
  for(var Zi=0;Zi<Zb.length;Zi++)
  {var pr=Zb[Zi][0],maxpow=Zb[Zi][1];
   var anslen=ans.length;
    for(var p=1;p<=maxpow;p++)
    {  for(j=0;j<anslen;j++) ans.push(ans[j].concat([[pr,p]]))
    }};
    //putmsg("ZBps<-"+Map(ans,ZbagtoString));
  return ans
};

function Zbagpowerset2(Zb,F){ //F acts on a previous subset and a new elt
  //putmsg("ZbagPowSet "+Zb);
  var ans=[[]];
  for(var Zi=0;Zi<Zb.length;Zi++)
  {var pr=Zb[Zi][0],maxpow=Zb[Zi][1];
   var anslen=ans.length;
    for(var p=1;p<=maxpow;p++)
    {  for(j=0;j<anslen;j++) ans.push(F(ans[j],[pr,p]))
    }};
  return ans
};
function ZbagtoString(Zb){var s="{";
  for(var i=0;i<Zb.length;i++)
    s=s+(i>0?", ":"") + Zb[i][0] + (Zb[i][1]>1?"<span class=Zbagfreq>&times;"+Zb[i][1]+"</span>":"");
  return s+"}"
};


//------------- Functional Programming Utilities ---------

function map(L,F){var newL=new Array();
  //putmsg("MAP "+L+" len="+L.length);
  for(var i=0;i<L.length;i++){ // putmsg(i+" push "+F(L[i]))
    newL.push(F(L[i]))};
 // putmsg("Map "+L+" <- "+newL+" len="+newL.length)
  return newL
}

function FoldR(Vempty,L,F){var v=Vempty;
//  putmsg("FOLD on "+Vempty+" list "+L);
  for(var i=0; i<L.length; i++)
     {       v=F(v,L[i]);
       //putmsg("FOLD "+v+" "+L[i]+" -> "+v)
     }
  return v
}

function Zipwith(L1,L2,F){var ans=new Array();
  for(var i=0;i<L1.length&&i<L2.length;i++)ans.push(F(L1[i],L2[i]));
  return ans
}

//-----------Primes and Factors -------

function isprime(N){
  if(N%2==0)return (N==2);
  var i=3,L=Math.sqrt(N);
  //var stime=(new Date()).getTime();
  while(i<=L && N%i!=0){i+=2}; // var inctime=(new Date()).getTime()-stime;
  return(N>1 && i>L)
};

function primefactors(N){var pfs=new Array();
    if(typeof N=="string")N=eval(N);
    //putmsg("primefactors "+N+" int:"+isInt(N));
    //putmsg("primefs "+N);
    if(!isInt(N))HALT("Cannot call primefactors on "+N+"::"+telltype(N));
    if(N==1)return [[1,1]];
	 var  i,inc,II=N,L=Math.sqrt(N),pct=0;
	 var startat=performance.now();
	 pct=0;while(II%2==0){pct++;II=II/2;L=Math.sqrt(II)};if(pct>0){pfs.push([2,pct]);  };
	 pct=0;while(II%3==0){pct++;II=II/3;L=Math.sqrt(II)};if(pct>0){pfs.push([3,pct]);  };
	 for(i=5,inc=4; i<=L; i=i+(inc=6-inc))
		 {pct=0;
		  while( II%i==0){pct++;II=II/i};
		  if(pct>0){pfs.push([i,pct]);L=Math.sqrt(II);//putmsg("found "+i+"^"+pct)
					};
		 };
	 if(II>1)pfs.push([II,1]);
	 var endat=performance.now();
  //  putmsg("pfs "+N+" has "+pfs.length+" prime factors "+pfstoString(pfs)+" in "+Math.round(endat-startat)+"ms")
    return pfs
};

function mulpfs(L){ // an array of pfs
  var pfs=L[0];
  for(var  i=1;i<L.length;i++)pfs=Zbagunion(pfs,L[i]);
  return pfs
};

function pfsIsSqQ(pfs){var even=true;
 for(var i=0;even&&i<pfs.length;i++)even=pfs[i][1]%2==0;
 return even
};
  
function pfstoString(pfs,opts){//pow=0 means pr may not be prime so use class notprime for the value
  if(arguments.length==1)opts="";
  if(pfs.length==0)return "";
  var s=""; 
  for(var i=0;i<pfs.length;i++)
    s=s+(i==0?"":opts.indexOf("x")>-1?"&times;":opts.indexOf("nosp")>-1?"":" ")+
    (pfs[i][1]==0&&opts.indexOf("nonprime")>-1?"<span class=untestedprime>":"")+
    (pfs[i][0].toN?DIGStobase(pfs[i][0],10):pfs[i][0])+
    (pfs[i][1]==0&&opts.indexOf("nonprime")>-1?"</span>":"")+
    (pfs[i][1]>1?(opts.indexOf("@")>-1?"@"+pfs[i][1]:"<sup>"+pfs[i][1]+"</sup>"):"");
  return s
};

function listabbrevSTR(list,timesch){  // array if number; find tally; return  nb^count string
  return pfstoString(ordlistToZbag(list),(arguments.length==1?"":timesch))
};

function prToPow(prpow){
  //putmsg(prpow[0]+typeof prpow[0] +"<sup>"+prpow[1]+typeof prpow[1]+"</sup>");
  return Math.pow(prpow[0],prpow[1])
  };


function EulerPhi(N,Pfs){ //the number if x in Range[1..N] with gcd(x,N)==1
  //putmsg("Eulerphi "+N);
  var pfs=(arguments.length>=2?Pfs:primefactors(N));
//putmsg("pfs of "+N+": "+pfs);
  var phi=1,i=0;
  while(i<pfs.length)  {var pr=pfs[i][0],po=pfs[i][1]; i++; phi=phi*Math.pow(pr,po-1)*(pr-1)};
  //putmsg("Eulerphi <- "+phi);
 if(!isInt(phi))ERRoverflow("during EulerPhi");
 return phi
};

function EulerPhiPfs(N,Pfs){ //the size of { x in Range[1..N]  | gcd(x,N)==1 }
 // putmsg("EulerphiPfs "+ZbagtoString(Pfs));
  var efs=new Array([1,1]),i=0;
  while(i<Pfs.length)  {
      var pr=Pfs[i][0],po=Pfs[i][1]; i++;
       efs=(po>1?Zbagunion(efs,[[pr,po-1]]):efs);
       efs=Zbagunion(efs,primefactors(pr-1))
     //phi=phi*Math.pow(pr,po-1)*(pr-1)
     };
  //putmsg("EulerphiPfs <- "+ZbagtoString(efs));
 return efs
};

function countdivisors(N){
  if(N==1)return 1;
  var pfs=primefactors(N);
  var d=1,i=0;
  while(i<pfs.length)  {var po=pfs[i].pow; i++; d=d*(po+1)};
  return d
};

function factors(N){
 if(N==1)return [1];
 return factorspfs(primefactors(N));
};

function numorder(a,b){return a-b} // for use in SORT

function factorspfs(pfs){  //given pfs list of [prime,power], find all the factors
  function cpfrom(PrevAnss,Li,L,F){
   //putmsg("cpfrom ")+L;
   if(L.length==Li)return F(PrevAnss);
   var ans=[],prpow=1,pr=L[Li][0],maxpow=L[Li][1];
   for(var i=0;i<=maxpow;i++,prpow=prpow*pr)
      {ans=ans.concat(cpfrom(PrevAnss.concat(prpow), Li+1, L, F));
      };
   //putmsg("cpf <- "+ans);
   return ans
   };
   var fs= cpfrom([],0,pfs,function(L){return eval(L.join('*'))})
      .sort(numorder);
   //putmsg("Factors of "+ZbagtoString(pfs)+" = "+fs);
   return fs
};


function fixedBaseLen(N,D,Base){ //NN::int numerator, DD::int denomin, BASE::int <- Int
  //max nb times a prime^p (max p) factor of BASE divides into Den (NN is not used)
  // N/D MUST be in lowest terms !!
   if(N==0||D==1){ // putmsg(NN+(D.gt(1)?" / "+D:"")+" has no fractional part");
        return 0}
   var W=0,bpp,x,g,simpler=false;
  if(arguments.length<3)Base=10;
// putmsg("$$fixedBaseLen args "+N+"/"+D+"("+Base+")");
  if((g=gcd(N,D))>1){N=N/g;D=D/g;simpler=true;
       // putmsg(NN+"/"+DD+" = "+N+(D>1?"/"+D:""));
       }
  if(D!=1&&N>D)//  HALT(N+"/"+D+" is not a proper fraction (it must be < 1)")
    { //W=N.divToInt(D);
      N=N%D };
  //if(D instanceof DIGS && D.base!=2)D=DIGSbase2(D);
    var Bpfs=primefactors(Base),p,i,maxp=0;
   // putmsg("primefactors of base "+Base+" = "+Bpfs);
    //if(!confirm("finding BNprimefactors of "+D+"..."))return;
    for(i=0,maxp=0;i<Bpfs.length;i++)
      {p=0;
       while(D%Bpfs[i][0]==0){p++;D=D/Bpfs[i][0]};
       if(p>maxp)maxp=p
      };
     // putmsg("$$fixedBaseLen "+D+" fctrs "+Bpfs+" <- "+maxp);
    return maxp
};
function periodBaseLen(D,Base){ //N::int, D::int, Base::int <- int
    if(!isInt(D))HALT("periodBaseLen needs integer D not "+typeof D);
    if(D==1)return 0;
     var Bpfs=primefactors(Base);
    //if(!confirm("finding BNprimefactors of "+D+"..."))return;
    for(i=0,maxp=0,p=0;i<Bpfs.length;i++)
      while(D%Bpfs[i]==0)D=D/Bpfs[i];
   return orderBASE(D,Base)
};
function firstdp(N,D,B){
   if(arguments.length<3)B=10;
  var p1=Math.floor(B*N/D);
  return [p1,N*B-p1*D]
};
//---------- String Utilities -------


function pad(used,requd,padder){   //returns ONLY the padding!
  if(typeof used != "string")used=used.toString();
  if(arguments.length<3)padder="&nbsp;"
  return (requd<=used.length?"":"                    ".slice(0,requd-used.length).replace(/ /g,padder))
};

function fw(n,fwd,pad){ if(arguments.length<3)pad=" ";
   var s=n.toString(); while(s.length<fwd)s=pad+s;  return s};
function fw2(n){  if(n<10){return " "+n   } else return n};

function fxdReptoDecSTR(wholeSTR,fxdSTR,repSTR){
  if(arguments.length!=3)HALT("fxdReptoDecSTR needs 3 args");
  return wholeSTR+(fxdSTR==""&&repSTR==""?"":"."+fxdSTR+(repSTR==""?"":"<span class=celloverline>"+repSTR+"</span>"))
};

function strip(s,remCh){
  if(typeof s !="string")s=s.toString();
  if(arguments.length==1)remCh=" ";
  var RE=new RegExp(remCh,'g');
  return s.replace(RE,"")
 };

function endswith(s,x){if(typeof s != "string")s=s.toString(); if(typeof x != "string")x=x.toString();
  if(s.substring(s.slength-1)==" ")s=revstr(strip(revstr(s)));
  if(s.length>=x.length){return s.substring(s.length-x.length)==x }else{return false}};

function beginswith(s,x){ if(typeof s != "string")s=s.toString(); if(typeof x != "string")x=x.toString();
  s=strip(s," ");
  if(s.length>=x.length){return s.substring(0,x.length)==x }else{return false}};

function revstr(r){var s="";for(var i=0;i<r.length;i++)s=r.charAt(i)+s;return s};
String.prototype.reverse=function(){ //putmsg("rev of "+this +" is "+this.split("")+"-"+this.split("").reverse()
   //+"-"+this.split("").reverse().join(""))
 return this.split("").reverse().join("")
 // var ans=new Array(),maxi=this.length-1;
 // for(var i=0;i<this.length;i++)ans.push(this.charAt(maxi-i));
 // return ans.join()
}

function repstr(nbreps,str){//return "" if nbreps==0
 var s="";
 for(var i=0;i<nbreps;i++)s+=str;
 return s
};
function evalfld(fld,caught)
  {if(arguments.length<2)caught="null";
   var valu;
   if(getElementById(fld))valu=getElementById(fld).value
   else valu=fld;
  return evalstr(valu,caught)
};

function evalstr(s,caught)
  {if(arguments.length<2)caught="null";
   var i;
   try{with(Math)
       i=eval(s  .replace(/infinity/g,"Infinity")
                  .replace(/(\d+)\^(\d+)/g,"pow($1,$2)")
                  .replace(/pi/ig,"PI"))
       }catch(e){i=Number.NaN};
    return i
};

function emptystr(s){return typeof s=="string"&&s.length==0};


// function pisano(mod){
//    var a=1,b=1,c,len=3;
//     while(a!=0 || b!=1)
// 		     { c=a+b;if( c>=mod )c=c-mod;    len++;a=b;b=c;
// 		     };
// 	return len-2
// };

// Renault's code!
function pisano(m)
// Period is 4k mod F(2k) and 8k+4 mod F(2k+1)
{   var a = 0, b = 1,  c = (a+b)%m,k = 1,z;
 if (m == 2){k = 3; z = 1;}
  else 
  { while(b != 0){
     	a = b; b = c; c = (a+b)%m;k++;
 	}
    z=1;
 	if (k%2 == 1){k = k*4; z = 4;}
 	else {if (c != 1){k = k*2; z = 2;}
  } }
 return k
};

//WYTHOFF ARRAY
function wyth(r,c){return Math.floor( (r+1)*Phi )*fib(c+2) + r*fib(c+1) };

function findWcol(n){var zinds=zeckinds(n);return zinds[zinds.length-1]-2};
function findWrow(n){var c=findWcol(n),r=0;while(wyth(r,c)<n)r++;return r};

//ZECKENDORF REP
function zeckinds(n){
       var zinds=new Array(),i=2;
	   while(fib(i)<=n)i++;i--;
	   do{ zinds[zinds.length]=i;
		   n=n-fib(i);
		   if(n==0)return zinds;
		   while(fib(i)>n)i--;
		  }while(true);
	};

function zbits(zis)
	{var bits="",zi=0;
	   if(zis.length==0)return "0"
	   else for(var i=zis[0];i>1;i--)if(i==zis[zi]){bits+="1";if(zi<zis.length)zi++}else{bits+="0"};
	   return bits
	};

// STOLARSKI ARRAY

function stol(r,c){
         if(c==0){a= Math.floor((r+0.5)*Phi)+r+1}
    else if(c>=1){var a=stol(r,0);for(var i=1;i<=c;i++)a=Math.round(a*Phi)};
    return a
    };

function findSrc(n){var c=0,nn;
     do{nn=Math.round(n/Phi);
        if(Math.round(nn*Phi)==n){c++;n=nn;}
        else break;
       }while(true);
     r=Math.floor((n+Phi/2)/(1+Phi));
    return [r,c]
  };
function findSrow(n){return findSrc(n)[0] };
function findScol(n){return findSrc(n)[1] };

//INPUT NUMBERS

function checkinput(fld,nm,opts){  // default: eval input, or include opt "noeval"
  // >>>>>>>>> fld: is usually  getId(fldnm).value which is CHECKED not having BEEN ALREADY GOT from INPUT! <<<<<<<<<
  // opts: emptyval=XXX
   var i,res;
 //putmsg("checkinput "+fld+" "+nm);
   var opts=arguments.length<3?new Object():getArgs(opts);
   if(!opts.emptyval)opts.emptyval=""; //Empty always allowed (when clicking on (?) button; use 'emptyval=NaN' otherwise
   //alert(typeof opts.noeval);
   if(!opts.hasOwnProperty("noeval"))opts.noeval=false;
   //alert(fld);
   fld=fld.replace(/\s/g,"");
   //alert("< "+fld+" "+nm);
   if(fld=="")return opts.emptyval;
   if(!opts.noeval)
       {var xtra=fld.replace(/sqrt/g,"").replace(/[Ii]nfinity/g,"").replace(/pi/gi,"").replace(/[0-9eE\.\-\*\/+\(\)\^\s]/g,"")
         // if(xtra!="" )
         //     halt(nm+": Only numbers, fractions, E, Pi, +,-,*,/, sqrt, Infinity and -Infinity are allowed in input boxes\nFound "+xtra)
              // don't allow trig fns etc
          //else
               i=evalfld(fld,
                  'halt("I do not understand your input to '+nm+' Please change it")');

       if(opts.eval&&isNaN(i))
         {//alert(nm+" is NaN");
            if(fld=="") i=opts.emptyval // empty fields always allowed as input ELSE use:-
           //else if(isemptyinput(fld))halt("The "+nm+" input box must have a value typed in.")
         else halt("No number found for "+nm)
         };
         res=i
        }
     else res=fld;
   //alert(nm+" Noeval="+opts.noeval+" = "+res);
//putmsg("checkinput -> "+res);
   return res
 };
function streval(str){with(Math)return str+" &rarr; "+eval(str)};
function strHas(str,chs){return str.indexOf(chs)>-1}

function checkinputEVALinfo(fldnm){
return "The Mathematical <span class=fn>functions</span> and <span class=const>constants</span> available in "+fldnm+"  are:<br>"+
"Note that they are case-sensitive so must be input exactly as given in the left-hand column.<br>"+
"<table cellspacing=0 cellpadding=4 class=paleBorder bgcolor='#FED'>"+
"<tr><th >Name</th><th>Description</th><th>Example and Notes</th></tr>"+
"<tr><th class=fn>+ &ndash; * / ( )</th><td>Arithmetic operations and brackets</td><td>"+streval("2*3+4/(5-1)")+"</td></tr>"+
"<tr><th class=fn>abs              </th><td class=fn> the absolute value (positive size) </td><td class=fn>"+streval("abs(-3.9)")+"<br>"+streval("abs(3.9)")+"</td></tr>"+
"<tr><th class=fn>acos             </th><td class=fn> arc cosine, the angle for a given cosine </td><td class=fn>"+streval("acos(0.5)")+"<br>"+streval("acos(0.5)/Pi*180")+" (degrees)</td></tr>"+
"<tr><th class=fn>asin         </th><td class=fn> arc sine, the angle for a given sine </td><td class=fn>"+streval("asin(sqrt(3)/2)/Pi*180")+" (degrees)</td></tr>"+
"<tr><th class=fn>atan         </th><td class=fn> arc tangent, the angle A for a given tangent<br><span class=maths>-&pi;/2 &le; A &le; &pi;/2 </td><td class=fn>"+streval("4 * atan(1)")+"<br>which is <span class=mathsym>&pi;</span></td></tr>"+
"<tr><th class=fn>atan2   </th><td class=fn> ang2(y,x) is the  anticlockwise angle A at (0,0)<br>between the  <span class=maths>x&gt;0</span> axis and the point(x,y)<br><span class=maths>-&pi; &le; A &le; &pi;</span></td><td>"+streval("atan2(1,-1)/Pi*180")+" (degrees)</td></tr>"+
"<tr><th class=fn>ceil         </th><td class=fn> round up to the nearest integer </td><td class=fn>"+streval("ceil(-3.9)")+", "+streval("ceil(-3.1)")+"<br>"+streval("ceil(3.1)")+", "+streval("ceil(3.9)")+"</td></tr>"+
"<tr><th class=fn>cos          </th><td class=fn> cosine of an angle (in radians) </td><td class=fn>"+streval("cos(60*Pi/180)")+"<br>"+streval("cos(Pi)")+"</td></tr>"+
"<tr><th class=const>E         </th><td class=const> e </td><td class=const>"+streval("E")+"</td></tr>"+
"<tr><th class=fn>exp          </th><td class=fn> exp(p) means e to the power of p</td><td class=fn>"+streval("exp(1)")+"</td></tr>"+
"<tr><th class=fn>floor        </th><td class=fn> round down to the nearest integer </td><td class=fn>"+streval("floor(-3.9)")+", "+streval("floor(-3.1)")+"<br>"+streval("floor(3.1)")+", "+streval("floor(3.9)")+"</td></tr>"+
"<tr><th class=fn>log          </th><td class=fn> log to base e <br>log<sub>b</sub>(x) is log(x)/log(b)</td><td class=fn>"+streval("log(E)")+"<br>"+streval("log(sqrt(E))")+"<br>"+streval("log(3)/log(2)")+" is log<sub>2</sub>(3)</td></tr>"+
"<tr><th class=const>Phi       </th><td class=const> golden section <span class=mathsym>&Phi;=(&radic;5 + 1)/2</span></td><td class=const>"+streval("Phi")+"</td></tr>"+
"<tr><th class=const>phi       </th><td class=const> golden section <span class=mathsym>&phi;=(&radic;5 &ndash; 1)/2</span></td><td class=const>"+streval("phi")+"</td></tr>"+
"<tr><th class=const>Pi, pi     </th><td class=const> <span class=mathsym>&pi;</span></td><td class=const>"+streval("Pi")+"</td></tr>"+
"<tr><th class=fn>pow          </th><td class=fn> pow(x,p) means <span class=maths>x<sup>p</sup></span> </td><td class=fn>"+streval("pow(2,3)")+"<br>"+streval("pow(3,2)")+"<br>"+streval("pow(2,log(3)/log(2))")+"</td></tr>"+
"<tr><th class=fn>random       </th><td class=fn> a random number between 0 and 1 </td><td class=fn>"+streval("random()")+"<br>"+streval("random()")+"</td></tr>"+
"<tr><th class=fn>round        </th><td class=fn> round to the nearest integer </td><td class=fn>"+streval("round(-3.9)")+", "+streval("round(-3.1)")+"<br>"+streval("round(3.9)")+", "+streval("round(3.1)")+"</td></tr>"+
"<tr><th class=fn>sin          </th><td class=fn> sine of an angle (in radians) </td><td class=fn>"+streval("sin(Pi/2)")+"</td></tr>"+
"<tr><th class=fn>sqrt         </th><td class=fn> square root <span class=mathsym>&radic;</span></td><td class=fn>"+streval("sqrt(2)")+"</td></tr>"+
"<tr><th class=fn>tan          </th><td class=fn> tangent of an angle (in radians) </td><td class=fn>"+streval("tan(Pi/4)")+"</td></tr>"+
"<tr><th class=fn>&gt;&nbsp;&nbsp; &gt;= <br>&lt;&nbsp;&nbsp; &lt;= <br>==&nbsp;&nbsp; !=</th><td class=fn>comparisons between two values, gives <b>true</b> or <b>false</b><br>use in the Conditional part of (?:) expressions</td><td>"+streval("Pi>2")+"<br>"+streval("cos(Pi/3)==0.5")+" but should be <b>true</b><br>This is caused by rounding in the final computed digit<br>Better is: "+streval("abs(cos(Pi/3)-0.5)<0.0000001")+"</td></tr>"+
"<tr><th class=fn>( expr ? t : f)</th><td >conditional expression; <br>if <b>expr</b> is true then t is evaluated as the result,<br> if false then f is evaluated as the result</td><td>"+streval("(sqrt(10)>=3 ? 4 : 3)")+"</td></tr>"+
"<tr><th class=fn><a name='fibs'></a>fib, Fib or F</th><td class=fn>Fib(n) is the n-th Fibonacci number</td><td class=fn>"+streval("F(10)")+', '+streval("Fib(-5)")+"</td></tr>"+
"<tr><th class=fn>luc, Luc or L</th><td class=fn>Luc(n) is the n-th Lucas number</td><td class=fn>"+streval("L(10)")+", "+streval("Luc(0)")+"</td></tr>"+
"<tr><th class=fn>G</th><td class=fn>G(a,b,n) is the n-th General Fibonacci number where G(a,b,0)=a,G(a,b,1)=b</td><td class=fn>"+streval("G(3,1,5)")+", "+streval("G(1,3,-4)")+"</td></tr>"+
"</table>"
}
var expressionHELP=checkinputEVALinfo;

function isemptyinput(str){return str.replace(/\s/,'')==''};

function getInput(Fld,Fldnm,Cond){var valu,dbg=false;
	  //Cond = string containing Z (proper ints only),+(+ve only),0(0 allowed), O=optional fld, F=not empty
	  //s = spaces allowed and removed
	  //    eval,   noeval, emptyval=E   MUST have N or Z or + to check isInt
	  // initial zeroes are ignored!!
	  // BEWARE 0=="" is TRUE so to check for empty string use !isInt(n) && n==""
	if(arguments.length<3)Cond="";
	if(Cond.indexOf("?")!=-1){dbg=true};
	var x; if(dbg)putmsg("$getInput &lt;"+Fld+"&gt; &lt;"+Fldnm+"&gt; "+Cond)
	       if(dbg)putmsg("$getInput1 input is "+getElementById(Fld).value);
    if(typeof Fld==="string"&&Fld!=""&&getElementById(Fld))valu=getElementById(Fld).value
	else valu=Fld;
          if(dbg)putmsg("$getInput2 "+Fldnm+": "+valu+" cond:"+Cond+" "+[Cond.toLowerCase().indexOf("noeval"),Cond.indexOf("eval")]);
	if(Cond.indexOf("s")!=-1)valu=valu.replace(/\s/g,"");
	if(valu.replace(/\s/g,"").length==0)x=""
	else{ //if(dbg)putmsg("$getInput 3 PRE noval at "+Cond.toLowerCase().indexOf("noeval"))
        if(Cond.toLowerCase().indexOf("noeval")==-1&&Cond.indexOf("eval")>-1)
                 {valu=valu.replace(/(^|[^\.0-9])0*([.1-9])/g,"$1$2").replace(/(^|[^a-zA-Z])pi($|[^a-zA-Z])/g,"$1Pi$2");
                        if(dbg)putmsg("$getInput3 EVAL "+valu);
                   if(valu.search(/[|^&~<>]/)!=-1){HALT("The expression in "+Fldnm+" cannot be evaluated: it contains ^, !, &, ~, < or >");}
                  try{with(Math)x=eval(valu)}catch(e){x=Number.NaN};
                         if(dbg)putmsg("#getInput3 POST EVAL <- "+x)
                  if(isNaN(x) || isNaN(x))HALT("The expresssion in "+Fldnm+" cannot be evaluated");
                 }
        else x=valu} 
    if(typeof x==="string"&&x.length==0) //AAGH!! 0=="" is TRUE!!!
	  {                  if(dbg)putmsg("$getInput5 input "+Fldnm+" was EMPTY Cond="+Cond+"     0==''? "+(0==""));
	   if( Cond.indexOf("O")>-1&&Cond.indexOf("emptyval")==-1)
	      return x
	   else if(Cond.indexOf("emptyval")>-1)
	     {var e=Cond.charAt(Cond.indexOf("emptyval=")+9);
	                       if(dbg)putmsg("$getInput6 "+Fldnm +" is EMPTY : "+e+"="+isInt(e));
	       if(isInt(e))return eval(e)
	       else return e
	     }
	   else if(Cond.indexOf("F")>-1||Cond.indexOf("O")==-1)halt("Please enter a number for "+Fldnm)
	   else if(x==0&&Cond.indexOf("0")==-1)halt("Zero is not allowed in "+Fldnm);
	   else return x
	  }
	     if(dbg)putmsg("$getInput7  "+x+" ::"+typeof x+" isNaN:"+isNaN(x));
	if(Cond.indexOf("Z")>=0 ||Cond.indexOf("N")>=0)
	{  if(isNaN(x) )//|| !isFinite(x))
	  {halt("Please change your entry for "+Fldnm+(Cond.indexOf("eval")==-1?": it is not a number":": it cannot be evaluated"))};
	  if(isInt(x)){x=parseInt(x);  //ignores initial 0s!!
	       if(dbg)putmsg("$getInput8 eval "+x)}
	  else{ if(x.toString().indexOf(".")!=-1 || x.toString().toLowerCase().indexOf("e")!=-1)
	         halt("Your value for "+Fldnm+" must be a whole number.")
	       else halt("Your value for "+Fldnm+" is too large - sorry.")
	      }
	};
	if( (Cond.indexOf("Z")>=0||Cond.indexOf("N")>=0) && (x==x+1))
	  halt("Your value for "+Fldnm+" is too large - sorry.");
	if(Cond.indexOf("Z")>=0 && Fld.replace(/[0-9]/g,"")=="" && Fld!=Math.round(Fld).toString())
	   halt(Fldnm+" value is too large - sorry!");
	if((Cond.indexOf('Z')>=0||Cond.indexOf('N')>=0) &&!isInt(x))
	   halt(Fldnm+" must be a whole number>0");
	if(x<0&&( Cond.indexOf("+")>=0||Cond.indexOf("N")>=0) )      halt("Input for "+Fldnm+" cannot be negative ("+x+")")
	//putmsg("getinp "+Fldnm+" -> "+x);
	if(!isNaN(x)&&x==0&&Cond.indexOf("0")==-1)halt(Fldnm+": Zero is not allowed in '"+Fldnm+"'");
	  return x };


var maxdps=Math.PI.toString().length-2;

// HIDE & SHOW

// POP UPS

function clickedAt(e){
  var pos=new Object();
    if (!e) var e = window.event;
	if (e.pageX) 	{pos.x = e.pageX;pos.y = e.pageY;}
	else if (e.clientX) 	{
		pos.x = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		pos.y = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
      }
   else {pos.x=e.clientX;pos.y=e.clientY};
  alert('clicked '+pos.x+" "+pos.y);
  return pos
};

function moveObjectToClick(e,obj){
	 var where=clickedAt(e);
	 if(typeof obj=='string')id=document.getElementById(obj);
	 alert("click at "+obj.name+" to "+where.x+","+where.y);
	obj.style.left = where.x;
	obj.style.top  = where.y;
};

function showAtClick(e,id){moveObjectToClick(id); alert(is+" is moved");showId(id)};

//<A href="javascript:;" onClick="showAtClick(event,'n1');">Pop-up available here.</A>


function popupID(fldnm,pos,winsizex,winsizey){
   //if(!pos)alert('clicked at '+clickedAt());
   if(arguments.length<3){winsizex=400;winsizey=350};
    var w=window.open("","tip","scrollbars=no,resizable=yes,menubar=no,"
     +"status=no,toolbar=no,dependent=yes,location=no");
     w.blur();
   //  alert('resz +winsizex+","+winsizey);
    w.resizeTo(winsizex,winsizey);
// alert("pos to move to is ("+pos.x+","+pos.y+")");
    if(pos&&pos.x)w.moveTo(pos.x,pos.y)
    else w.moveTo(200,100);
    w.document.open();
    w.document.writeln("<html><head><link rel='stylesheet' type='text/css' href='../global.css'>  "
    +"</head><body class='popupwin' style='overflow:auto'>" //<textarea>"
    +(fldnm
     ?document.getElementById(fldnm).innerHTML
     :
		"You can enter Numbers or Expressions:<dl>"+
		"<dt>Operations:<dd> + - * / <dt>Constants:<dd> E PI Phi phi "+
		"<dt>Functions:<dd> <ul><li>abs(real),pow(num,power),sqrt(real)</li>"+
		"<li>sin,cos,tan,asin,acos,atan,</li><li>exp,log,log10,logBase(b,x)</li>"+
		"<li>gcd(a,b),lcm(a,b),powmod(x,toPow,mod),EulerPhi</li><li> ... </li></dl>"
     )
    + //" </textarea>"+
    "<hr><input type=button value='Close window' onClick='window.close()') style='background-color:white;color:black'></body>");
    w.document.close();
      w.focus()

     return w
}

function popup1toggle(id) {
    var popup = document.getElementById(id);
    popup.classList.toggle("show");
}
function getPosition(eltID) {  //adapted from www.kirupa.com !
  var el=getElementById(eltID);
  if(!el||el===null)HALT("?? There is no element with ID "+eltID+" (getPosition)");
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {  x: xPos,  y: yPos};
}

function showMoreOrLess(divId,incdec,btn){
    var newd,vval,units,
       v=document.getElementById(divId).style.height;
       if(v.indexOf("px")>-1)
         {incdec=(incdec<0?-1:1)*200;vval=v.replace("px","");units="px"}
       else {vval=v.replace("em","");units="em"}
    if(!isNaN(vval))
    {  newd=eval(vval)+incdec; //alert(newd);
       if(newd<Math.abs(incdec))newd=Math.abs(incdec);
       //alert("ht="+vval+" new="+newd+units);
       //v=newd;
       document.getElementById(divId).style.height=newd+units
       if(document.getElementById(divId+"less"))
          { //putmsg('opac->'+newd+units+" reduce:"+(newd<=(units=="em"?15:200)));
           document.getElementById(divId+"less").style.opacity= (newd<=(units=="em"?15:200)?0.2:1)
          };
}   }

///////////////////////// HIDE and SHOW /////////////

function showhideIdA(nm){
  var a=getElementById(nm+"A");
       if(a.text.indexOf("Show")>-1)
      { showId(nm+"DIV");a.text=a.text.replace("Show","Hide")}
  else if(a.text.indexOf("Hide")>-1)
      { hideId(nm+"DIV");a.text=a.text.replace("Hide","Show")}
  else if(a.text.indexOf("More")>-1)
      { showId(nm+"DIV");a.text=a.text.replace("More","Less");}
  else if(a.text.indexOf("Less")>-1)
      { hideId(nm+"DIV");a.text=a.text.replace("Less","More");}
};

function showhideOPT(selID,showvals,showhideID){
  var v=getSELval(selID);
  if(!v)HALT("$$ showhideOPT cannot find SELECT "+selID);
  if(Arrayhas(v,showvals))seeId(showhideID)
  else dontseeId(showhideID)
};

function btntext(btnID){
  var b=document.getElementById(btnID);
  if(!b)HALT("No button has ID  "+btnID);
  if(b.value)return b.value;
  if(b.innerHTML)return b.innerHTML
  HALT("BUtton type unknown in 'btntext' : "+btnID)
};
function btntextSET(btnID,newtxt){
  var b=document.getElementById(btnID);
  if(!b)HALT("No button has ID  "+btnID);
  if(b.value){b.value=newtxt;return}
  if(b.innerHTML){b.innerHTML=newtxt;return}
  HALT("BUtton type unknown in 'btntextSET' : "+btnID)
};
function showhideIdBTN(info,btnID,d,Swop){
//info is a string, a list of strings or [string,nb] meaning string+1,string+2,...string+n
   if(arguments.length==1){btnID=info+"BTN";info=info+"DIV"};
   if(arguments.length<=2)d='block';
   if(arguments.length<4)
     {if(btntext(btnID).match("More")||btntext(btnID).match("Less"))
        Swop=["Less","More"]
      else Swop=["Hide","Show"]}
  // alert(btnID+" "+info);

   if(btntext(btnID).match(Swop[0]))
   {if(typeof info=="string")hideId(info)
   else if(info.length==2&&typeof info[1]=="number")
          for(var i=1;i<=info[1];i++)hideId(info[0]+i)
   else {for(var i=0;i<info.length;i++)hideId(info[i])}
    btntextSET(btnID,btntext(btnID).replace(Swop[0],Swop[1]))
   }else
   {if(typeof info=="string")showId(info,d)
     else if(info.length==2&&typeof info[1]=="number")
          for(var i=1;i<=info[1];i++)showId(info[0]+i)
      else{for(var i=0;i<info.length;i++)showId(info[i],d)}
     btntextSET(btnID,btntext(btnID).replace(Swop[1],Swop[0]))
   };
   var x=document.getElementById(btnID).classList;
   //alert("classlist: "+x);
         if(x.contains("less"))x.replace("less","more")
    else if(x.contains("more"))x.replace("more","less")
    else if(x.contains("showhidespan")) x.add("less");
//if(btntext(btnID).indexOf("&#9660;")>-1)btntextSET(btnID,btntext(btnID).replace("&#9660;","&#9650;"))
//    else if(btntext(btnID).indexOf("&#9650;")>-1)btntextSET(btnID,btntext(btnID).replace("&#9650;","&#9660;"))
    
//        if(x.className=="more")x.className="less"
//   else if(x.className=="less")x.className="more";
   
   document.getElementById(btnID).blur();
};



function toggleBTN(btnId,Swop){
  var btn=document.getElementById(btnId);
  if(!btn)halt("cannot toggle button "+btnId);
  if(arguments.length==1)Swop=['Hide',"Show"];
  if(btn.value.match(Swop[0]))
    btn.value= btn.value.replace(Swop[0],Swop[1])
  else btn.value= btn.value.replace(Swop[1],Swop[0])
  btn.blur();
};

function hideId(id,alertQ)
{if(arguments.length==1)alertQ=true;
var e=document.getElementById(id);
 if(e)e.style.display='none' //;  alert('hide '+nm);
 //else if(alertQ)alert("!!No object "+nm+" to hide!!")
};

function showId(nm,d)
{ var e=document.getElementById(nm);
 if(arguments.length==1)d='block';
 // alert('show '+nm+" -> "+d);
 if(e)e.style.display=d
 //else alert("!!No object "+nm+" to show!!")
}

function showName(nm,d)
{if(arguments.length==1)d='block';
//alert('show '+nm+" -> "+d);
var objs=document.getElementsByName(nm);
for(var i=0;i<objs.length;i++)objs[i].style.display=d;
}

function showhidetoggle(nm,d)
{ if(arguments.length==1)d='block';
  if(document.getElementById(nm).style.display != 'none')
       hideId(nm)
  else showId(nm,d)
};

function toggle(id) {  //Hide or show an element with given Id or elts with given Name
  var e = document.getElementById(id);
  if(e)e.style.display = (e.style.display!='none'?'none':'')
  else{}
}

function toggle2(id, link) {
//Hide or show an element with given Id and change
//text of the LINK accordingly....when calling, use "this" for arg 2 in onClick

  var e = document.getElementById(id);

  if (e.style.display == '') {
    e.style.display = 'none';
    link.innerHTML = 'More';
  } else {
    e.style.display = '';
    link.innerHTML = 'Less';
  }
}


function markans(prefx,nb){//1..nb find input ids and check ans fld==value fld. If wrong, show correct answer
  for(var i=1;i<=nb;i++)
  {var f=getElementById(prefx+i);
   if(!f)HALT("||BUG!! There is no "+prefx+i+" input to mark");
   if(f.value==f.placeholder){}
   else {if(f.value!="")f.style.color="red";f.value=f.placeholder;}
  }
};
function clearans(prefx,nb){ //1..nb  set values to "".
  for(var i=1;i<=nb;i++)
  {getElementById(prefx+i).value="";}
};
function showhelpwin(visibQ){  //arg=true to show, false to hide it.   Use puthelpwin(txt)
   //alert((visibQ?"showing":"hiding"));
   var w=document.getElementById("helpDIV");
   w.style.display=(visibQ?"block":"none")
};

function puthelpwin()
  //no args -> window is cleared
{ var w=document.getElementById("helpDIV"),txt="";
   if(arguments.length==0){w.innerHTML="";return}
   for(var i=0;i<arguments.length;i++)txt+=arguments[i].toString();
   w.innerHTML += txt+"<br>";
  // w.scrollTop = w.scrollHeight;
  // w.scrollLeft=0
};

function puthelpwinclose(){
  puthelpwin("<hr><div align=center><input type=button value='Close this window' onClick='showhelpwin(false)'></div>")
//   with(document.getElementById("helpDIV"))
//     {document.close();
//      //focus()
//      }
};

////////  see - use with VISIBILITY, not DISPLAY.  They have white space until "seen"
function dontseeId(nm)
 { if(arguments.length==0)nm="Soln";
         if (document.getElementById) {document.getElementById(nm).style.visibility = "hidden";}
    else if (document.all) {document.all[nm].style.visibility = "hidden";}
    else if (document.layers) {document[nm].visibility = "hide";}
    else {var w=eval(nm).style;w.visibility="hidden"};
 };

function seeId(nm)
 {if(arguments.length==0)nm="Soln";
 	     if (document.getElementById) {document.getElementById(nm).style.visibility = "visible"; }
     else if (document.all) {document.all[nm].style.visibility = "visible"; }
 	else if (document.layers) {document[nm].visibility = "show"; }
 	else {var w=eval(nm).style;w.visibility="visible"};
 };


function seetoggle(nm)
 {var vis;
          if(arguments.length==0)nm="Soln";
 	     if (document.getElementById) {vis= document.getElementById(nm).style.visibility == "visible"; }
     else if (document.all) {vis = document.all[nm].style.visibility == "visible"; }
 	else if (document.layers) {vis = document[nm].visibility == "show"; }
 	;// else {var w=eval(nm).style;w.visibility="visible"};
 	if(vis) dontseeId(nm)
 	else seeId(nm)
 };

function seedontIdBTN(info,btnID){
   if(arguments.length==1)btnID=info;
   if(document.getElementById(btnID).value.match('Hide'))
   {if(arguments.length==2)dontseeId(info);
    document.getElementById(btnID).value= document.getElementById(btnID).value.replace('Hide','Show')
   }else
   {if(arguments.length==2)seeId(info);
    document.getElementById(btnID).value= document.getElementById(btnID).value.replace('Show','Hide')
   };
   document.getElementById(btnID).blur();
};

///////////////////////////////

function setStyle(nm,valpair) {if(arguments.length==0)nm="Soln";
   var attr=valpair.slice(0,valpair.indexOf(":")),attrval=valpair.slice(valpair.indexOf(":")+1);
         if (document.getElementById)
          {document.getElementById(nm).style[attr] = attrval;}
    else if (document.all) {document.all[nm].style[attr] = attrval }
	else if (document.layers) {document[nm][attr] = attrval }
	else {var w=eval(nm).style;w[attr]=attrval};
};

function addClass(element, classToAdd) {
    var currentClassValue = element.className;
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        } else {
            element.className += " " + classToAdd;
        }
    }
}

function removeClass(element, classToRemove) {
    var currentClassValue = element.className;
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
    element.className = filteredList.join(" ");
}

function findpos(obj){
  var curleft=0,curtop=0;
  if (obj.offsetParent)
    do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  return [curleft,curtop];
}

/////////////// SET Object

function isEltOfArray(elt,a){ 
  var found=false;
  for(var i=0;!found&&i<a.length;i++)found= (a[i]==elt);
  return found
};

function ASSOCARR(){  // as is an array of [elt,otherinfo]. Return [otherinfo] for all elt in as
  this.eltvals=new Array();
};

ASSOCARR.prototype.length=function(){  return this.eltvals.length }

ASSOCARR.prototype.push=function(elt,info){
  for(var i=0;i<this.eltvals.length;i++)
    if(this.eltvals[i][0]==elt){this.eltvals[i][1].push(info);return}
  this.eltvals.push([elt,[info]])
};

ASSOCARR.prototype.assoc=function(elt){
  for(var i=0;i<this.eltvals.length;i++)
    if(this.eltvals[i][0]==elt)return this.eltvals[i][1];
  return []
};

ASSOCARR.prototype.index=function(elt){
  for(var i=0;i<this.eltvals.length;i++)
     if(this.eltvals[i][0]==elt)return i
  return -1
};

ASSOCARR.prototype.sort=function(){
  this.eltvals.sort(function(a,b){return a[0]-b[0]})
};

ASSOCARR.prototype.toString=function(colon,comma,ender){var s="";
  if(arguments.length<1)colon=":";
  if(arguments.length<2)comma=",";
  if(arguments.length<3)ender=" ";
  for(var i=0;i<this.eltvals.length;i++)s+=this.eltvals[i][0]+colon+this.eltvals[i][1].join(comma)+ender;
  return s
};

ASSOCARR.prototype.concat=function(assocs){
 // all elts of assocs are added into THIS with their associated vals
  for(var i=0;i<assocs.length();i++)
     {var ev=assocs.eltvals[i];
      for(var j=0;j<ev[1].length;j++)this.push(ev[0],ev[1][j])
     }
};

ASSOCARR.prototype.extend=function(assocs,where){
  //only those elts of assocs already in THIS have their associations extended
  //where is "-1" for end, "0" for beginning
  var ind,i;//alert("extending with "+assocs.length());
  if(arguments.length<2)where=-1;
  for(i=0;i<assocs.length();i++)
    if((ind=this.index(assocs.eltvals[i][0]))>-1)
      if(where==-1)
        for(j=0;j<assocs.eltvals[i][1].length;j++)
              this.eltvals[ind][1].push(assocs.eltvals[i][1][j])
      else
        for(j=assocs.eltvals[i][1].length;j>=0;j--)
              this.eltvals[ind][1].unshift(assocs.eltvals[i][1][j])
};

function Arraypos(elt,a,eqFN){var found=false;
  for(var i=0;!found&&i<a.length;i++)if((arguments.length==3?eqFN(a[i],elt):a[i]==elt))break;
  return (i==a.length?-1:i)
};

function Arrayhas(elt,a,eqFN){ return (arguments.length==3?Arraypos(elt,a,eqFN): Arraypos(elt,a))!=-1};

function ArraySearch(fn,a){var found=unsure;
  for(var i=0;found==unsure&&i<a.length;i++)
    if(fn(a[i]))found=present;
  return found==present
};

function ArrayIntersect(a,b,eqFN){
  var intsect=new Array();
  for(var i=0;i<a.length;i++)
    if((arguments.length==2?Arrayhas(a[i],b) 
       :Arrayhas(a[i],b,eqFN)))  intsect.push(a[i]);
 //putmsg(a+ " Intersect "+b+" = "+intsect); 
 return intsect
};

function  Arrayequal(a, b,eqFN) {  //elts are equal and  in same order
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (arguments.length==2?a[i] != b[i]:!eqFN(a[i],b[i])) return false;
  };  
  return true;
};

function Arraygcd(a){
 if(!a.length)HALT("Arraygcd called on non-array: "+typeof a);
 for(var g=a[0],i=1;i<a.length;i++) g=gcd(g,a[i]);
 return g
};

function Arraysum(a){
  if(!Array.isArray(a))HALT("Arraysum called on non=array: "+typeof a);
  for(var s=0,i=0;i<a.length;i++)s+=a[i];
  return s
};

function ArrayANDlist(a,sty){
  if(! Array.isArray(a))HALT("$$ Array is needed as arg 1 in ArrayANDlist!");
  if(arguments.length<2)sty="";
  if(a.length<2)a=[a];
  var s=(sty==""?a:map(a,function(x){return "<span class=sty>"+x+"</span>"})).join(", ");
  var comat=s.lastIndexOf(", ");
  var ans= (comat==-1?s:s.slice(0,comat)+" and "+s.slice(comat+2));
  //putmsg("AandL: "+ s+" comat "+comat+" ans "+ans);
  return ans
};
function SET(els){
 if(arguments.length==0)els=[];
 if(els.setsize)  //copy SET
   {this.elts=els.elts.slice();
    this.setsize=els.setsize;
    return};
 this.elts=new Array();
 for(var i=0;i<els.length;i++)
   if(!isEltOfArray(els[i],this.elts))this.elts.push(els[i]);
 this.setsize=this.elts.length;
};

SET.prototype.newElt=function(e){this.elts.push(e);this.setsize++};
SET.prototype.toString=function(){return "{"+this.elts.join(",")+"}"};
SET.prototype.eltat=function(i){return this.elts[i] };
SET.prototype.haselt=function(e){ return isEltOfArray(e,this.elts) };

function SETunion(s1,s2){
  var u=new SET(s1);
  for(var i=0;i<s2.setsize;i++)
     if(!u.haselt(s2.elts[i]))u.newElt(s2.elts[i]);
  return u
}

function SETintersection(s1,s2){
  var I=new SET([]);
 // putmsg("<< Intersect "+s1+"("+s1.setsize+") and "+s2+" ("+s2.setsize+")");
  if(s1.setsize==0||s2.setsize==0)return I;
  for(var i=0;i<s1.setsize;i++)
    if(s2.haselt(s1.elts[i])){I.newElt(s1.elts[i])};
  //putmsg("Intersect is "+I);
  return I
};

function SETdiff(s1,s2){
  var D=new SET();
  for(var i=0;i<s1.setsize;i++)
    if(!s2.haselt(s1.elts[i]))D.newElt(s1,elts[i]);
  return D
}


/////////////////// ARR Object - Array allowing -ve indices

function ARR(lo,hi,mt){//a JS array type which allows -ve indices
//putmsg("ARR "+lo+" "+hi+" "+mt)
  if(arguments.length<3)mt=0;
  this.empty=mt;
  this.lwb=lo;this.upb=hi;
  this.elts=new Array(hi-lo+1);for(var i=0;i<hi-lo+1;i++)this.elts[i]=this.empty;
  this.length=this.upb-this.lwb+1;
 }

ARR.prototype.at=function(i)
   {if(this.inrange(i)){return this.elts[i-this.lwb]} else return this.empty};
ARR.prototype.set=function(ind,val){
          if(ind<this.lwb){var extra=new Array();for(var i=this.lwb-1;i>=ind;i--)extra[i-ind]=this.empty;this.lwb=ind;
                 this.elts=extra.concat(this.elts)}
     else if(ind>this.upb){var extra=new Array();for(var i=0;i<ind-this.upb;i++)extra[i]=this.empty;this.upb=ind;
                 this.elts=this.elts.concat(extra)}
     this.elts[ind-this.lwb]=val};
ARR.prototype.inc=function(i,addon){var currval=this.at(i);this.set(i,currval+addon)};
ARR.prototype.toString=function(){return this.elts};
ARR.prototype.inrng=function(lind,rind){
           return this.elts.slice(lind-this.lwb,rind-this.lwb+1)}

function cartprod(a1,a2,F){ //return an array of all F(elta1,elta2)
  var cp=new Array();
  for(var i=0;i<a1.length;i++)
    for(var j=0;j<a2.length;j++)
      cp.push(F(a1[i],a2[j]));
  return cp
};

function repeatelt(e,nb){ //return an array of nb copies of e
	var a=new Array();
	for(var i=0;i<nb;i++)a[i]=e;
	return a
};

function reversearray(a){return a.slice().reverse()};

 function changeOpac(opacity, id) {
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
     object.KhtmlOpacity = (opacity / 100);
}

function RANGE(f,t){
	this.from=f;
	this.to=t;
	this.size=t-f+1;
};

RANGE.prototype.toString=function(){
   return (this.from==this.to?this.from:this.from+rangech+this.to) }

function RANGEby(f,len){  return new RANGE(f,f+len-1)  };
function inRange(x,lo,hi){ return lo<=x&&x<=hi };

function stringhasRANGE(str,sub){
 // alert(str+" :: "+sub)
  return RANGEby(str.indexOf(sub),sub.length) };

// Use a div:
// <div style="background-image: url(pen0.gif); background-repeat: no-repeat; width: 285px; height: 432px;"
//      id="blenddiv">
//
//     <img src="pen0.gif" style="width: 285px; height: 432px; border: 0 none;  -moz-opacity: 0; opacity: 0;" id="blendimg" alt="" >
//
// </div>
// then change image with
// <input type=button onClick="blendimage('blenddiv','blendimg', 'pen1.gif',600)" value="1">
//

function blendimage(divid, imageid, imagefile, millisec) {
    if(arguments.length<4)millisec=1000;
    var speed = Math.round(millisec / 100),w,h;
    var timer = 0,tID;
    //set the current image as background
    document.getElementById(divid).style.backgroundImage = "url(" + document.getElementById(imageid).src + ")";
    //make image transparent
    changeOpac(0, imageid);
    //make new image
    document.getElementById(imageid).src = imagefile;
    //fade in image
    for(var i = 0; i <= 100; i++) {
        tID=setTimeout("changeOpac(" + i + ",'" + imageid + "')",(timer * speed));
        timer++;
    };
   clearTimeout(tID);
}

function changeStyle(objID,stypairs){ // style:value separator=;
  var S=document.getElementById(objID).style;
  var pairs=stypairs.split(";");
  for(var i=0;i<pairs.length;i++)
  { var pos=pairs[i].indexOf(":");
	if(pos==-1)S[pairs[i]]=true  //allow ids with no values
	else S[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);
   };
};

function resizeIMG(imgID,w,h){
  if(arguments.length<3)halt("$$ resize img needs width and height");
  var i=document.getElementById(imgID);
  if(!i)halt("$$ There is no image called "+imgID+" to resize");
  i.width=w; i.height=h
};


function changeProp(objID,proppairs){  //prop=value separator=,
  var S=document.getElementById(objID);
  var pairs=proppairs.split(",");
  for(var i=0;i<pairs.length;i++)
  { var pos=pairs[i].indexOf("=");
	if(pos==-1)S[pairs[i]]=true  //allow ids with no values
	else S[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);
   };
};

function imgnameswop(nm,img1,img2,prefx){
  if(arguments.length==3)prefx="../images/";
  var objs=document.getElementsByName(nm);
      n=objs.length;
  if(n==0)HALT("No images have name "+nm);
  for(var i=0;i<n;i++)
    objs[i].src=prefx+(objs[i].src.indexOf(img1)>=0?img2:img1)
};

function imgIDswop(id,img1,img2,prefx){
  if(arguments.length==3)prefx="../images/";
  var objs=document.getElementById(id);
  if(!objs)HALT("No images have id "+id);
   objs.src=prefx+(objs.src.indexOf(img1)>=0?img2:img1)
};

function imgIDset(id,img1,img2,prefx,test){
  if(arguments.length==2){prefx="";test=true;}
  if(arguments.length==3)prefx="../images/";
  var objs=document.getElementById(id);
  if(!objs)HALT("No images have id "+id);
  objs.src=prefx+(test?img1:img2)
};

function BTNvaluehas(btnID,txt){
  return document.getElementById(btnID).value.indexOf(txt)==-1
}


