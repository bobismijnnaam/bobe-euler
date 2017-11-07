
var scale="0123456789ABCDEFF";
var defaultcoloursorder=[["black"],["white"],["red"],["lime"],["blue"],["yellow"],
["cyan"],["magenta"],["silver"],["gray"],["maroon"],["olive"],["green"],["purple"],["teal"],["navy"],
["maroon"],["darkred"],["brown"],["firebrick"],["crimson"],["red"],["tomato"],["coral"],["indianred"],
["lightcoral"],["darksalmon"],["salmon"],["lightsalmon"],["orangered"],["darkorange"],["orange"],
["gold"],["darkgoldenrod"],["goldenrod"],["palegoldenrod"],["darkkhaki"],["khaki"],["olive"],
["yellow"],["yellowgreen"],["darkolivegreen"],["olivedrab"],["lawngreen"],["chartreuse"],
["greenyellow"],["darkgreen"],["green"],["forestgreen"],["lime"],["limegreen"],["lightgreen"],
["palegreen"],["darkseagreen"],["mediumspringgreen"],["springgreen"],["seagreen"],
["mediumaquamarine"],["mediumseagreen"],["lightseagreen"],["darkslategray"],["teal"],
["darkcyan"],["aqua"],["cyan"],["lightcyan"],["darkturquoise"],["turquoise"],["mediumturquoise"],
["paleturquoise"],["aquamarine"],["powderblue"],["cadetblue"],["steelblue"],["cornflowerblue"],
["deepskyblue"],["dodgerblue"],["lightblue"],["skyblue"],["lightskyblue"],["midnightblue"],
["navy"],["darkblue"],["mediumblue"],["blue"],["royalblue"],["blueviolet"],["indigo"],
["darkslateblue"],["slateblue"],["mediumslateblue"],["mediumpurple"],["darkmagenta"],
["darkviolet"],["darkorchid"],["mediumorchid"],["purple"],["thistle"],["plum"],["violet"],
["magenta"],["fuchsia"],["orchid"],["mediumvioletred"],["palevioletred"],["deeppink"],["hotpink"],
["lightpink"],["pink"],["antiquewhite"],["beige"],["bisque"],["blanchedalmond"],["wheat"],
["cornsilk"],["lemonchiffon"],["lightgoldenrodyellow"],["lightyellow"],["saddlebrown"],
["sienna"],["chocolate"],["peru"],["sandybrown"],["burlywood"],["tan"],["rosybrown"],["moccasin"],
["navajowhite"],["peachpuff"],["mistyrose"],["lavenderblush"],["linen"],["oldlace"],
["papayawhip"],["seashell"],["mintcream"],["slategray"],["lightslategray"],["lightsteelblue"],
["lavender"],["floralwhite"],["aliceblue"],["ghostwhite"],["honeydew"],["ivory"],["azure"],
["snow"],["black"],["dimgray"],["gray"],["darkgray"],["silver"],["lightgray"],["gainsboro"],
["whitesmoke"],["white"]];


function findnamedcol(nm,cols){
   if(arguments.length==1)cols=colours
  // else  	  alert("find in "+cols.length+" cols");

	var i=0,searching=true;
	nm=nm.toLowerCase().replace(/\s/g,"");
	while(searching&&i<cols.length)
	{
	   if(cols[i][0] ==nm //.toLowerCase().replace(/\s/g,"")
	     ){searching=false}
	   else i++};
	//alert("name search "+nm+" <- "+i+" out of "+colours.length+" name:"+(!searching?colours[i][0]:""))
	return (searching?-1:i)
};

function PickColor(sThisColor)	{
	if(arguments.length==0)sThisColor = getSELval("selectcolname").toLowerCase();
	i=findnamedcol(sThisColor);
	if(i<0)HALT("Name "+sThisColor+" is not in the array!!");
	document.getElementById("namedcolDIV").style.backgroundColor = sThisColor;
	//alert("Brightness of "+sThisColor+" = "+brightness(hexToRGB(colours[i][1])));
	document.getElementById("namedcolDIV").style.color =
	  (brightness(hexToRGB(colours[i][1]))<0.5? "white" : "black" );
     sThisColor+=" "+colours[i][1]
    document.getElementById("RGBname").value=sThisColor;
    return i
};

