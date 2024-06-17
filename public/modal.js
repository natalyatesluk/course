export function openModal() {
    document.getElementById("registrationModal").style.display = "block";
}

export function closeModal() {
    document.getElementById("registrationModal").style.display = "none";
}

const modal = document.getElementById("registrationModal");
modal.addEventListener('click', (e) => {
    if (e.target.dataset.close) {
        closeModal();
    }
})

const createBtn = document.getElementById("createBtn");
createBtn.addEventListener('click', () => openModal())