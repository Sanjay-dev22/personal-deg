# Renders every slide of the group deck to PNG (via PowerPoint) so the result can be checked by eye.
# Usage:  powershell -File render_check.ps1 [-Slides 1,4,9] [-Deck path\to\deck.pptx]
param(
    [int[]]$Slides = @(),
    [string]$Deck = (Join-Path $PSScriptRoot "..\DEG-IES-Weekly-Update-Group-Meeting.pptx")
)
$src = (Resolve-Path $Deck).Path
$out = Join-Path $env:TEMP "deckpng"
Remove-Item $out -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory $out | Out-Null
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($src, $true, $false, $false)
if ($Slides.Count -eq 0) { $Slides = 1..$pres.Slides.Count }
foreach ($i in $Slides) { $pres.Slides.Item($i).Export("$out\slide$i.png", "PNG", 1600, 900) }
$pres.Close(); $app.Quit()
"Exported to $out"
Get-ChildItem $out | Select-Object Name
