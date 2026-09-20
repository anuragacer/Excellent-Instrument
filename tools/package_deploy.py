import os
import zipfile

base_dir = "d:/Exservices"
zip_path = "d:/Exservices/excellentservices_modern_deploy.zip"

exclude_exts = {".py", ".pyc", ".log", ".tmp"}
exclude_folders = {"tools", ".git", "__pycache__"}

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(base_dir):
        # filter dirs in place
        dirs[:] = [d for d in dirs if d not in exclude_folders]
        for f in files:
            if f.endswith(".zip") or f.startswith("screenshot_") or any(f.endswith(ext) for ext in exclude_exts):
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, base_dir)
            zipf.write(full_path, rel_path)

print(f"Successfully packaged {zip_path}")
print(f"Archive size: {round(os.path.getsize(zip_path)/(1024*1024), 2)} MB")
