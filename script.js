const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (response.ok==false) { // if(!response.ok)
      throw new Error("Word not found");
    }
    
    const data = await response.json();
    console.log(data);
    
    let definitions=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
    <h4><strong>Word:</strong>${data[0].word}</h4>
    <p>Part of Speech: ${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong> ${definitions.definition}</p>
    <p><strong>Example</strong> ${definitions.example===undefined?"Not Found":definitions.example}</p>
    <p><strong>Antonyms</strong></p>`;
    
    //Fetching Antonyms
    if(definitions.antonyms.length===0)
     resultDiv.innerHTML+=`<span>Not Found<br></span>`
    else
    {
      for(let i=0;i<definitions.antonyms.length;i++)
      {
        resultDiv.innerHTML+=`${definitions.antonyms[i]}`
        if(i<definitions.antonyms.length-1)
           resultDiv.innerHTML+=`${','}`
          else
           resultDiv.innerHTML+=`<span><br></span>`
      }
    }

    resultDiv.innerHTML+= `<p><strong>Synonyms</strong></p>`
    // fetching synonyms
    if(definitions.synonyms.length===0)
     resultDiv.innerHTML+=`<span>Not Found<br></span>`
    else
    {
      for(let i=0;i<definitions.synonyms.length;i++)
      {
        resultDiv.innerHTML+=`${definitions.synonyms[i]}`
        if(i<definitions.synonyms.length-1)
           resultDiv.innerHTML+=`${','}`
          else
           resultDiv.innerHTML+=`<span><br></span>`
      }
    }

    // adding read more button
    resultDiv.innerHTML+=`<a href="${data[0].sourceUrls}"> Read more about ${word}</a>`
  } catch (error) {
    resultDiv.innerHTML= `<p style="color:red;">❌ Word not found</p>`;
  }
};