function hexNb(str2){
   str2=str2.toUpperCase();
   var ans= scale.indexOf(str2.charAt(0))*16+scale.indexOf(str2.charAt(1))
   //alert(str2+" -> "+ans);
   return ans
};

function hex6toNbs(hex6){
   if(hex6.length<6||hex6.length>7)HALT("?? hex6toNbs needs hex6 colour. Found "+hex6);
   if(hex6.charAt(0)=="#")hex6=hex6.slice(1);
    var r=hex6.slice(0,2),g=hex6.slice(2,4),b=hex6.slice(4);
    //alert("hex6tonbs "+hex6+" "+[hexNb(r),hexNb(g),hexNb(b)]);
    return [hexNb(r),hexNb(g),hexNb(b)]
};

function hex3tohex6(hex3){
  if(! (typeof hex3==="string"))HALT("?? hex3tohex6 needs hex3");
   if(hex3.charAt(0)=="#")hex3=hex3.slice(1);
 if(hex3.length!=3)HALT("hex3tohex6 argument must be 3 chars");
  var ans= hex3.charAt(0)+hex3.charAt(0)+hex3.charAt(1)+hex3.charAt(1)+hex3.charAt(2)+hex3.charAt(2)
  //alert(ans)
  return ans
};

function hex6tohex3(hex6){
 if(! (typeof hex6==="string"))HALT("?? hex6tohex3 needs hex6");
  if(hex6.charAt(0)=="#")hex6=hex6.slice(1);
  if(hex6.length!=6)HALT("hex6tohex3 argument must be 6 chars");
  return "#"+hex6.charAt(0)+hex6.charAt(2)+hex6.charAt(4)
};

function hex3toNbs(hex3){
   if(!(typeof hex3==="string"))HALT("?? hex3toNbs needs a hex3 string. Found "+typeof hex3);
   if(hex3.length<3||hex3.length>4)HALT("?? hex3toNbs needs hex3 colour. found "+hex3);
   if(hex3.charAt(0)=="#")hex3=hex3.slice(1);
   return hex6toNbs(hex3tohex6(hex3))
}

function Nbtohex2(nb){
  var h1=Math.floor(nb/16),h2=nb%16;
  return scale.charAt(h1)+scale.charAt(h2)
};

function Nbstohex6(rgb){
  return Nbtohex2(rgb[0])+Nbtohex2(rgb[1])+Nbtohex2(rgb[2])
};

function Nbstohex3(rgb){
 // alert("nbstohex3 "+rgb+" : "+[scale.charAt(Math.round(rgb[0]/16)),scale.charAt(Math.round(rgb[1]/16)),scale.charAt(Math.round(rgb[2]/16)).toString()]);
 return scale.charAt(Math.round(rgb[0]/16))+scale.charAt(Math.round(rgb[1]/16))+scale.charAt(Math.round(rgb[2]/16))
};

function rgbdiffs(c3,d3){
  if(c3.length!=3||d3.length!=3)HALT("?? rgbdiffs needs rgb args");
  return Math.abs(d3[0]-c3[0])+Math.abs(d3[1]-c3[1])+Math.abs(d3[2]-c3[2])
};

function findnearestcol(hex6){
  var rgb3=hex6toNbs(hex6);
  var minind,mindiff=1000,d;
   // alert(hex6+" "+rgb3);
  for(var i=0;i<colours.length;i++)
     if((d=rgbdiffs(hexToRGB(colours[i][1]),rgb3))<mindiff)   {mindiff=d;minind=i}
  return [colours[minind],mindiff]
};

function hascolourname(hex6){var ans="";
 if(! (typeof hex6==="string"))HALT("?? hascolourname needs hex6");
  if(hex6.charAt(0)=="#")hex6=hex6.slice(1);
  if(hex6.length!=6)HALT("hascolourname argument must be 6 chars");
   hex6="#"+hex6.toLowerCase();
  //alert("deepskyblue ["+colours[39]+"]");
  for(var i=0;ans==""&&i<colours.length;i++)
     if(colours[i][1]==hex6)   ans= colours[i][0];
 // alert(hex6+" is "+ans +" "+i+"of"+colours.length);
  return ans
}


