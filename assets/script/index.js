/*Declaring constants for buttons and modal on index.html*/
const showRules = document.getElementById('rules-modal-btn');
const showRulesModal = document.getElementById('modal-game-rules');
const closeRulesModal = document.getElementById('close-modal');

/*Add eventListener to make button function and to close and open a modal*/
showRules.addEventListener('click', () => {
    showRulesModal.classList.add('show');
});

closeRulesModal.addEventListener('click', () => {
    showRulesModal.classList.remove('show');
});
