const {ipcRenderer} = require('electron')

const btn = document.getElementById('my-button');
btn.addEventListener('click', ev => {
    const val = document.getElementById('ok').value;

    ipcRenderer.send('onValue', val);
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A') {
        ipcRenderer.send('start-clicking');
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'A') {
        ipcRenderer.send('stop-clicking');
    }
});

ipcRenderer.on('update-click-count', (event, count) => {
    document.getElementById('click-count').textContent = `Click count: ${count}`;
});


