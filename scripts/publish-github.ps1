param(
  [string]$RepoName = "windows-dynamic-island",
  [string]$Description = "Windows Dynamic Island desktop companion built with OpenSpec, Electron, React, and TypeScript.",
  [switch]$Private
)

$ErrorActionPreference = "Stop"

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command '$Name' was not found. Install GitHub CLI and run 'gh auth login' first."
  }
}

Require-Command git
Require-Command gh

gh auth status | Out-Null

$branch = git branch --show-current
if ($branch -ne "feat/windows-dynamic-island") {
  throw "Expected branch 'feat/windows-dynamic-island', got '$branch'."
}

$visibilityFlag = if ($Private) { "--private" } else { "--public" }
$remoteExists = git remote get-url origin 2>$null

if (-not $remoteExists) {
  gh repo create $RepoName $visibilityFlag --description $Description --source . --remote origin --push
} else {
  git push -u origin main
  git push -u origin $branch
}

$prBodyPath = Join-Path $PSScriptRoot "pr-body.md"
gh pr create `
  --draft `
  --base main `
  --head $branch `
  --title "[codex] Build Windows Dynamic Island MVP" `
  --body-file $prBodyPath
