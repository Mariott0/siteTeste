async function loadComments() {
    const response = await fetch('http://localhost:3000/comments');
    const comments = await response.json();
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.textContent = comment.text;
        commentsList.appendChild(commentDiv);
    });
}

document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value;
    if (commentText.trim() !== '') {
        await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: commentText })
        });
        document.getElementById('commentText').value = '';
        loadComments();
    }
});

loadComments();

// Atualiza o ano no rodapé
document.getElementById('currentYear').textContent = new Date().getFullYear();
