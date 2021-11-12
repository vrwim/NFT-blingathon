'use strict'

let voltaContract
let contractAddress = "0x34090Cc1df6D79aA28a7b1a50fe365b55aE4Ce45";
let hashes = [];
let ipfsAddress = 'https://gateway.pinata.cloud/ipfs/QmTChVvgzubRiwFA5W75Z3crzmnBJGHgNp8txfZazyrKKS/'

window.addEventListener('load', (event) => {

    loadWeb3();
    addVoltaNetwork();
    
    sendClaim();
   

   
console.log('The page has fully loaded ^ㅂ^')
});

async function retrieveTransferEvents(){

    //console.log(await voltaContract.getPastEvents('TransferSingle', { fromBlock: 0, toBlock: 'latest' }))

 
    try {
          let succesArr = await voltaContract.getPastEvents('TransferSingle', { fromBlock: 0, toBlock: 'latest' });
         // console.log(succesArr);
          fetchPersonalNFT(succesArr);
          //return succesArr;
    } catch(error){
        console.log(error.message);}}
//voltaContract = abi.at(contractAddress);           
async function loadContract(){
    let abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Paused",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "TransferBatch",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "TransferSingle",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "value",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "URI",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Unpaused",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "hashes",
                    "type": "bytes32[]"
                }
            ],
            "name": "addClaimableCodeHashes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "codes",
                    "type": "string[]"
                }
            ],
            "name": "addClaimableCodes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "accounts",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                }
            ],
            "name": "balanceOfBatch",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "burnBatch",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "contractURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "code",
                    "type": "string[]"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeBatchTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "uri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "vouchers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "claimed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
  

//  voltaContract = abi.at(contractAddress);
voltaContract = new web3.eth.Contract(abi, "0x34090Cc1df6D79aA28a7b1a50fe365b55aE4Ce45");
console.log(voltaContract.methods);
  retrieveTransferEvents();
}

function display (arr){

    for(let i = 0; i < arr.length ; i++){
         console.log(arr[i].returnValues.id) ;
    }
  

}
async function loadWeb3() {
    if (ethereum) {
      web3 = new Web3(ethereum);
      await ethereum.enable();
    } else {
      alert("MetaMask not found!");
      return;
    }

    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log(`Your account is ${web3.eth.defaultAccount}`);
    document.getElementById("metamask-acc").innerHTML +=` ${web3.eth.defaultAccount}`;
    
    loadContract();
   
  }

