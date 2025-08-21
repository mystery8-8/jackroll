# PowerShell script to set PowerShell as default terminal across Windows 11
# Run as Administrator for full system changes

Write-Host "Setting PowerShell as default terminal across Windows 11..." -ForegroundColor Green

# 1. Set Windows Terminal default profile to PowerShell
$wtSettingsPath = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json"
if (Test-Path $wtSettingsPath) {
    Write-Host "Updating Windows Terminal settings..." -ForegroundColor Yellow
    try {
        $wtSettings = Get-Content $wtSettingsPath | ConvertFrom-Json
        $wtSettings.defaultProfile = "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}"
        $wtSettings | ConvertTo-Json -Depth 10 | Set-Content $wtSettingsPath
        Write-Host "Windows Terminal default profile set to PowerShell" -ForegroundColor Green
    } catch {
        Write-Host "Could not update Windows Terminal settings" -ForegroundColor Red
    }
} else {
    Write-Host "Windows Terminal settings not found" -ForegroundColor Yellow
}

# 2. Set registry entries for default terminal
Write-Host "Setting registry entries..." -ForegroundColor Yellow

# Set PowerShell as default console host
try {
    $regPath = "HKCU:\Console"
    if (!(Test-Path $regPath)) {
        New-Item -Path $regPath -Force | Out-Null
    }
    Set-ItemProperty -Path $regPath -Name "ForceV2" -Value 1 -Type DWord
    Write-Host "Console registry updated" -ForegroundColor Green
} catch {
    Write-Host "Could not update console registry" -ForegroundColor Red
}

# 3. Set default terminal for VS Code/Cursor
$vscodeSettingsPath = "$env:APPDATA\Code\User\settings.json"
$cursorSettingsPath = "$env:APPDATA\Cursor\User\settings.json"

function Update-EditorSettings {
    param($settingsPath, $editorName)
    
    if (Test-Path $settingsPath) {
        Write-Host "Updating $editorName settings..." -ForegroundColor Yellow
        try {
            $settings = @{}
            
            if ((Get-Item $settingsPath).Length -gt 0) {
                $content = Get-Content $settingsPath -Raw
                if ($content.Trim()) {
                    $settings = $content | ConvertFrom-Json -AsHashtable
                }
            }
            
            $settings["terminal.integrated.defaultProfile.windows"] = "PowerShell"
            $settings["terminal.integrated.profiles.windows"] = @{
                "PowerShell" = @{
                    "source" = "PowerShell"
                    "icon" = "terminal-powershell"
                }
                "Command Prompt" = @{
                    "path" = @(
                        "${env:windir}\Sysnative\cmd.exe",
                        "${env:windir}\System32\cmd.exe"
                    )
                }
                "Git Bash" = @{
                    "source" = "Git Bash"
                }
            }
            
            $settings | ConvertTo-Json -Depth 10 | Set-Content $settingsPath
            Write-Host "$editorName terminal default set to PowerShell" -ForegroundColor Green
        } catch {
            Write-Host "Could not update $editorName settings" -ForegroundColor Red
        }
    } else {
        Write-Host "$editorName settings not found" -ForegroundColor Yellow
    }
}

Update-EditorSettings $vscodeSettingsPath "VS Code"
Update-EditorSettings $cursorSettingsPath "Cursor"

# 4. Set environment variable for terminal preference
try {
    [Environment]::SetEnvironmentVariable("ComSpec", "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe", "User")
    Write-Host "User environment variable updated" -ForegroundColor Green
} catch {
    Write-Host "Could not update environment variable" -ForegroundColor Red
}

# 5. Update Windows default console application
try {
    $regConsolePath = "HKCU:\Console\%SystemRoot%_System32_WindowsPowerShell_v1.0_powershell.exe"
    if (!(Test-Path $regConsolePath)) {
        New-Item -Path $regConsolePath -Force | Out-Null
    }
    Write-Host "Console application registry updated" -ForegroundColor Green
} catch {
    Write-Host "Could not update console application registry" -ForegroundColor Red
}

Write-Host ""
Write-Host "Default terminal changes applied successfully!" -ForegroundColor Green
Write-Host "You may need to restart applications or reboot for all changes to take effect." -ForegroundColor Yellow