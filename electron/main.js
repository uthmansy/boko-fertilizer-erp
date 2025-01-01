// Use 'import' instead of 'require'
import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// __dirname isn't available in ESM, so we recreate it using `fileURLToPath`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let splash;

const createWindow = () => {
  // Create the splash screen window
  splash = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false, // No frame
    alwaysOnTop: true,
    transparent: true, // Allow transparency
    resizable: false, // Optional: Prevent resizing
    center: true, // Center the splash screen
  });

  splash.loadFile(path.join(__dirname, "splash.html")); // Load your splash screen HTML

  // Create the main window
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: false, // Launch in fullscreen
    webPreferences: {
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Isolate context for security
      preload: path.join(__dirname, "preload.js"), // Preload script for communication
    },
  });

  // Load the external web URL
  const externalUrl = "https://tomatildemo.netlify.app";

  // Wait for splash screen to show, then load the main app
  setTimeout(() => {
    mainWindow.loadURL(externalUrl);
    splash.close(); // Close the splash screen
    mainWindow.maximize();
  }, 3000); // Splash screen delay (e.g., 3 seconds)

  // Handle loading events
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Page loaded successfully");
    // Here you can also perform any additional actions after loading
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription) => {
      console.error("Failed to load:", errorDescription);
      mainWindow.loadFile(path.join(__dirname, "error.html")); // Load an error HTML page
    }
  );
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