function findnearestHex3(hex6){
  var rgb=hex6toNbs(rgb),rgb3,hex3;
  var minind,mindiff=1000,d=0;
    //alert(rgbSTR+" "+rgb);
  hex3=Nbstohex3(rgb); rgb3=hex3toNbs(hex3);
  return [hex3,rgbdiffs(rgb,rgb3)]
};

function findnearestwebsafe(hex6){
    var rgb=hex6toNbs(hex6),hex3=new Array();
    for(var i=0;i<3;i++)hex3[i]=scale.charAt(Math.round(rgb[i]/48)*3);
    //alert("findwebsafe for "+hex6+"="+rgb+" = "+hex3);
    hex3=hex3.join("");
    return ["#"+hex3,rgbdiffs(rgb,hex3toNbs(hex3))]
};

function complementaryrgb(rgb){
return [255-rgb[0],255-rgb[1],255-rgb[2]]
};

function getCol(Id,Iddesc){// Id is name of text input with HEx3, Hex6 or namedColor
  //return a hex6string
  var c=document.getElementById(Id).value.replace(/\s/g,""),c3,ci,x;
  if(c=="")HALT("Please give a colour name, #hex or RGB list as colour to find");
  c=c.replace(/\s/g,"");
  //alert("getCol "+c);
  if(c.charAt(0)=="#")
  { // HEX STRING
    c=c.slice(1).toUpperCase();
    for(var i=0;i<c.length;i++)if(scale.indexOf(c.charAt(i).toUpperCase())==-1)HALT("Non-hex character in input colour :"+c.charAt(i));
       if(c.length==3){c3=c;c=c.charAt(0)+c.charAt(0)+c.charAt(1)+c.charAt(1)+c.charAt(2)+c.charAt(2)}
       else{c3=c.charAt(0)+c.charAt(2)+c.charAt(4)}
  }else if(c.toLowerCase().replace(/[a-z]/g,"")=="")
  {  //NAMED COLOUR
         ci=findnamedcol(c);
		 if(ci<0)HALT("Colour to find is not a valid name "+c);
		 c=colours[ci][1].slice(1).toUpperCase(); //alert("col name <- "+c);
  }else if(c.indexOf(",")>-1)
  { //RGB List of 3 0..255 nbs
         c=c.replace(/[()]/g,"").split(",");
         if(c.length!=3)HALT("An RGB colour is 3 numbers");
         for(var i=0; i<3&&c[i].length>0; i++)
          {while(c[i].charAt(0)=="0"&&c[i].length>1)c[i]=c[i].slice(1)};
         try{c3=eval("["+c+"]")} //AAGH! eval interprests 04 as base 8!
         catch(e){HALT("The RGB colour must be 3 numbers")};
         //alert(c+"  "+c3);
         if(!isInt(c3[0])||!isInt(c3[1])||!isInt(c3[2]))HALT("All 3 parts of an RGB colour must be numbers");
         if(c3[0]>255||c3[1]>255||c3[2]>255)HALT("RGB numbers can only be in range 0..255");
         c=Nbstohex6(c3)
  } else HALT("Colour name is not hex, colour name or RGB "+c)

   if(c.charAt(0)=="#")c=c.slice(1);
  //alert("got "+c);
  if((x=c.replace(/[0-9A-F]/g,""))!="")HALT("Unrecognized input for "+Iddesc+" Hex colour: "+x);
  //alert(Id+" INP COL<-"+c);
  return c //6 hex string no #
}

function shadergb(lorgb,hirgb,propn){  // 0<=propn<=1, 0=lo, 1=hi  return Hex6
  var rgb=new Array(3);
  for(var i=0; i<3; i++)
    rgb[i]=Math.round((hirgb[i]-lorgb[i])*propn+lorgb[i]);
  return rgb
};
function shade(lo,hi,propn){
 return Nbstohex6(shadergb(lo,hi,propn))
};

