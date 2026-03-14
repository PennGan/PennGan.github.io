#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const DEFAULT_TARGET = path.resolve(process.cwd(), "content")
const SKIP_DIRS = new Set([".obsidian", ".git", "node_modules", ".trash"])
const ALLOWED_EXTENSIONS = new Set([
  ".md",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".pdf",
  ".csv",
  ".tsv"
])

function parseArgs(argv) {
  const options = {
    vault: process.env.OBSIDIAN_VAULT ? path.resolve(process.env.OBSIDIAN_VAULT) : "",
    target: DEFAULT_TARGET,
    clean: true,
    dryRun: false
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--vault") {
      options.vault = path.resolve(argv[i + 1] ?? "")
      i += 1
    } else if (arg === "--target") {
      options.target = path.resolve(argv[i + 1] ?? "")
      i += 1
    } else if (arg === "--no-clean") {
      options.clean = false
    } else if (arg === "--dry-run") {
      options.dryRun = true
    } else if (arg === "--help" || arg === "-h") {
      printHelp()
      process.exit(0)
    } else {
      throw new Error(`未知参数: ${arg}`)
    }
  }

  if (!options.vault) {
    throw new Error("请通过 --vault /path/to/your/obsidian-vault 或 OBSIDIAN_VAULT 环境变量指定 Obsidian 笔记目录。")
  }

  return options
}

function printHelp() {
  console.log(`用法:
  node scripts/sync-obsidian.mjs --vault /path/to/obsidian-vault

可选参数:
  --vault      Obsidian Vault 目录
  --target     Quartz content 目录，默认是当前仓库的 content
  --no-clean   不删除目标目录中已不存在的文件
  --dry-run    仅显示将要同步的文件，不实际写入
`)
}

async function ensureDir(dirPath, dryRun) {
  if (!dryRun) {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

async function collectFiles(rootDir) {
  const files = new Map()

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith(".") && entry.name !== ".obsidian") {
        continue
      }

      const absolutePath = path.join(currentDir, entry.name)
      const relativePath = path.relative(rootDir, absolutePath)

      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) {
          continue
        }
        await walk(absolutePath)
        continue
      }

      const ext = path.extname(entry.name).toLowerCase()
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        continue
      }

      files.set(relativePath, absolutePath)
    }
  }

  await walk(rootDir)
  return files
}

async function copyFile(source, destination, dryRun) {
  if (dryRun) {
    return
  }

  await ensureDir(path.dirname(destination), false)
  await fs.copyFile(source, destination)
}

async function removeFile(targetPath, dryRun) {
  if (dryRun) {
    return
  }

  await fs.rm(targetPath, { force: true, recursive: true })
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const sourceFiles = await collectFiles(options.vault)
  const targetFiles = await collectFiles(options.target).catch(() => new Map())

  let copied = 0
  let removed = 0

  await ensureDir(options.target, options.dryRun)

  for (const [relativePath, sourcePath] of sourceFiles) {
    const destination = path.join(options.target, relativePath)
    const targetStat = await fs.stat(destination).catch(() => null)
    const sourceStat = await fs.stat(sourcePath)

    const shouldCopy =
      !targetStat ||
      sourceStat.size !== targetStat.size ||
      sourceStat.mtimeMs > targetStat.mtimeMs + 1

    if (shouldCopy) {
      console.log(`[copy] ${relativePath}`)
      await copyFile(sourcePath, destination, options.dryRun)
      copied += 1
    }
  }

  if (options.clean) {
    for (const [relativePath] of targetFiles) {
      if (!sourceFiles.has(relativePath)) {
        console.log(`[remove] ${relativePath}`)
        await removeFile(path.join(options.target, relativePath), options.dryRun)
        removed += 1
      }
    }
  }

  console.log(
    `${options.dryRun ? "预演完成" : "同步完成"}: 复制 ${copied} 个文件，删除 ${removed} 个文件。`
  )
}

main().catch((error) => {
  console.error(`同步失败: ${error.message}`)
  process.exit(1)
})

