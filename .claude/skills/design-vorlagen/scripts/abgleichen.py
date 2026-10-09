#!/usr/bin/env python3
"""Gleicht die Look-Skills (look-<name>) mit dem Sammel-Skill design-vorlagen ab.

Quelle der Wahrheit sind die Einzel-Skills `.claude/skills/look-<name>/`.
Der Sammel-Skill bekommt davon Kopien:
  look-<name>/vorlage/*          ->  design-vorlagen/vorlagen/<name>/*   (Schriftpfad wird angepasst)
  look-<name>/SKILL.md (Textteil) ->  design-vorlagen/references/look-<name>.md

Aufruf:
  python3 abgleichen.py            kopiert, was sich geändert hat
  python3 abgleichen.py --pruefen  zeigt nur, was abweichen würde (ändert nichts)
Es wird nie etwas gelöscht, nur die eigenen Kopien werden überschrieben.
"""
import re
import sys
from pathlib import Path

SKILLS = Path(__file__).resolve().parents[2]
SAMMEL = SKILLS / "design-vorlagen"
PFAD_ALT = "../../design-vorlagen/fonts/"
PFAD_NEU = "../../fonts/"
TEXT_ENDUNGEN = {".html", ".css", ".js", ".md", ".svg", ".txt", ".json"}


def ohne_frontmatter(text: str) -> str:
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    return text[m.end():].lstrip("\n") if m else text


def beschreibung(text: str) -> str:
    m = re.search(r"^description:\s*(.+)$", text, re.M)
    return m.group(1).strip() if m else ""


def schreiben(ziel: Path, inhalt: bytes, nur_pruefen: bool, bericht: list):
    alt = ziel.read_bytes() if ziel.exists() else None
    if alt == inhalt:
        return
    bericht.append(("neu" if alt is None else "geändert", ziel.relative_to(SKILLS)))
    if not nur_pruefen:
        ziel.parent.mkdir(parents=True, exist_ok=True)
        ziel.write_bytes(inhalt)


def main():
    nur_pruefen = "--pruefen" in sys.argv
    bericht = []
    looks = sorted(p for p in SKILLS.glob("look-*") if (p / "SKILL.md").exists())
    for look in looks:
        name = look.name[len("look-"):]
        skill = look / "SKILL.md"
        text = skill.read_text(encoding="utf-8")
        kopf = f"<!-- Kopie aus look-{name}/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->\n"
        schreiben(SAMMEL / "references" / f"look-{name}.md", (kopf + ohne_frontmatter(text)).encode("utf-8"), nur_pruefen, bericht)
        vorlage = look / "vorlage"
        if vorlage.is_dir():
            for datei in sorted(vorlage.rglob("*")):
                if not datei.is_file():
                    continue
                rel = datei.relative_to(vorlage)
                daten = datei.read_bytes()
                if datei.suffix.lower() in TEXT_ENDUNGEN:
                    daten = daten.decode("utf-8").replace(PFAD_ALT, PFAD_NEU).encode("utf-8")
                schreiben(SAMMEL / "vorlagen" / name / rel, daten, nur_pruefen, bericht)
    print(f"{len(looks)} Look-Skills gefunden: {', '.join(p.name for p in looks) or '-'}")
    if not bericht:
        print("Alles gleich, nichts zu tun.")
    for art, pfad in bericht:
        print(f"  {art}: {pfad}")
    if nur_pruefen and bericht:
        print(f"{len(bericht)} Datei(en) würden sich ändern. Ohne --pruefen ausführen, um sie zu kopieren.")


if __name__ == "__main__":
    main()
