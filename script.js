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

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    console.log(data);
    console.log(typeof data);
    
    resultDiv.innerHTML = `
      <h2><strong>Word:</strong>${data[0].word}</h2>
      <p>Part of Speech: ${data[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning:</strong> ${data[0].meanings[0].definitions[0].definition}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">❌ Word not found</p>`;
  }
};
