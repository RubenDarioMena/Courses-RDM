from bs4 import BeautifulSoup

# 1. Load the file
with open("06_ClassAndAPIs.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "lxml")

output_lines = []

# 2. Title + intro if present
title = soup.find("h1")
if title:
    output_lines.append(f"# {title.get_text(strip=True)}\n")

intro = soup.find("p", {"class": "intro"})
if intro:
    output_lines.append(intro.get_text(strip=True) + "\n")

# 3. Extract all accordions + panels
accordions = soup.select(".accordion")
panels = soup.select(".panel")

for idx, (acc, panel) in enumerate(zip(accordions, panels), 1):
    acc_title = acc.get_text(strip=True)
    output_lines.append(f"\n## [Accordion] {acc_title}\n")
    text_content = panel.get_text("\n", strip=True)
    output_lines.append(text_content)
    output_lines.append("\n## [End Accordion]\n")

# 4. Save as a .txt or .md file
with open("output_raw.md", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("✅ Extraction complete! Saved as output_raw.md")