function fadetable(lorgb,hirgb,nbsteps){
  var c,s;
 //alert("fadetable "+lorgb+", "+hirgb+" "+nbsteps);
 var maxdiff=Math.max(Math.abs(lorgb[0]-hirgb[0]),Math.abs(lorgb[1]-hirgb[1]),Math.abs(lorgb[2]-hirgb[2]));
 if(maxdiff<nbsteps){nbsteps=maxdiff;
   with(document.getElementById("nbstps")){value=maxdiff;style.color="red"}};
  s="<table border=0 cellspacing=0 class=coloursTABLE>";
  for(var i=0;i<=nbsteps;i++)
   s+="<tr><td style='background-color:#"+(c=shade(lorgb,hirgb,i/nbsteps))+(i==0?";width:5em":"")+"'>&nbsp;</td><td>"+c+"</td></tr>";
  s+="</table>";
  //alert(s)
  return s //.replace(/</g,"&lt;")
}

function resetFindCol(){
  fillrow("here",["white","white","white","white","white"]);
  fillrow("name",["","","","",""]);
  fillrow("hex",["","","","",""]);
  fillrow("rgb",["","","","",""]);
  fillrow("diff",["","","","",""]);

  document.getElementById("compcol").innerHTML="      ";
 document.getElementById("brightness").innerHTML="      ";
  document.getElementById("compcolhere").style.backgroundColor="white";
};

function fillrow(title,elts){
   //if(title.indexOf("?")>-1)alert([title,elts]);
  return "<tr><th>"+title+"</th><td>"+elts.join("</td><td>")+"</td></tr>"
//    document.getElementById("inp"+suffx).innerHTML=elts[0];
//    document.getElementById("named"+suffx).innerHTML=elts[1];
//    document.getElementById("hex6"+suffx).innerHTML=elts[2];
//    document.getElementById("hex3"+suffx).innerHTML=elts[3];
//    document.getElementById("websafe"+suffx).innerHTML=elts[4];
 };

function fillrowbg(elts){
  var s= "<tr><th>swatch</th><td style='background-color:"+elts.join("'></td><td style='background-color:")+"'></td></tr>";
  //alert("fillrowBG "+s);
  return s

//   document.getElementById("inp"+suffx).style.backgroundColor="#"+elts[0];
//    document.getElementById("named"+suffx).style.backgroundColor=elts[1];
//    document.getElementById("hex6"+suffx).style.backgroundColor="#"+elts[2];
//    document.getElementById("hex3"+suffx).style.backgroundColor="#"+elts[3];
//    document.getElementById("websafe"+suffx).style.backgroundColor="#"+elts[4];
};

function dofindnearest(chex6){var i;
  if(arguments.length==0)chex6=getCol("findcol")
  else document.getElementById("findcol").value=chex6;

  var crgb=hex6toNbs(chex6);
  var chex3=hex6tohex3(chex6);
  var C=findnearestcol(chex6),diff,c3,ws=findnearestwebsafe(chex6);
  //alert(C);
  var RGBs=[crgb,hex6toNbs(C[0][1]),crgb,hex3toNbs(chex3),hex3toNbs(ws[0])];
  function rgbtransf(fn){var ans=new Array(RGBs.length);
    for(var i=0;i<RGBs.length;i++)ans[i]=fn(RGBs[i]);
    return ans
  }
  document.getElementById('tableDIV').innerHTML=
    "<table cellspacing=0 class=coloursTABLE>"
    +"<tr ><th></th><th>Input</th><th  style='width:12em;'>Named</th>"
	+" <th>#hex6</th><th > #hex3</th><th>  Websafe</th></tr>"
    +fillrowbg([chex6,C[0][0],chex6,chex3,ws[0]])
    +fillrow("name",[hascolourname(chex6),C[0][0],hascolourname(chex6),hascolourname(hex3tohex6(chex3)),
          hascolourname(hex3tohex6(ws[0]))])
    +fillrow("hex",[chex6,C[0][1],chex6,chex3,ws[0]])
    +fillrow("rgb",RGBs)
    +fillrow("diff",[0,C[1],0,rgbdiffs(crgb,hex3toNbs(chex3)),rgbdiffs(crgb,hex3toNbs(ws[0]))])
    +fillrow("hue",rgbtransf(function(x){return rgbtoHueSat(x)[0]+"("+(rgbtoHueSat(x)[0]/360).toFixed(2)+")"}))
    +fillrow("sat",rgbtransf(function(x){return rgbtoHueSat(x)[1]}))
    +fillrow("B",  rgbtransf(function(x){return Math.round(brightness(x)*100).toFixed(1)}))
    +fillrow("H<br>S<br>L?",rgbtransf(function(x){var s="",a= rgbToHsl(x);
      //alert("rgbT "+x+" "+rgbToHsl(x));
      for(var i=0;i<3;i++)s+=a[i].toFixed(2)+(i<2?"<br>":"");return s}))
    +"</table>";

  document.getElementById("compcol").innerHTML="#"+Nbstohex6(complementaryrgb(crgb));
  document.getElementById("compcolhere").style.backgroundColor="#"+Nbstohex6(complementaryrgb(crgb));
  //document.getElementById("brightness").innerHTML=Math.round(brightness(chex6)*100)+"%";
}


