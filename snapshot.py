import os
import sys
import datetime

OUTPUT_FILE = "project_snapshot.txt"
MAX_FILE_LENGTH = 10000
FULL_MODE = "--full" in sys.argv

EXCLUDED_DIRS = {
    "__pycache__", ".git", ".mypy_cache", ".pytest_cache", ".idea", "node_modules"
}

INCLUDED_EXTENSIONS = (
    ".py", ".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt", ".yml", ".yaml",
    ".env", ".html", ".scss", ".css", ".sql", ".lock", ".toml", ".prisma"
)

INCLUDED_FILES = {
    "Dockerfile", ".gitignore", ".dockerignore", "yarn.lock", ".env.example"
}


def should_include(file: str) -> bool:
    return file.endswith(INCLUDED_EXTENSIONS) or file in INCLUDED_FILES


def walk_and_save(base_path: str):
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        # 🧾 Заголовок и дата
        out.write("# 📦 Project Snapshot\n")
        out.write(f"🕓 Generated: {datetime.datetime.now().isoformat()}\n")
        out.write("=" * 50 + "\n")

        for root, dirs, files in os.walk(base_path):
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            rel_root = os.path.relpath(root, base_path)
            if rel_root == ".":
                rel_root = "root"

            out.write(f"\n📁 {rel_root}\n" + "-" * 40 + "\n")

            for file in files:
                if should_include(file):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, base_path)

                    out.write(f"\n📄 {rel_path}\n" + "=" * 30 + "\n")
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            content = f.read()
                            if not FULL_MODE and len(content) > MAX_FILE_LENGTH:
                                out.write("[⚠️ файл слишком большой, обрезан]\n\n")
                                content = content[:MAX_FILE_LENGTH]
                            out.write(content + "\n")
                    except Exception as e:
                        out.write(f"[ошибка чтения файла: {e}]\n")
                else:
                    out.write(f"[пропущено (не входит в INCLUDED_EXTENSIONS)]: {file}\n")

    print(f"✅ Snapshot готов: {OUTPUT_FILE} ({'full' if FULL_MODE else 'truncated'})")


if __name__ == "__main__":
    walk_and_save(".")
