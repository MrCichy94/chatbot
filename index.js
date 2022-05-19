document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  setTimeout(() => {
    helloBot();
    textToSpeech("Siema mordeczko!")
  }, 1000);
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(consore(consored, (input.toLowerCase()).split(' ')));
    }
  });
});

function output(input) {
  if (document.getElementById("input").value != "") document.getElementById("input").value = "";
  let output = [];
  let wordsArray = (input.toLowerCase()).split(' ');
  compareAndFilter(prompts, replies, wordsArray, output);
  if (output.length === 0) output.push(alternative[0]);
  for (let pos = 0; pos < output.length; pos++) addChat(input, output[pos]);
}

function consore(censored, wordsArray) {
  let warningString = "proszę, nie używaj takich słów!"
  console.log(wordsArray[0]);
  let retString = "";
  for (let wordIndex = 0; wordIndex < wordsArray.length; wordIndex++) {
    if (wordsArray[wordIndex].toString() === censored[0].toString()) {
      retString += warningString.fontcolor( "red" );
      alert(warningString);
    } else {
      retString += wordsArray[wordIndex].toString();
      retString += ' ';
    }
  }
  return retString;
}

function compareAndFilter(promptsArray, repliesArray, wordsArray, retArray) {
  let replyIndex = 0;
  for(let wordIndex = 0; wordIndex < wordsArray.length; wordIndex++) {
    if (wordsArray[0] === OAM[0].toString()) return retArray.push(OAM_ENUMS[0]);
    if (wordsArray[0] === OAM[1].toString()) return retArray.push(OAM_ENUMS[1]);
    for (let promptIndex = 0; promptIndex < promptsArray.length; promptIndex++) {
      for (let ansIndex = 0; ansIndex < promptsArray[promptIndex].length; ansIndex++) {
        if (promptsArray[promptIndex][ansIndex] === wordsArray[wordIndex]) retArray.push(repliesArray[promptIndex++]);
        if (ansIndex === promptsArray[promptIndex].length - 1) break;
      }
      if (promptIndex === promptsArray.length - 1) break;
    }
    if (wordIndex === wordsArray.length - 1) break;
  }
  return retArray;
}

function helloBot() {
  const messagesContainer = document.getElementById("messages");
  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  let botImg = document.createElement("img");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.appendChild(botImg);
  botText.innerText = `"Siema mordeczko!"`;
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}

function addChat(input, output) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.jpg" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);
  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  let botImg = document.createElement("img");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.appendChild(botImg);
  botText.innerText = "Odpisuje...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${output}`;
    textToSpeech(output)
  }, 1000);
}

const synth = window.speechSynthesis;
const textToSpeech = (string) => {
  let voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "pl";
  voice.volume = 1;
  voice.rate = 1;
  voice.pitch = 1;
  synth.speak(voice);
};
const prompts = [["hej"],["pogoda","Krakow"],["dowidzenia"],["empty"]];
const replies = [["Witaj!"],["W Krakowie dzisiaj pada deszcz."],["Do zobaczenia!"],["empty"]];
const alternative = ["Nie rozumiem - brak implementacji! :/"];
const consored = [["dziewka"]];
const OAM = [["/version"],["/pogoda"]];
const OAM_ENUMS = [["Wersja oprogramowania 1.23"],["Kraków, 23 stopnie"]];