function dofadetable(loId,hiId,nbstepsId){ // input is hex3 or hex6
  var loc,hic,
     lorgb=hex6toNbs(loc=getCol(loId,"top colour")),
     hirgb=hex6toNbs(hic=getCol(hiId,"bottom colour")),
     nbsteps=getInput(nbstepsId,"nb of steps","+N");
  //alert("lo="+lorgb+" "+loc+" hi="+hirgb+" "+hic+" nbsteps="+nbsteps);
  document.getElementById("fadetableDIV").innerHTML=fadetable(lorgb,hirgb,nbsteps-1);
};

function isgreyRGB(rgb){  return rgb[0]==rgb[1]&&rgb[1]==rgb[2] };

function doshadestable(loId){ // input is hex3 or hex6
  var nbsteps=50;
  var rgb=hex6toNbs(getCol(loId,"shade colour"));
  //alert("lo="+lorgb+" "+loc+" hi="+hirgb+" "+hic+" nbsteps="+nbsteps);
  var hue=rgbtoHueSat(rgb)[0],lightness=brightness(rgb);
  var lnessi,maxsat; //=huefullsat(hue)
  var sat=rgbtoHueSat(rgb)[1],isgrey=isgreyRGB(rgb);
  maxsat= isgrey?[0,0,0]: hslToRgb(hue/360,sat,0.5),fullsat=isgrey?[0,0,0]: hslToRgb(hue/360,1,0.5);
  var maxsatbrightness=brightness(maxsat);
  if(lightness>maxsatbrightness)lnessi=nbsteps/2+Math.round((lightness-maxsatbrightness)/(1-maxsatbrightness)*nbsteps/2)
  else lnessi=Math.round(lightness/maxsatbrightness*nbsteps/2);
 // alert([Math.floor(nbsteps*sat),Math.floor(nbsteps*(1-sat))]);
  var col,s="<table cellspacing=0 class=coloursTABLE><tr>"
    +"<td colspan="+nbsteps+" style='background-color:rgb("+rgb.join(",")+");color:"+(brightness(rgb)<0.5?"white":"black")+"'>#"+rgbToHex(rgb)+" "+
    rgb+" brightness="+(lightness*100).toFixed(1)+"%"+"</td></tr><tr>",
    t="<tr>";
  var bcol=(brightness(rgb)<0.5?"white":"black");
  for(var i=0;i<=nbsteps;i++)
    {col=(2*i<nbsteps?shadergb([0,0,0],maxsat,2*i/nbsteps): shadergb(maxsat,[255,255,255],(2*i-nbsteps)/nbsteps));
      s+="<td title='rgb("+col+")' style='background-color:rgb("+col+")"+
        (lnessi==i?";border-left:1px solid "+bcol+";border-right:1px solid "+bcol:"")
      +";width:3px;height:100%' title='"+col  +"'>&nbsp;</td>";
    };
  s+="</tr><tr><td colspan="+nbsteps+" style='text-align:center;background-color:rgb("+
     fullsat.join(",")+")'>max sat RGB:#"+rgbToHex(fullsat)+" HSL:"+[(hue/360).toFixed(3)+"="+hue+"&deg;",1,0.5]+"</td></tr>";

  document.getElementById("shadetableDIV").innerHTML=s+"</table>"


// var steps1=Math.round(nbsteps*lightness);if(steps1<=1){steps1=2};
// var steps2=nbsteps-steps1;if(steps2<2)steps2=2;
//  document.getElementById("shadetableDIV").innerHTML=
//    "<table><tr><td>"+fadetable([255,255,255],rgb,steps2)+"</td><td>"+fadetable([0,0,0],rgb,steps1)+"</td></tr></table>";
};

