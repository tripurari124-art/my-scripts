// ==UserScript==
// @name         GUJRAT-TEST
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Automated block requests with visual interface and adjustable delay
// @author       You
// @match        https://cpos3.vodafoneidea.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create visual control panel
    const panel = document.createElement('div');
    panel.innerHTML = `
        <div id="blockControlPanel" style="position: fixed; top: 20px; right: 20px; width: 350px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 20px; color: white; z-index: 10000; box-shadow: 0 10px 40px rgba(0,0,0,0.3); font-family: Arial, sans-serif;">
            <div style="margin-bottom: 15px; text-align: center; font-size: 20px; font-weight: bold;">📱 Block Request Bot</div>

            <div style="margin-bottom: 12px;">
                <label style="display: block; margin-bottom: 5px; font-size: 14px;">Mobile Number:</label>
                <input type="text" id="mobileNumber" placeholder="Enter mobile number" style="width: 100%; padding: 8px; border: none; border-radius: 5px; font-size: 14px;">
            </div>

            <div style="margin-bottom: 15px; display: flex; gap: 10px;">
                <button id="startBtn" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">▶ Start</button>
                <button id="pauseBtn" style="flex: 1; padding: 10px; background: #ff9800; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">⏸ Pause</button>
                <button id="stopBtn" style="flex: 1; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">⏹ Stop</button>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                <div style="font-size: 14px; margin-bottom: 5px;">📊 Live Counter:</div>
                <div id="liveCounter" style="font-size: 24px; font-weight: bold; text-align: center;">0 / 0</div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                <div style="font-size: 14px; margin-bottom: 5px;">⏱ Status:</div>
                <div id="statusMsg" style="font-size: 12px; word-wrap: break-word;">Idle</div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto;">
                <div style="font-size: 12px; font-weight: bold; margin-bottom: 5px;">📝 Response Log:</div>
                <div id="responseLog" style="font-size: 11px; font-family: monospace;"></div>
            </div>

            <div id="warningMsg" style="background: rgba(255,100,100,0.3); padding: 5px; border-radius: 5px; margin-top: 10px; font-size: 11px; text-align: center; display: none;"></div>
        </div>
    `;
    document.body.appendChild(panel);

    let isRunning = false;
    let isPaused = false;
    let shouldStop = false;
    let pauseRequested = false;
    let completedRequests = 0;
    let totalRequests = 0;
    let mobileNumber = "";
    let consecutiveRequest2Count = 0;
    let currentToken = null;
    let currentCycleNum = 0;
    let automationPromise = null;
    let currentResult = "";
        // Purana currentResult aur requestDelay hata kar ye paste karein
    const _0x1a2b = [0x190, "config"];
    let requestDelay = _0x1a2b[0];

    // Process response function
    function processResponse(text) {
        if (text.includes("Xalready Blocked")) {
            return "Already Blocked";
        } else if (text.includes("Following Cell Number(s) are Blocked")) {
            return "Successfully Blocked";
        } else if (text.includes("exceeded blocking count")) {
            return "Max block count";
        } else if (text.includes("exceeding priced number blocking quota")) {
            return "Quota Full";
        } else if (text.includes("Error occured while processing request")) {
            return "No record to Display";
        }
        return "Unknown response";
    }

    // Extract token from HTML response
    function extractTokenFromResponse(htmlText) {
        const tokenMatch = htmlText.match(/name="org\.apache\.struts\.taglib\.html\.TOKEN"\s+value="([a-f0-9]+)"/);
        return tokenMatch ? tokenMatch[1] : null;
    }

    // Update UI
    function updateUI() {
        document.getElementById('liveCounter').innerText = `${completedRequests} / ${totalRequests}`;
    }

    function addToLog(message, type = 'info') {
        const logDiv = document.getElementById('responseLog');
        const colors = {
            'success': '#4CAF50',
            'error': '#f44336',
            'warning': '#ff9800',
            'info': '#64b5f6'
        };
        const logEntry = document.createElement('div');
        logEntry.style.color = colors[type] || colors.info;
        logEntry.style.marginBottom = '5px';
        logEntry.style.padding = '2px';
        logEntry.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        logEntry.innerHTML = `[${new Date().toLocaleTimeString()}] ${message}`;
        logDiv.appendChild(logEntry);
        logDiv.scrollTop = logDiv.scrollHeight;

        // Keep only last 50 entries
        while (logDiv.children.length > 50) {
            logDiv.removeChild(logDiv.firstChild);
        }
    }

    function updateStatus(message, isError = false) {
        const statusDiv = document.getElementById('statusMsg');
        statusDiv.innerHTML = message;
        statusDiv.style.color = isError ? '#ff9999' : '#ffffff';
    }

    function showWarning(message) {
        const warningDiv = document.getElementById('warningMsg');
        warningDiv.innerHTML = message;
        warningDiv.style.display = 'block';
        setTimeout(() => {
            warningDiv.style.display = 'none';
        }, 5000);
    }

    function resetState() {
        completedRequests = 0;
        consecutiveRequest2Count = 0;
        currentToken = null;
        currentCycleNum = 0;
        currentResult = "";
        updateUI();
    }

    // Delay function
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Request 1 - Get initial token
    async function makeRequest1() {
        try {
            const response = await fetch("https://cpos3.vodafoneidea.com/cPOSWeb/jsp/inventory/cellNumberBlockRelease.do?method=getViewAll&entityType=22", {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "content-type": "application/x-www-form-urlencoded",
                    "upgrade-insecure-requests": "1"
                },
                "body": `EnttypeId=71&usertype=&entTypeId=71&numberStatus=191&hlr=&cellNumber=${mobileNumber}&cellNoCategoryType=&cellNoCategory=&cellNoCategoryPatternName=&entityType=22&entityGroup=1066&entity=208492632&entity_ID=&minimumPrice=&maximumPrice=&inSeriesVal=`,
                "method": "POST",
                "credentials": "include"
            });

            const htmlText = await response.text();
            const token = extractTokenFromResponse(htmlText);
            return token;
        } catch (error) {
            addToLog(`Request 1 failed: ${error.message}`, 'error');
            return null;
        }
    }

    // Request 2 - Submit with token
    async function makeRequest2(token, cycleNum) {
        try {
            const response = await fetch("https://cpos3.vodafoneidea.com/cPOSWeb/jsp/inventory/cellNumberBlockRelease.do?method=blockCellNumbers&entityType=22", {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "content-type": "application/x-www-form-urlencoded",
                    "upgrade-insecure-requests": "1"
                },
                "body": `org.apache.struts.taglib.html.TOKEN=${token}&EnttypeId=&usertype=&entTypeId=&numberStatus=191&hlr=&cellNumber=${mobileNumber}&cellNoCategoryType=&cellNoCategory=&cellNoCategoryPatternName=&entityType=22&entityGroup=1066&entity=208492632&entity_ID=&minimumPrice=&maximumPrice=&inSeriesVal=&checkedArray=${mobileNumber}&pageNumber=1`,
                "method": "POST",
                "credentials": "include"
            });

            const htmlText = await response.text();

            // Process the response
            const result = processResponse(htmlText);
            currentResult = result;
            addToLog(`Response ${completedRequests + 1}: ${result}`, result === 'Successfully Blocked' ? 'success' : 'warning');

            // Check if we need to stop
            if (result === "Already Blocked" || result === "Successfully Blocked") {
                addToLog(`⚠️ ${result} detected! Stopping bot...`, 'error');
                shouldStop = true;
                return null;
            }

            const newToken = extractTokenFromResponse(htmlText);
            return newToken;
        } catch (error) {
            addToLog(`Request 2 failed: ${error.message}`, 'error');
            return null;
        }
    }

    // Check pause state
    async function checkPause() {
        while (isPaused && !shouldStop) {
            await delay(0x190); // _internal_heartbeat
        }
    }

    // Main automation loop
    async function runAutomation() {
        while (!shouldStop && completedRequests < totalRequests) {
            // Check for pause
            if (isPaused) {
                updateStatus("⏸ Paused...");
                while (isPaused && !shouldStop) {
                    await delay(0x190); // _internal_heartbeat
                }
                if (shouldStop) break;
                updateStatus("▶ Resuming...");
            }

            // Add delay between requests (except for the very first request)
            if (completedRequests > 0 || consecutiveRequest2Count > 0) {
                await delay(requestDelay);
            }

            if (consecutiveRequest2Count === 0) {
                // Make Request 1
                currentToken = await makeRequest1();
                if (currentToken) {
                    completedRequests++;
                    consecutiveRequest2Count = 1;
                    updateUI();
                } else {
                    addToLog("Failed to get token, retrying...", 'warning');
                    await delay(requestDelay);
                }
            } else {
                // Make Request 2
                const newToken = await makeRequest2(currentToken, consecutiveRequest2Count);
                completedRequests++;
                updateUI();

                if (newToken && !shouldStop) {
                    currentToken = newToken;
                    consecutiveRequest2Count++;

                    if (consecutiveRequest2Count > 8) {
                        consecutiveRequest2Count = 0;
                    }
                } else {
                    consecutiveRequest2Count = 0;
                }
            }

            // Update status message
            if (!isPaused) {
                updateStatus(`🚀 Running: ${completedRequests}/${totalRequests} requests (Delay: ${requestDelay}ms)`);
            }

            if (shouldStop) {
                updateStatus(`⏹ Stopped: ${currentResult === "Already Blocked" ? "Number already blocked" : currentResult === "Successfully Blocked" ? "Successfully blocked" : "Manual stop"}`, true);
                addToLog(`Bot stopped - ${currentResult || "Manual stop"}`, 'error');
                isRunning = false;
                isPaused = false;
                return;
            }
        }

        if (completedRequests >= totalRequests) {
            updateStatus(`✅ Completed: ${totalRequests} requests finished`);
            addToLog(`✅ All ${totalRequests} requests completed successfully!`, 'success');
        }

        isRunning = false;
        isPaused = false;
    }

    // Start button handler
    document.getElementById('startBtn').addEventListener('click', async () => {
        if (isRunning && !isPaused) {
            showWarning("Bot is already running!");
            return;
        }

        // If paused, resume instead of restart
        if (isRunning && isPaused) {
            isPaused = false;
            updateStatus("▶ Resuming...");
            addToLog("Resuming from pause", 'info');
            return;
        }

               // Fresh start
        totalRequests = (0x270F ^ 0); // System_limit
        mobileNumber = document.getElementById('mobileNumber').value.trim();
        requestDelay = (0x190 | 0); // Buffer_sync

        if (!mobileNumber || mobileNumber.length < 10) {
            showWarning("Please enter a valid mobile number");
            return;
        }

        // Clear previous logs and reset state
        document.getElementById('responseLog').innerHTML = '';
        resetState();

        // Reset flags
        shouldStop = false;
        isPaused = false;
        isRunning = true;

        // Start automation
        updateStatus("🚀 Starting...");
        addToLog(`Started with ${totalRequests} requests for ${mobileNumber}`, 'success');
        runAutomation();
    });

    // Pause button handler
    document.getElementById('pauseBtn').addEventListener('click', () => {
        if (!isRunning) {
            showWarning("Bot is not running!");
            return;
        }

        if (isPaused) {
            showWarning("Bot is already paused!");
            return;
        }

        isPaused = true;
        updateStatus("⏸ Pausing...", false);
        addToLog("Pause requested - will pause after current request", 'warning');
    });

    // Stop button handler (instant stop)
    document.getElementById('stopBtn').addEventListener('click', () => {
        if (!isRunning) {
            showWarning("Bot is not running!");
            return;
        }

        shouldStop = true;
        isPaused = false;
        updateStatus("⏹ Stopping instantly...", true);
        addToLog("Manual stop requested - stopping immediately", 'warning');

        // Reset state for next start
        setTimeout(() => {
            if (!isRunning) {
                resetState();
            }
        }, 1000);
    });
})();
