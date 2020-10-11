(() => {
    const scrollbar = document.getElementById('messagesScrollbar');

    scrollbar.scrollTop = scrollbar.scrollHeight - scrollbar.clientHeight;
})();

function goToSettings() {
    window.location.href = `${window.location.origin}/static/settings.html`;
}