function sendClaim(){
    document.getElementById("claimForm").addEventListener('submit',function(e){
        e.preventDefault();
        let claim = document.getElementById("nft-claim").value;
        console.log(claim);
     
        clientMint(claim);
        document.getElementById("nft-claim").value = "NOice ( ͡° ͜ʖ ͡°) ";
    });

  }


  function generateSlug(){

    const wordList = [
        // Borrowed from xkcd password generator which borrowed it from wherever
        // length = 1952
        "ability","able","aboard","about","above","accept","accident","according",
        "account","accurate","acres","across","act","action","active","activity",
        "actual","actually","add","addition","additional","adjective","adult","adventure",
        "advice","affect","afraid","after","afternoon","again","against","age",
        "ago","agree","ahead","aid","air","airplane","alike","alive",
        "all","allow","almost","alone","along","aloud","alphabet","already",
        "also","although","am","among","amount","ancient","angle","angry",
        "animal","announced","another","answer","ants","any","anybody","anyone",
        "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
        "appropriate","are","area","arm","army","around","arrange","arrangement",
        "arrive","arrow","art","article","as","aside","ask","asleep",
        "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
        "attention","audience","author","automobile","available","average","avoid","aware",
        "away","baby","back","bad","badly","bag","balance","ball",
        "balloon","band","bank","bar","bare","bark","barn","base",
        "baseball","basic","basis","basket","bat","battle","be","bean",
        "bear","beat","beautiful","beauty","became","because","become","becoming",
        "bee","been","before","began","beginning","begun","behavior","behind",
        "being","believed","bell","belong","below","belt","bend","beneath",
        "bent","beside","best","bet","better","between","beyond","bicycle",
        "bigger","biggest","bill","birds","birth","birthday","bit","bite",
        "black","blank","blanket","blew","blind","block","blood","blow",
        "blue","board","boat","body","bone","book","border","born",
        "both","bottle","bottom","bound","bow","bowl","box","boy",
        "brain","branch","brass","brave","bread","break","breakfast","breath",
        "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
        "broad","broke","broken","brother","brought","brown","brush","buffalo",
        "build","building","built","buried","burn","burst","bus","bush",
        "business","busy","but","butter","buy","by","cabin","cage",
        "cake","call","calm","came","camera","camp","can","canal",
        "cannot","cap","capital","captain","captured","car","carbon","card",
        "care","careful","carefully","carried","carry","case","cast","castle",
        "cat","catch","cattle","caught","cause","cave","cell","cent",
        "center","central","century","certain","certainly","chain","chair","chamber",
        "chance","change","changing","chapter","character","characteristic","charge","chart",
        "check","cheese","chemical","chest","chicken","chief","child","children",
        "choice","choose","chose","chosen","church","circle","circus","citizen",
        "city","class","classroom","claws","clay","clean","clear","clearly",
        "climate","climb","clock","close","closely","closer","cloth","clothes",
        "clothing","cloud","club","coach","coal","coast","coat","coffee",
        "cold","collect","college","colony","color","column","combination","combine",
        "come","comfortable","coming","command","common","community","company","compare",
        "compass","complete","completely","complex","composed","composition","compound","concerned",
        "condition","congress","connected","consider","consist","consonant","constantly","construction",
        "contain","continent","continued","contrast","control","conversation","cook","cookies",
        "cool","copper","copy","corn","corner","correct","correctly","cost",
        "cotton","could","count","country","couple","courage","course","court",
        "cover","cow","cowboy","crack","cream","create","creature","crew",
        "crop","cross","crowd","cry","cup","curious","current","curve",
        "customs","cut","cutting","daily","damage","dance","danger","dangerous",
        "dark","darkness","date","daughter","dawn","day","dead","deal",
        "dear","death","decide","declared","deep","deeply","deer","definition",
        "degree","depend","depth","describe","desert","design","desk","detail",
        "determine","develop","development","diagram","diameter","did","die","differ",
        "difference","different","difficult","difficulty","dig","dinner","direct","direction",
        "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
        "disease","dish","distance","distant","divide","division","do","doctor",
        "does","dog","doing","doll","dollar","done","donkey","door",
        "dot","double","doubt","down","dozen","draw","drawn","dream",
        "dress","drew","dried","drink","drive","driven","driver","driving",
        "drop","dropped","drove","dry","duck","due","dug","dull",
        "during","dust","duty","each","eager","ear","earlier","early",
        "earn","earth","easier","easily","east","easy","eat","eaten",
        "edge","education","effect","effort","egg","eight","either","electric",
        "electricity","element","elephant","eleven","else","empty","end","enemy",
        "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
        "environment","equal","equally","equator","equipment","escape","especially","essential",
        "establish","even","evening","event","eventually","ever","every","everybody",
        "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
        "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
        "exist","expect","experience","experiment","explain","explanation","explore","express",
        "expression","extra","eye","face","facing","fact","factor","factory",
        "failed","fair","fairly","fall","fallen","familiar","family","famous",
        "far","farm","farmer","farther","fast","fastened","faster","fat",
        "father","favorite","fear","feathers","feature","fed","feed","feel",
        "feet","fell","fellow","felt","fence","few","fewer","field",
        "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
        "film","final","finally","find","fine","finest","finger","finish",
        "fire","fireplace","firm","first","fish","five","fix","flag",
        "flame","flat","flew","flies","flight","floating","floor","flow",
        "flower","fly","fog","folks","follow","food","foot","football",
        "for","force","foreign","forest","forget","forgot","forgotten","form",
        "former","fort","forth","forty","forward","fought","found","four",
        "fourth","fox","frame","free","freedom","frequently","fresh","friend",
        "friendly","frighten","frog","from","front","frozen","fruit","fuel",
        "full","fully","fun","function","funny","fur","furniture","further",
        "future","gain","game","garage","garden","gas","gasoline","gate",
        "gather","gave","general","generally","gentle","gently","get","getting",
        "giant","gift","girl","give","given","giving","glad","glass",
        "globe","go","goes","gold","golden","gone","good","goose",
        "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
        "graph","grass","gravity","gray","great","greater","greatest","greatly",
        "green","grew","ground","group","grow","grown","growth","guard",
        "guess","guide","gulf","gun","habit","had","hair","half",
        "halfway","hall","hand","handle","handsome","hang","happen","happened",
        "happily","happy","harbor","hard","harder","hardly","has","hat",
        "have","having","hay","he","headed","heading","health","heard",
        "hearing","heart","heat","heavy","height","held","hello","help",
        "helpful","her","herd","here","herself","hidden","hide","high",
        "higher","highest","highway","hill","him","himself","his","history",
        "hit","hold","hole","hollow","home","honor","hope","horn",
        "horse","hospital","hot","hour","house","how","however","huge",
        "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
        "hurt","husband","ice","idea","identity","if","ill","image",
        "imagine","immediately","importance","important","impossible","improve","in","inch",
        "include","including","income","increase","indeed","independent","indicate","individual",
        "industrial","industry","influence","information","inside","instance","instant","instead",
        "instrument","interest","interior","into","introduced","invented","involved","iron",
        "is","island","it","its","itself","jack","jar","jet",
        "job","join","joined","journey","joy","judge","jump","jungle",
        "just","keep","kept","key","kids","kill","kind","kitchen",
        "knew","knife","know","knowledge","known","label","labor","lack",
        "lady","laid","lake","lamp","land","language","large","larger",
        "largest","last","late","later","laugh","law","lay","layers",
        "lead","leader","leaf","learn","least","leather","leave","leaving",
        "led","left","leg","length","lesson","let","letter","level",
        "library","lie","life","lift","light","like","likely","limited",
        "line","lion","lips","liquid","list","listen","little","live",
        "living","load","local","locate","location","log","lonely","long",
        "longer","look","loose","lose","loss","lost","lot","loud",
        "love","lovely","low","lower","luck","lucky","lunch","lungs",
        "lying","machine","machinery","mad","made","magic","magnet","mail",
        "main","mainly","major","make","making","man","managed","manner",
        "manufacturing","many","map","mark","market","married","mass","massage",
        "master","material","mathematics","matter","may","maybe","me","meal",
        "mean","means","meant","measure","meat","medicine","meet","melted",
        "member","memory","men","mental","merely","met","metal","method",
        "mice","middle","might","mighty","mile","military","milk","mill",
        "mind","mine","minerals","minute","mirror","missing","mission","mistake",
        "mix","mixture","model","modern","molecular","moment","money","monkey",
        "month","mood","moon","more","morning","most","mostly","mother",
        "motion","motor","mountain","mouse","mouth","move","movement","movie",
        "moving","mud","muscle","music","musical","must","my","myself",
        "mysterious","nails","name","nation","national","native","natural","naturally",
        "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
        "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
        "never","new","news","newspaper","next","nice","night","nine",
        "no","nobody","nodded","noise","none","noon","nor","north",
        "nose","not","note","noted","nothing","notice","noun","now",
        "number","numeral","nuts","object","observe","obtain","occasionally","occur",
        "ocean","of","off","offer","office","officer","official","oil",
        "old","older","oldest","on","once","one","only","onto",
        "open","operation","opinion","opportunity","opposite","or","orange","orbit",
        "order","ordinary","organization","organized","origin","original","other","ought",
        "our","ourselves","out","outer","outline","outside","over","own",
        "owner","oxygen","pack","package","page","paid","pain","paint",
        "pair","palace","pale","pan","paper","paragraph","parallel","parent",
        "park","part","particles","particular","particularly","partly","parts","party",
        "pass","passage","past","path","pattern","pay","peace","pen",
        "pencil","people","per","percent","perfect","perfectly","perhaps","period",
        "person","personal","pet","phrase","physical","piano","pick","picture",
        "pictured","pie","piece","pig","pile","pilot","pine","pink",
        "pipe","pitch","place","plain","plan","plane","planet","planned",
        "planning","plant","plastic","plate","plates","play","pleasant","please",
        "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
        "point","pole","police","policeman","political","pond","pony","pool",
        "poor","popular","population","porch","port","position","positive","possible",
        "possibly","post","pot","potatoes","pound","pour","powder","power",
        "powerful","practical","practice","prepare","present","president","press","pressure",
        "pretty","prevent","previous","price","pride","primitive","principal","principle",
        "printed","private","prize","probably","problem","process","produce","product",
        "production","program","progress","promised","proper","properly","property","protection",
        "proud","prove","provide","public","pull","pupil","pure","purple",
        "purpose","push","put","putting","quarter","queen","question","quick",
        "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
        "rain","raise","ran","ranch","range","rapidly","rate","rather",
        "raw","rays","reach","read","reader","ready","real","realize",
        "rear","reason","recall","receive","recent","recently","recognize","record",
        "red","refer","refused","region","regular","related","relationship","religious",
        "remain","remarkable","remember","remove","repeat","replace","replied","report",
        "represent","require","research","respect","rest","result","return","review",
        "rhyme","rhythm","rice","rich","ride","riding","right","ring",
        "rise","rising","river","road","roar","rock","rocket","rocky",
        "rod","roll","roof","room","root","rope","rose","rough",
        "round","route","row","rubbed","rubber","rule","ruler","run",
        "running","rush","sad","saddle","safe","safety","said","sail",
        "sale","salmon","salt","same","sand","sang","sat","satellites",
        "satisfied","save","saved","saw","say","scale","scared","scene",
        "school","science","scientific","scientist","score","screen","sea","search",
        "season","seat","second","secret","section","see","seed","seeing",
        "seems","seen","seldom","select","selection","sell","send","sense",
        "sent","sentence","separate","series","serious","serve","service","sets",
        "setting","settle","settlers","seven","several","shade","shadow","shake",
        "shaking","shall","shallow","shape","share","sharp","she","sheep",
        "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
        "shoe","shoot","shop","shore","short","shorter","shot","should",
        "shoulder","shout","show","shown","shut","sick","sides","sight",
        "sign","signal","silence","silent","silk","silly","silver","similar",
        "simple","simplest","simply","since","sing","single","sink","sister",
        "sit","sitting","situation","six","size","skill","skin","sky",
        "slabs","slave","sleep","slept","slide","slight","slightly","slip",
        "slipped","slope","slow","slowly","small","smaller","smallest","smell",
        "smile","smoke","smooth","snake","snow","so","soap","social",
        "society","soft","softly","soil","solar","sold","soldier","solid",
        "solution","solve","some","somebody","somehow","someone","something","sometime",
        "somewhere","son","song","soon","sort","sound","source","south",
        "southern","space","speak","special","species","specific","speech","speed",
        "spell","spend","spent","spider","spin","spirit","spite","split",
        "spoken","sport","spread","spring","square","stage","stairs","stand",
        "standard","star","stared","start","state","statement","station","stay",
        "steady","steam","steel","steep","stems","step","stepped","stick",
        "stiff","still","stock","stomach","stone","stood","stop","stopped",
        "store","storm","story","stove","straight","strange","stranger","straw",
        "stream","street","strength","stretch","strike","string","strip","strong",
        "stronger","struck","structure","struggle","stuck","student","studied","studying",
        "subject","substance","success","successful","such","sudden","suddenly","sugar",
        "suggest","suit","sum","summer","sun","sunlight","supper","supply",
        "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
        "swept","swim","swimming","swing","swung","syllable","symbol","system",
        "table","tail","take","taken","tales","talk","tall","tank",
        "tape","task","taste","taught","tax","tea","teach","teacher",
        "team","tears","teeth","telephone","television","tell","temperature","ten",
        "tent","term","terrible","test","than","thank","that","thee",
        "them","themselves","then","theory","there","therefore","these","they",
        "thick","thin","thing","think","third","thirty","this","those",
        "thou","though","thought","thousand","thread","three","threw","throat",
        "through","throughout","throw","thrown","thumb","thus","thy","tide",
        "tie","tight","tightly","till","time","tin","tiny","tip",
        "tired","title","to","tobacco","today","together","told","tomorrow",
        "tone","tongue","tonight","too","took","tool","top","topic",
        "torn","total","touch","toward","tower","town","toy","trace",
        "track","trade","traffic","trail","train","transportation","trap","travel",
        "treated","tree","triangle","tribe","trick","tried","trip","troops",
        "tropical","trouble","truck","trunk","truth","try","tube","tune",
        "turn","twelve","twenty","twice","two","type","typical","uncle",
        "under","underline","understanding","unhappy","union","unit","universe","unknown",
        "unless","until","unusual","up","upon","upper","upward","us",
        "use","useful","using","usual","usually","valley","valuable","value",
        "vapor","variety","various","vast","vegetable","verb","vertical","very",
        "vessels","victory","view","village","visit","visitor","voice","volume",
        "vote","vowel","voyage","wagon","wait","walk","wall","want",
        "war","warm","warn","was","wash","waste","watch","water",
        "wave","way","we","weak","wealth","wear","weather","week",
        "weigh","weight","welcome","well","went","were","west","western",
        "wet","whale","what","whatever","wheat","wheel","when","whenever",
        "where","wherever","whether","which","while","whispered","whistle","white",
        "who","whole","whom","whose","why","wide","widely","wife",
        "wild","will","willing","win","wind","window","wing","winter",
        "wire","wise","wish","with","within","without","wolf","women",
        "won","wonder","wonderful","wood","wooden","wool","word","wore",
        "work","worker","world","worried","worry","worse","worth","would",
        "wrapped","write","writer","writing","written","wrong","wrote","yard",
        "year","yellow","yes","yesterday","yet","you","young","younger",
        "your","yourself","youth","zero","zebra","zipper","zoo","zulu"
      ];

    let maxWordCount=10;
    const strArray = [];

    for(let j=0; j < maxWordCount;j++){
    let str = wordList[Math.floor(Math.random()*wordList.length)];
    strArray.push(str);
    }
    let passphrase = strArray.join('-');

    console.log(passphrase);

    return passphrase;
    
  }

  function generateHash(userWord){
    
    let hash = Web3.utils.keccak256(userWord); // string input

    console.log(hash);
  
  } 

  function generateHashAndStore(userWord){
    
    let hash = Web3.utils.keccak256(userWord); // string input
    console.log(hash);
    hashes.push(hash);
    

    //console.log(hashes);
  } 



  function equals(arr, hash){
   return arr.includes(hash);
  }

  function checkClaim(x){
      
    console.log( hashes.includes(web3.utils.keccak256(x)));
  }

  function doTest(){

        let testSlug = generateSlug();

        generateHashAndStore(testSlug);

        console.log(hashes);

        let hash = generateHash(testSlug);

        console.log(equals(hashes,hash));


        checkClaim(testSlug)


  } 

  function adminSlugGenerator(number){


    let slugArr = [];

    for(let i=0; i < number;i++){

    
        slugArr.push( generateSlug());
        
        }

        console.log(slugArr);

  }


  
  function clientMint(code) {


    voltaContract.methods.mint([code])
    .send({from: web3.eth.defaultAccount})
    .then(succes => console.log(succes))
    .catch(e => console.log(e));

  }


  function addString(code) { 
      voltaContract.methods.addClaimableCodes([code])
      .send({from: web3.eth.defaultAccount})
    .then(succes => console.log(succes))
    .catch(e => console.log(e)); }

