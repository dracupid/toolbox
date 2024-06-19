import fs from 'fs'
import fsP from 'fs/promises'
import path from 'path'

type readFileT = typeof fsP.readFile
type readFileSyncT = typeof fs.readFileSync
type writeFileT = typeof fsP.writeFile
type writeFileSyncT = typeof fs.writeFileSync

export async function exists(path: fs.PathLike) {
  return fsP.access(path).then(
    () => true,
    () => false
  )
}
export const existsSync = fs.existsSync

export async function ensureDir(
  path: fs.PathLike,
  options?: fs.MakeDirectoryOptions
) {
  return fsP.mkdir(path, {
    ...options,
    recursive: true,
  })
}
export function ensureDirSync(
  path: fs.PathLike,
  options?: fs.MakeDirectoryOptions
) {
  return fs.mkdirSync(path, {
    ...options,
    recursive: true,
  })
}

export async function outputFile(
  file: string,
  data: Parameters<writeFileT>[1],
  options?: Parameters<writeFileT>[2]
) {
  const dir = path.dirname(file)
  if (!(await exists(dir))) {
    await ensureDir(dir)
  }
  return fsP.writeFile(file, data, options)
}

export function outputFileSync(
  file: string,
  data: Parameters<writeFileSyncT>[1],
  options?: Parameters<writeFileSyncT>[2]
) {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    ensureDirSync(dir)
  }
  fs.writeFileSync(file, data, options)
}

export async function remove(path: fs.PathLike) {
  return fsP.rm(path, { recursive: true, force: true })
}

export function removeSync(path: fs.PathLike) {
  fs.rmSync(path, { recursive: true, force: true })
}

export async function readJSON<T>(
  path: Parameters<readFileT>[0],
  options?: Parameters<readFileT>[1]
): Promise<T> {
  const content = await fsP.readFile(path, options)
  return (
    content instanceof Buffer
      ? JSON.parse(content.toString('utf-8'))
      : JSON.parse(content)
  ) as T
}

export function readJSONSync<T>(
  path: Parameters<readFileSyncT>[0],
  options?: Parameters<readFileSyncT>[1]
): T {
  const content = fs.readFileSync(path, options)
  return (
    content instanceof Buffer
      ? JSON.parse(content.toString('utf-8'))
      : JSON.parse(content)
  ) as T
}

export async function outputJSON(
  file: string,
  obj: any,
  options?: Parameters<writeFileT>[2]
) {
  const content = JSON.stringify(obj)
  return outputFile(file, content, options)
}

export function outputJSONSync(
  file: string,
  obj: any,
  options?: Parameters<writeFileSyncT>[2]
) {
  const content = JSON.stringify(obj)
  outputFileSync(file, content, options)
}

export { readFileSync, writeFileSync } from 'fs'
export { readFile, writeFile } from 'fs/promises'

export async function listDir(
  name: string,
  fullPath = true,
  filter?: (it: fs.Dirent) => boolean
): Promise<string[]> {
  if (!(await exists(name))) return []
  const dirs = await fsP.readdir(name, { withFileTypes: true })
  return dirs
    .filter((dir) => dir.isDirectory() && (filter ? filter(dir) : true))
    .map((dir) => (fullPath ? path.join(name, dir.name) : dir.name))
}

export async function listFiles(
  name: string,
  fullPath = true,
  filter?: (it: fs.Dirent) => boolean
) {
  if (!(await exists(name))) return []
  const files = await fsP.readdir(name, { withFileTypes: true })
  return files
    .filter((file) => file.isFile() && (filter ? filter(file) : true))
    .map((file) => (fullPath ? path.join(name, file.name) : file.name))
}
