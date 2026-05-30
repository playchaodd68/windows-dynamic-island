param(
  [string]$RepoName = "windows-dynamic-island",
  [string]$Description = "Windows Dynamic Island desktop companion built with OpenSpec, Electron, React, and TypeScript.",
  [switch]$Private
)

$ErrorActionPreference = "Stop"

function Resolve-CommandPath {
  param([string]$Name)
  $command = Get-Command $Name -ErrorAction SilentlyContinue
  if ($command) {
    return $command.Source
  }

  if ($Name -eq "gh") {
    $candidates = @(
      "$env:ProgramFiles\GitHub CLI\gh.exe",
      "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe"
    )
    foreach ($candidate in $candidates) {
      if (Test-Path $candidate) {
        return $candidate
      }
    }
  }

  throw "Required command '$Name' was not found. Install GitHub CLI and run 'gh auth login' first."
}

$git = Resolve-CommandPath git
$gh = Resolve-CommandPath gh

& $gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw "GitHub CLI is installed but not authenticated. Run 'gh auth login' before publishing."
}

$branch = & $git branch --show-current
if ($branch -ne "feat/windows-dynamic-island") {
  throw "Expected branch 'feat/windows-dynamic-island', got '$branch'."
}

$visibilityFlag = if ($Private) { "--private" } else { "--public" }
$remoteExists = (& $git remote) -contains "origin"

if (-not $remoteExists) {
  & $gh repo create $RepoName $visibilityFlag --description $Description --source . --remote origin
}

& $git push -u origin main
& $git push -u origin $branch

$prBodyPath = Join-Path $PSScriptRoot "pr-body.md"
& $gh pr create `
  --draft `
  --base main `
  --head $branch `
  --title "[codex] Build Windows Dynamic Island MVP" `
  --body-file $prBodyPath
