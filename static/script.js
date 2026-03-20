const textElement = document.getElementById("text");

function wrapWords() {
    let words = textElement.innerText.split(" ");

    textElement.innerHTML = words.map(word =>
        `<span class="word" data-word="${word.replace(/[.,]/g, '')}">
            ${word}
        </span>`
    ).join(" ");
}

wrapWords();

document.addEventListener("mouseover", async (e) => {
    if (e.target.classList.contains("word")) {
        let word = e.target.dataset.word;

        let res = await fetch("/meaning", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({word})
        });

        let data = await res.json();

        showPopup(e, data);
    }
});

document.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("word")) {
        document.getElementById("popup").style.display = "none";
    }

});
function showPopup(event, data) {
    let engChecked = document.getElementById("eng").checked;
    let hinChecked = document.getElementById("hin").checked;

    let content = "";

    if (engChecked) content += `<div><b>EN:</b> ${data.english}</div>`;
    if (hinChecked) content += `<div><b>HI:</b> ${data.hindi}</div>`;

    let popup = document.getElementById("popup");
    popup.innerHTML = content;
    popup.style.display = "block";
    popup.style.left = event.pageX + "px";
    popup.style.top = event.pageY + "px";
}