//input format keccak 'apple' - 0x754a10e976ef61e474335eb6f2aba944473686d179ad7d337172f6efa923c0dd

    function pushToChain(hash){
        //console.log(hash);
      //  let payloadHash = web3.utils.asciiToHex(hash);
        //let payloadPad =  web3.utils.padLeft(payloadHash,64)

    //  let tempHash = hash.toString();

      //  console.log(typeof tempHash);

      let payloadHash = web3.utils.toHex(hash);
      console.log(payloadHash);
      console.log(typeof payloadHash);

      //let payloadHashBytes32 =  web3.utils.asciiToHex(payloadHash);

     // console.log(payloadHashBytes32);
      //console.log(typeof payloadHashBytes32);

      
     // let payloadPad =  web3.utils.padLeft(payloadHash,64)


       

     //   console.log(payloadPad);
        
      
        voltaContract.methods.addClaimableCodeHashes([payloadHash])
        .send({from: web3.eth.defaultAccount})
        .then(succes => console.log(succes))
        .catch(e => console.log(e));
      
      
      }


      async function addEnergyWebNetwork(){
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xf6' }], 
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ 
                            chainId: '0xf6', 
                            chainName: "EWC",
                            nativeCurrency: {
                                name: "EWT",
                                symbol: "EWT",
                                decimals: 18,
                            },
                            rpcUrls: ["https://rpc.energyweb.org"],
                            blockExplorerUrls: ["https://explorer.energyweb.org/"],
                            iconUrls: [""],
                    
                        }],
                    });
                } catch (addError){
                    console.log('Did not add network');
                }
            }
        }
    }

    async function addVoltaNetwork(){
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x12047' }], // 73799
                
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ 
                            chainId: '0x12047', 
                            chainName: "VOLTA",
                            nativeCurrency: {
                                name: "VT",
                                symbol: "VT",
                                decimals: 18,
                            },
                            rpcUrls: ["https://volta-rpc.energyweb.org"],
                            blockExplorerUrls: ["https://volta-explorer.energyweb.org/"],
                            iconUrls: [""],
                    
                        }],
                    });
                } catch (addError){
                    console.log('Did not add network');
                }
            }
        }
    }

    
  function generateHash(userWord){
    
    let hash = Web3.utils.keccak256(userWord); // string input

    return hash;
  
  } 

  function generateHashAndStore(userWord){
    
    let hash = Web3.utils.keccak256(userWord); // string input
    console.log(hash);
    hashes.push(hash);
    

    //console.log(hashes);
  } 



  function equals(arr, hash){
   return arr.includes(hash);
  }

  function checkClaim(x){
      
    console.log( hashes.includes(web3.utils.keccak256(x)));
  }


  function adminSlugGenerator(number){
    let slugArr = [];

    for(let i=0; i < number;i++){

        slugArr.push( generateSlug());
        
        

        return slugArr;

  }


 




  function output(array){
    for(let i = 0; array.length;i++){
      document.getElementById("output").innerHTML += `<p>`+  array[i]  +  `</p> <br>`;
     }
  }
  


   
}

