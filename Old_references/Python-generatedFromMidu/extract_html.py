from pathlib import Path
from bs4 import BeautifulSoup

def convert_html_to_md(html_path: Path):
    output_file = html_path.with_suffix(".md")

    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "lxml")

    output_lines = []

    # Título e intro
    title = soup.find("h1")
    if title:
        output_lines.append(f"# {title.get_text(strip=True)}\n")

    intro = soup.find("p", {"class": "intro"})
    if intro:
        output_lines.append(intro.get_text(strip=True) + "\n")

    # Acordeones
    accordions = soup.select(".accordion")
    panels = soup.select(".panel")

    for acc, panel in zip(accordions, panels):
        acc_title = acc.get_text(strip=True)
        output_lines.append(f"<details>\n<summary>{acc_title}</summary>\n")
        text_content = panel.get_text("\n", strip=True)
        output_lines.append(text_content)
        output_lines.append("\n</details>\n")

    # Guardar
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines))

    print(f"✅ Convertido: {html_path} → {output_file}")

# Procesar todos los .html en carpeta actual
for html_file in Path(".").glob("*.html"):
    convert_html_to_md(html_file)