function brightnessSort(c1,c2){ return brightness(c1[1])-brightness(c2[1])
  //return (c1[3]<c2[3]?-1:c1[3]==c2[3]?0:1)
};
function hex6sort(c1,c2){
  return (c1[1]<c2[1]?-1:c1[1]==c2[1]?0:1)
};
function maxrgbsort(c1,c2){
  var m1=hexToRGB(c1[1]).sort() , m2=hexToRGB(c2[1]).sort();
  return (m1[0]<m2[0]?-1
         :m1[0]>m2[0]?1
         :m1[1]<m2[1]?-1
         :m1[1]>m2[1]?1
         :m1[2]<m2[2]?-1
         :m1[2]>m2[2]?1
         :0)
};
function rgbsum(c1,c2){
  var s1=eval(hexToRGB(c1[1]).join("+")),s2=eval(hexToRGB(c2[1]).join("+"));
  return s1-s2
}

function putcolourstable(colours){var h;
  //alert('putcoltab '+colours.slice(0,3));
  var s="<table border=1 class=coloursTABLE><tr><td>name</td><td>hex6</td><td>bness%</td><td>hue&deg;</td><td>Sat</td><td>L</td><td >swatch</td><td>max<br>sat</td></tr>";
  for(var i=0;i<colours.length;i++)
    if(colours[i])
      s+="<tr><td>"+colours[i].join("</td><td>")+
        "</td><td style='background-color:"+colours[i][1]+"'></td>"+
        "<td style='background-color:#"+(h=Nbstohex6(huetoRGB(colours[i][3]))) +"' title='"+
        h+"'></td>"+
        "</tr>"
    else HALT('no colour at '+i);
  return s+"</table>"
};

function colhue(c){  return rgbtoHueSat(c[2])[0] };

function huetoRGB(h){ //h is an angle in degrees, returns  rgb as [r,g,b] each 0..255 with max sat (max value)
 var x=h/60;x-=Math.floor(x);x=Math.round(x*255);
 return (h<60?[255,x,0]
        :h<120?[255-x,255,0]
        :h<180?[0,255,x]
        :h<240?[0,255-x,255]
        :h<300?[x,0,255]
        :[255,0,255-x])
};

function huesort(c1,c2){var hs1=rgbtoHueSat(hexToRGB(c1[1])),hs2=rgbtoHueSat(hexToRGB(c2[1]));
  return (hs1[0]<hs2[0]?-1
        :hs1[0]>hs2[0]?1
        :hs1[1]<hs2[1]?-1
        :hs1[1]>hs2[1]?1
        :0)
};

function satsort(c1,c2){var hs1=rgbtoHueSat(hexToRGB(c1[1])),hs2=rgbtoHueSat(hexToRGB(c2[1]));
  return (hs1[1]<hs2[1]?-1
        :hs1[1]>hs2[1]?1
        :hs1[0]<hs2[0]?-1
        :hs1[0]>hs2[0]?1
        :0)
};

function deforder(){var cols=new Array();
  for(var i=0;i<defaultcoloursorder.length;i++)
    cols.push(colours[findnamedcol(defaultcoloursorder[i])]);
  return cols
};

function alphasort(c1,c2){  return c1[0]>c2[0] }
function defordersort(c1,c2){return findnamedcol(c1[0],defaultcoloursorder)>findnamedcol(c2[0],defaultcoloursorder)};

