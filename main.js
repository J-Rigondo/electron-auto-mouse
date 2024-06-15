const { app, BrowserWindow,ipcMain } = require('electron/main')
const robot = require('robotjs');
const path = require('node:path');
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(()=>{
    createWindow()

    ipcMain.on('onValue',event => {
        console.log(event)
    });


    let clickInterval;
    let clickCount = 0;

// IPC 핸들러 설정
    ipcMain.on('start-clicking', (event) => {
        if (!clickInterval) {
            clickInterval = setInterval(() => {
                // 마우스 클릭 이벤트 트리거
                robot.mouseClick();
                clickCount++;
                event.sender.send('update-click-count', clickCount);
            }, 70);
        }
    });

    ipcMain.on('stop-clicking', () => {
        if (clickInterval) {
            clearInterval(clickInterval);
            clickInterval = null;
        }
    });

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//     }
// })