function output(array){
  for(let i = 0; array.length;i++){
    document.getElementById("output").innerHTML += `<p>`+  array[i]  +  `</p> <br>`;
   }
}

function generateQuantity(){

  document.getElementById("quantityForm").addEventListener('submit',function(e){
  e.preventDefault();
  let quantity =  document.getElementById("quantity").value;

  console.log(quantity);



  let slugArr = [];
  let slugPass = [];

  for(let i = 0; i < quantity ; i++){

    tempSlug = generateSlug();
    slugArr.push(tempSlug);
    slugPass.push(generateHash(tempSlug));
  }

  console.log(slugArr); 
  console.log(slugPass);

  output(slugPass);
}) 


}

function pushToChain(hash){

  let payload = byte32(web3.utils.asciiToHex(hash));

  

  voltaContract.methods.addClaimableCodeHashes([payload])
  .send({from: web3.eth.defaultAccount})
  .then(succes => console.log(succes))
  .catch(e => console.log(e));


}

//collection 

function leftFillNum(num) {
    let format = ".json";
    let paddedNum = num.toString().padStart(64, 0);
    let metadataJSON  = paddedNum.concat(format);
    console.log(metadataJSON);
    return metadataJSON;

}

function fetchPersonalNFT(arr){

    arr.forEach(entries => {
        if(entries.returnValues.to == web3.eth.defaultAccount){
                let temp = (entries.returnValues.id);
               // console.log(temp);
               // leftFillNum(temp);
                let data =  fetch(ipfsAddress + leftFillNum(temp))
                .then(response => response.json())
                .then(error => console.log(error));
                console.log(data.url);
        }
        
 
     //return entries.returnValues.id;
        
        
    });


}