//var ldbg=true;
function Lsort(c1,c2){
  //if(ldbg)alert("Lsort "+c1+" | "+hexToRGB(c1[1])+" | "+rgbToHsl(hexToRGB(c1[1]))); //ldbg=false;
  return rgbToHsl(hexToRGB(c1[1])) [2] < rgbToHsl(hexToRGB(c2[1])) [2]}

function doshowtable(fn,btn){
  for(i=1;i<=9;i++)if(!document.getElementById("sBTN"+i))HALT("BTN "+i+" ??")
       else document.getElementById("sBTN"+i).style.backgroundColor=(i==btn?'red':'lemonchiffon');
  document.getElementById('colourslist').innerHTML=putcolourstable(showtable(colours.slice().sort(fn)))
};

function showtable(cols){
if(arguments.length<1)cols=colours.slice()
if(colours[0].length<4)
   for(var i=0; i<colours.length; i++)
     colours[i].push(eval( brightness(colours[i][1])*100     ).toFixed(1));
if(colours[0].length<5)
   for(var i=0; i<colours.length; i++)
    {var hs=rgbtoHueSat(hexToRGB(colours[i][1]))
      colours[i].push(hs[0]);
      colours[i].push(hs[1]);
      colours[i].push(rgbToHsl(hexToRGB(colours[i][1]))[2].toFixed(3))};
 //alert(colours[2]);
// alert(colours[3]);

return cols
}

function showcolourSEL(opts){
  if(arguments.length==0)opts="";
  var s="<select "+opts+">";
  for(var i=0;i<colours.length;i++)
     s+="<option>"+colours[i][0]+"</option>";
  return s+"</select>"
};

function testdef(){
 alert(colours.length+" colours, "+defaultcoloursorder.length+" defcols");
  for(var i=0;i<defaultcoloursorder.length;i++)
    {
     if(findnamedcol(defaultcoloursorder[i][0])==-1)
      HALT("default "+defaultcoloursorder[i][0]+" is missing from colours")};
  for(var i=0;i<colours.length;i++)
    if(findnamedcol(colours[i][0],defaultcoloursorder)==-1)
      HALT("colour "+colours[i][0]+" is not in default list")
  alert("colours and def match")
  alert("Red is at "+findnamedcol("red",defaultcoloursorder)+" in def: should be 2");
   alert("White is at "+findnamedcol("white",defaultcoloursorder)+" in def: should be 1");
  ERROR();
};

function init(){dofindnearest()}

function setswatch(n){
  var chex6=document.getElementById("swatch"+n+"in").value.replace(/\s/g,"");
  if(chex6!="")chex6=getCol("swatch"+n+"in");
  document.getElementById("swatch"+n).style.backgroundColor=(chex6==""?"":"#"+chex6)
  document.getElementById("swatchR"+n).innerHTML=(chex6==""?"":hex6toNbs(chex6)[0])
  document.getElementById("swatchG"+n).innerHTML=(chex6==""?"":hex6toNbs(chex6)[1])
  document.getElementById("swatchB"+n).innerHTML=(chex6==""?"":hex6toNbs(chex6)[2])
};

function colsnear(){
  var inc=getInput("nearcolinc","colour-near increment","N+");
  if(inc>255)HALT("Inc must be in range 0-255");
  var c=getCol("nearcol","colour-near");
  var rgb=hex6toNbs(c);
  document.getElementById('nearcolC').style.backgroundColor=c;
   document.getElementById('nearcolC').innerHTML=c;
  for(var i=0;i<8;i++)
  {var rn=[inc,-inc,0,0,0,0,inc,-inc][i]+rgb[0],gn=[0,0,inc,-inc,0,0,inc,-inc][i]+rgb[1],bn=[0,0,0,0,inc,-inc,inc,-inc][i]+rgb[2];
   if(rn>255)rn=255;if(gn>255)gn=255;if(bn>255)bn=255;
   document.getElementById('nearcol'+i).style.backgroundColor="#"+Nbstohex6([rn,gn,bn]);
   document.getElementById('nearcolc'+i).innerHTML="#"+Nbstohex6([rn,gn,bn])
  }
};
  
