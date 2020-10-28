export function render(rootQuery, block) {
    const root = document.querySelector(rootQuery);
    // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent());

    return root;
}
